---
slug: "/spryker/training/search"
date: "2019-05-04"
title: "Search"
category: "spryker"
type: "professional"
image: '../../../images/platforms/banner-spryker.png'
order: 998
---

Search
We have now seen how we can put data into Elasticsearch and how we can check that the data correctly arrives in the index. Let us now connect the Antelopes in the index with our code.

First we need an Elasticsearch query to fetch our antelopes. This does not need to be a BoolQuery, but it gives us the easiest way to extend it, if the need occurs.

src/Pyz/Client/Antelope/Plugin/Elasticsearch/Query/AntelopeQueryPlugin.php

<?php

namespace Pyz\Client\Antelope\Plugin\Elasticsearch\Query;

use Elastica\Query;
use Elastica\Query\BoolQuery;
use Elastica\Query\Exists;
use Elastica\Query\Match;
use Generated\Shared\Transfer\SearchContextTransfer;
use Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface;
use Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextAwareQueryInterface;

class AntelopeQueryPlugin implements QueryInterface, SearchContextAwareQueryInterface
{
    /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     */
    protected const SOURCE_IDENTIFIER = 'page';

    /**
     * @var \Generated\Shared\Transfer\SearchContextTransfer
     */
    protected $searchContextTransfer;

    /**
     * @param string $name
     */
    public function __construct(string $name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getSearchQuery()
    {
        $boolQuery = (new BoolQuery())
            ->addMust(
                new Exists('id_antelope')
            )
            ->addMust(
                new Match('name', $this->name)
            );

        $query = (new Query())
            ->setQuery($boolQuery);

        return $query;
    }

    /**
     * @inheritDoc
     */
    public function getSearchContext(): SearchContextTransfer
    {
        if (!$this->hasSearchContext()) {
            $this->setupDefaultSearchContext();
        }

        return $this->searchContextTransfer;
    }

    /**
     * @inheritDoc
     */
    public function setSearchContext(SearchContextTransfer $searchContextTransfer): void
    {
        $this->searchContextTransfer = $searchContextTransfer;
    }

    /**
     * @return void
     */
    protected function setupDefaultSearchContext(): void
    {
        $searchContextTransfer = new SearchContextTransfer();
        $searchContextTransfer->setSourceIdentifier(static::SOURCE_IDENTIFIER);

        $this->searchContextTransfer = $searchContextTransfer;
    }

    /**
     * @return bool
     */
    protected function hasSearchContext(): bool
    {
        return (bool)$this->searchContextTransfer;
    }
}
A ResultFormatter will know how to handle the raw results from Elasticsearch.

src/Pyz/Client/Antelope/Plugin/Elasticsearch/ResultFormatter/AntelopeResultFormatterPlugin.php
<?php

namespace Pyz\Client\Antelope\Plugin\Elasticsearch\ResultFormatter;

use Elastica\ResultSet;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\AbstractElasticsearchResultFormatterPlugin;

class AntelopeResultFormatterPlugin extends AbstractElasticsearchResultFormatterPlugin
{
    public const NAME = 'antelope';

    /**
     * @return string
     */
    public function getName()
    {
        return static::NAME;
    }

    /**
     * @param \Elastica\ResultSet $searchResult
     * @param array $requestParameters
     *
     * @return array
     */
    protected function formatSearchResult(ResultSet $searchResult, array $requestParameters)
    {
        foreach ($searchResult->getResults() as $document) {
            return $document->getSource();
        }

        return [];
    }
}
For re-usability we will wrap this functionality in a new AntelopeClient and let it work on the existing infrastructure of the SearchClient.

src/Pyz/Client/Antelope/AntelopeClientInterface.php
<?php

namespace Pyz\Client\Antelope;

interface AntelopeClientInterface
{
    /**
     * @param string $name
     *
     * @return array
     */
    public function getAntelopeByName(string $name): array;
}
src/Pyz/Client/Antelope/AntelopeClient.php
<?php

namespace Pyz\Client\Antelope;

use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\Antelope\AntelopeFactory getFactory()
 */
class AntelopeClient extends AbstractClient implements AntelopeClientInterface
{
    /**
     * @param string $name
     *
     * @return array
     */
    public function getAntelopeByName(string $name): array
    {
        $searchQuery = $this->getFactory()
            ->createAntelopeQueryPlugin($name);

        $resultFormatters = $this->getFactory()
            ->getSearchQueryFormatters();

        $searchResults = $this->getFactory()
            ->getSearchClient()
            ->search(
                $searchQuery,
                $resultFormatters
            );

        return $searchResults['antelope'] ?? [];
    }
}
Of course, we have to provide the dependencies for the above code!

src/Pyz/Client/Antelope/AntelopeDependencyProvider.php
<?php

namespace Pyz\Client\Antelope;

use Pyz\Client\Antelope\Plugin\Elasticsearch\ResultFormatter\AntelopeResultFormatterPlugin;
use Spryker\Client\Kernel\AbstractDependencyProvider;
use Spryker\Client\Kernel\Container;

class AntelopeDependencyProvider extends AbstractDependencyProvider
{
    public const CLIENT_SEARCH = 'CLIENT_SEARCH';
    public const ANTELOPE_RESULT_FORMATTER_PLUGINS = 'ANTELOPE_RESULT_FORMATTER_PLUGINS';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container)
    {
        $container = $this->addSearchClient($container);
        $container = $this->addCatalogSearchResultFormatterPlugins($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addSearchClient(Container $container)
    {
        $container[static::CLIENT_SEARCH] = function (Container $container) {
            return $container->getLocator()->search()->client();
        };

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function addCatalogSearchResultFormatterPlugins(Container $container)
    {
        $container[static::ANTELOPE_RESULT_FORMATTER_PLUGINS] = function () {
            return [
                new AntelopeResultFormatterPlugin(),
            ];
        };

        return $container;
    }
}
src/Pyz/Client/Antelope/AntelopeFactory.php
<?php

namespace Pyz\Client\Antelope;

use Pyz\Client\Antelope\Plugin\Elasticsearch\Query\AntelopeQueryPlugin;
use Spryker\Client\Kernel\AbstractFactory;

class AntelopeFactory extends AbstractFactory
{
    /**
     * @param string $name
     *
     * @return \Pyz\Client\Antelope\Plugin\Elasticsearch\Query\AntelopeQueryPlugin
     */
    public function createAntelopeQueryPlugin(string $name)
    {
        return new AntelopeQueryPlugin($name);
    }

    /**
     * @return array
     */
    public function getSearchQueryFormatters()
    {
        return $this->getProvidedDependency(AntelopeDependencyProvider::ANTELOPE_RESULT_FORMATTER_PLUGINS);
    }

    /**
     * @return \Spryker\Client\Search\SearchClientInterface
     */
    public function getSearchClient()
    {
        return $this->getProvidedDependency(AntelopeDependencyProvider::CLIENT_SEARCH);
    }
}
We can now add a small demo controller in Yves to display our Antelopes!

src/Pyz/Yves/Antelope/Controller/IndexController.php
<?php

namespace Pyz\Yves\Antelope\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;

/**
 * @method \Pyz\Client\Antelope\AntelopeClientInterface getClient()
 */
class IndexController extends AbstractController
{
    /**
     * @param string $name
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function indexAction(string $name)
    {
        $antelope = $this->getClient()->getAntelopeByName($name);

        return $this->view(
            [
                'antelope' => $antelope,
            ],
            [],
            '@Antelope/views/index/index.twig'
        );
    }
}
src/Pyz/Yves/Antelope/Plugin/Router/AntelopeRouteProviderPlugin.php
<?php

namespace Pyz\Yves\Antelope\Plugin\Router;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class AntelopeRouteProviderPlugin extends AbstractRouteProviderPlugin
{
    public const ANTELOPE_INDEX = 'antelope-index';

    /**
     * @inheritDoc
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $routeCollection = $this->addAntelopeIndexRoute($routeCollection);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    private function addAntelopeIndexRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/antelope/{name}', 'Antelope', 'Index', 'indexAction');
        $route = $route->setMethods(['GET']);
        $routeCollection->add(static::ANTELOPE_INDEX, $route);

        return $routeCollection;
    }
}
Including a template in src/Pyz/Yves/Antelope/Theme/default/views/index/index.twig:

src/Pyz/Yves/Antelope/Theme/default/views/index/index.twig
{% extends template('page-blank') %}

{% define data = {
    antelope: _view.antelope
} %}

{% block body %}
    <div style="background-color: {{ data.antelope.color }};">
        <div>Name: {{ data.antelope.name }}</div>
        <div>Color: {{ data.antelope.color }}</div>
    </div>
{% endblock %}
We need to register the route in Yves' RouterDependencyProvider.

src/Pyz/Yves/Router/RouterDependencyProvider.php
<?php

namespace Pyz\Yves\Router;

+ use Pyz\Yves\Antelope\Plugin\Router\AntelopeRouteProviderPlugin;
//...

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    //...
    
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            //...
+            new AntelopeRouteProviderPlugin(),
        ];
    }
Now go to Yves and call /antelope/<NAME> and see the members of your herd in freedom!
