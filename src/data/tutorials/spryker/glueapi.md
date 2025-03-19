---
slug: "/spryker/training/glue-api"
date: "2019-05-04"
title: "Glue API"
category: "spryker"
category_key: 'spryker'
type: "professional"
image: '../../../images/platforms/banner-spryker.png'
order: 5
---

## Objective

Fetch data from database using Glue API

In order to make the Magazine Reviews available through the Glue API, we have to create a new module that by convention will be called MagazineReviewsRestApi.

- First of all, we have to create a **RestApiAttributesTransfer** that will represent how the resource will be communicated to the outside (of course embedded in a bigger context).

> src/Pyz/Shared/MagazineReviewsRestApi/Transfer/magazine_reviews_rest_api.transfer.xml

```xml
<?xml version="1.0"?>

<transfers xmlns="spryker:transfer-01"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="RestMagazineReviewsAttributes">
        <property name="magazineName" type="string"/>
        <property name="reviewTitle" type="string"/>
        <property name="reviewDescription" type="string"/>
    </transfer>

</transfers>
```

- Generate the corresponding PHP class with **docker/sdk console transfer:generate**.

- Then, we need a way to map the original data (from the datastores, through the client) to map to our output format. We actually do not want to change anything in this case.

> src/Pyz/Glue/MagazineReviewsRestApi/Processor/Mapper/MagazineReviewsResourceMapperInterface.php

```php
<?php

namespace Pyz\Glue\MagazineReviewsRestApi\Processor\Mapper;

use Generated\Shared\Transfer\RestMagazineReviewsAttributesTransfer;

interface MagazineReviewsResourceMapperInterface
{
    public function mapMagazineReviewsDataToMagazineReviewsRestAttributes(array $magazineReviewsData): RestMagazineReviewsAttributesTransfer;
}
```

> src/Pyz/Glue/MagazineReviewsRestApi/Processor/Mapper/MagazineReviewsResourceMapper.php

```php
<?php

namespace Pyz\Glue\MagazineReviewsRestApi\Processor\Mapper;

use Generated\Shared\Transfer\RestMagazineReviewsAttributesTransfer;

class MagazineReviewsResourceMapper implements MagazineReviewsResourceMapperInterface
{
    public function mapMagazineReviewsDataToMagazineReviewsRestAttributes(array $magazineReviewsData): RestMagazineReviewsAttributesTransfer
    {
        $restMagazineReviewsAttributesTransfer = (new RestMagazineReviewsAttributesTransfer())->fromArray($magazineReviewsData, true);

        return $restMagazineReviewsAttributesTransfer;
    }
}
```

- This mapper can now be used in an MagazineReviewsReader that can provide the data to the API infrastructure. The reader prepares a response for the Glue infrastructure, even in case of failure. Thus, it has to know which error codes to return.

> src/Pyz/Glue/MagazineReviewsRestApi/MagazineReviewsRestApiConfig.php

```php
<?php

namespace Pyz\Glue\MagazineReviewsRestApi;

use Spryker\Glue\Kernel\AbstractBundleConfig;

class MagazineReviewsRestApiConfig extends AbstractBundleConfig
{
    public const RESOURCE_MAGAZINE_REVIEWS = 'magazine_reviews';
    public const RESPONSE_CODE_CANT_FIND_MAGAZINE_REVIEW = '301';
    public const RESPONSE_DETAIL_CANT_FIND_MAGAZINE_REVIEW = 'MagazineReviews was not found.';
    public const RESPONSE_CODE_MAGAZINE_REVIEW_NAME_IS_NOT_SPECIFIED = '311';
    public const RESPONSE_DETAIL_MAGAZINE_REVIEW_NAME_IS_NOT_SPECIFIED = 'MagazineReviews name is not specified.';
}
```

> src/Pyz/Glue/MagazineReviewsRestApi/Processor/MagazineReviews/MagazineReviewsReaderInterface.php

```php
<?php

namespace Pyz\Glue\MagazineReviewsRestApi\Processor\MagazineReviews;

use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface;
use Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface;

interface MagazineReviewsReaderInterface
{
    public function getMagazineReviewsSearchData(RestRequestInterface $restRequest): RestResponseInterface;
    public function findMagazineReviewsByName(string $name, RestRequestInterface $restRequest): ?RestResourceInterface;
}
```

> src/Pyz/Glue/MagazineReviewsRestApi/Processor/MagazineReviews/MagazineReviewsReader.php

```php
<?php

namespace Pyz\Glue\MagazineReviewsRestApi\Processor\MagazineReviews;

use Generated\Shared\Transfer\RestErrorMessageTransfer;
use Pyz\Client\MagazineReviews\MagazineReviewsClientInterface;
use Pyz\Glue\MagazineReviewsRestApi\MagazineReviewsRestApiConfig;
use Pyz\Glue\MagazineReviewsRestApi\Processor\Mapper\MagazineReviewsResourceMapperInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceBuilderInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface;
use Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface;
use Symfony\Component\HttpFoundation\Response;

class MagazineReviewsReader implements MagazineReviewsReaderInterface
{
    /** @var MagazineReviewsClientInterface */
    protected $magazineReviewClient;

    /** @var \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceBuilderInterface */
    protected $restResourceBuilder;

    /** @var \Pyz\Glue\MagazineReviewsRestApi\Processor\Mapper\MagazineReviewsResourceMapperInterface */
    protected $magazineReviewsResourceMapper;

    public function __construct(
        MagazineReviewsClientInterface $magazineReviewClient,
        RestResourceBuilderInterface $restResourceBuilder,
        MagazineReviewsResourceMapperInterface $magazineReviewsResourceMapper
    ) {
        $this->magazineReviewClient = $magazineReviewClient;
        $this->restResourceBuilder = $restResourceBuilder;
        $this->magazineReviewsResourceMapper = $magazineReviewsResourceMapper;
    }

    public function getMagazineReviewsSearchData(RestRequestInterface $restRequest): RestResponseInterface
    {
        $response = $this->restResourceBuilder->createRestResponse();

        $resourceIdentifier = $restRequest->getResource()->getId();

        if (!$resourceIdentifier) {
            return $this->addMagazineReviewsNameSpecifiedError($response);
        }

        $restResource = $this->findMagazineReviewsByName($resourceIdentifier, $restRequest);

        if (!$restResource) {
            return $this->addMagazineReviewsNotFoundError($response);
        }

        return $response->addResource($restResource);
    }

    public function findMagazineReviewsByName(string $name, RestRequestInterface $restRequest): ?RestResourceInterface
    {
        $magazineReviewsData = $this->magazineReviewClient->getMagazineReviewsByName($name);

        if (empty($magazineReviewsData)) {
            return null;
        }

        return $this->createRestResourceFromMagazineReviewsSearchData($magazineReviewsData, $restRequest);
    }

    protected function createRestResourceFromMagazineReviewsSearchData(array $magazineReviewsData, RestRequestInterface $restRequest): RestResourceInterface
    {
        $restMagazineReviewsAttributesTransfer = $this->magazineReviewsResourceMapper
            ->mapMagazineReviewsDataToMagazineReviewsRestAttributes($magazineReviewsData);

        return $this->restResourceBuilder->createRestResource(
            MagazineReviewsRestApiConfig::RESOURCE_MAGAZINE_REVIEWS,
            $restMagazineReviewsAttributesTransfer->getName(),
            $restMagazineReviewsAttributesTransfer
        );
    }

    protected function addMagazineReviewsNameSpecifiedError(RestResponseInterface $response): RestResponseInterface
    {
        $restErrorTransfer = (new RestErrorMessageTransfer())
            ->setCode(MagazineReviewsRestApiConfig::RESPONSE_CODE_MAGAZINE_REVIEW_NAME_IS_NOT_SPECIFIED)
            ->setStatus(Response::HTTP_BAD_REQUEST)
            ->setDetail(MagazineReviewsRestApiConfig::RESPONSE_DETAIL_MAGAZINE_REVIEW_NAME_IS_NOT_SPECIFIED);

        return $response->addError($restErrorTransfer);
    }

    protected function addMagazineReviewsNotFoundError(RestResponseInterface $response): RestResponseInterface
    {
        $restErrorTransfer = (new RestErrorMessageTransfer())
            ->setCode(MagazineReviewsRestApiConfig::RESPONSE_CODE_CANT_FIND_MAGAZINE_REVIEW)
            ->setStatus(Response::HTTP_NOT_FOUND)
            ->setDetail(MagazineReviewsRestApiConfig::RESPONSE_DETAIL_CANT_FIND_MAGAZINE_REVIEW);

        return $response->addError($restErrorTransfer);
    }
}
```

- Don’t forget to wire it up!

> src/Pyz/Glue/MagazineReviewsRestApi/MagazineReviewsRestApiDependencyProvider.php

```php
<?php

namespace Pyz\Glue\MagazineReviewsRestApi;

use Spryker\Glue\Kernel\AbstractBundleDependencyProvider;
use Spryker\Glue\Kernel\Container;

/**
 * @method \Pyz\Glue\MagazineReviewsRestApi\MagazineReviewsRestApiConfig getConfig()
 */
class MagazineReviewsRestApiDependencyProvider extends AbstractBundleDependencyProvider
{
    public const CLIENT_MAGAZINE_REVIEW = 'CLIENT_MAGAZINE_REVIEW';

    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);

        $container = $this->addMagazineReviewsClient($container);

        return $container;
    }

    protected function addMagazineReviewsClient(Container $container): Container
    {
        $container[static::CLIENT_MAGAZINE_REVIEW] = function (Container $container) {
            return $container->getLocator()->magazineReview()->client();
        };

        return $container;
    }
}
```

> src/Pyz/Glue/MagazineReviewsRestApi/MagazineReviewsRestApiFactory.php

```php
<?php

namespace Pyz\Glue\MagazineReviewsRestApi;

use Pyz\Client\MagazineReviews\MagazineReviewsClientInterface;
use Pyz\Glue\MagazineReviewsRestApi\Processor\MagazineReviews\MagazineReviewsReader;
use Pyz\Glue\MagazineReviewsRestApi\Processor\MagazineReviews\MagazineReviewsReaderInterface;
use Pyz\Glue\MagazineReviewsRestApi\Processor\Mapper\MagazineReviewsResourceMapper;
use Spryker\Glue\Kernel\AbstractFactory;

class MagazineReviewsRestApiFactory extends AbstractFactory
{
    public function createMagazineReviewsResourceMapper(): MagazineReviewsResourceMapper
    {
        return new MagazineReviewsResourceMapper();
    }

    public function createMagazineReviewsReader(): MagazineReviewsReaderInterface
    {
        return new MagazineReviewsReader(
            $this->getMagazineReviewsClient(),
            $this->getResourceBuilder(),
            $this->createMagazineReviewsResourceMapper()
        );
    }

    public function getMagazineReviewsClient(): MagazineReviewsClientInterface
    {
        return $this->getProvidedDependency(MagazineReviewsRestApiDependencyProvider::CLIENT_MAGAZINE_REVIEW);
    }
}
```

- Now we have to make this available through an according controller with some info for the documentation generator (calling docker/sdk console rest-api:generate:documentation will create an OpenAPI definition file of your current APII configuration in `src/Generated/Glue/Specification/spryker_rest_api.schema.yml`).

> `src/Pyz/Glue/MagazineReviewsRestApi/Controller/MagazineReviewsResourceController.php`

```php
<?php

namespace Pyz\Glue\MagazineReviewsRestApi\Controller;

use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface;
use Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface;
use Spryker\Glue\Kernel\Controller\AbstractController;

/**
 * @method \Pyz\Glue\MagazineReviewsRestApi\MagazineReviewsRestApiFactory getFactory()
 */
class MagazineReviewsResourceController extends AbstractController
{
    /**
     * @Glue({
     *     "getResourceById": {
     *          "summary": [
     *              "Retrieves MagazineReviews by name."
     *          ],
     *          "parameters": [{
     *              "name": "Accept-Language",
     *              "in": "header"
     *          }],
     *          "responses": {
     *              "400": "MagazineReviews uuid is not specified.",
     *              "404": "MagazineReviews not found."
     *          }
     *     }
     * })
     *
     * @param \Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface $restRequest
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function getAction(RestRequestInterface $restRequest): RestResponseInterface
    {
        return $this->getFactory()
            ->createMagazineReviewsReader()
            ->getMagazineReviewsSearchData($restRequest);
    }
}
```

- Tell Glue what we actually want to allow for this Resource through a ResourceRoutePlugin, that we register in the GlueApplicationDependencyProvider.

> `src/Pyz/Glue/MagazineReviewsRestApi/Plugin/MagazineReviewsResourceRoutePlugin.php`

```php
<?php

namespace Pyz\Glue\MagazineReviewsRestApi\Plugin;

use Generated\Shared\Transfer\RestMagazineReviewsAttributesTransfer;
use Pyz\Glue\MagazineReviewsRestApi\MagazineReviewsRestApiConfig;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRouteCollectionInterface;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface;
use Spryker\Glue\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Glue\MagazineReviewsRestApi\MagazineReviewsRestApiFactory getFactory()
 */
class MagazineReviewsResourceRoutePlugin extends AbstractPlugin implements ResourceRoutePluginInterface
{
    public function configure(ResourceRouteCollectionInterface $resourceRouteCollection): ResourceRouteCollectionInterface
    {
        $resourceRouteCollection
            ->addGet('get', false);

        return $resourceRouteCollection;
    }

    public function getResourceType(): string
    {
        return MagazineReviewsRestApiConfig::RESOURCE_MAGAZINE_REVIEWS;
    }

    public function getController(): string
    {
        return 'magazine-reviews-resource';
    }

    public function getResourceAttributesClassName(): string
    {
        return RestMagazineReviewsAttributesTransfer::class;
    }
}
```

> `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`

```php
<?php

namespace Pyz\Glue\GlueApplication;

+ use Pyz\Glue\MagazineReviewsRestApi\Plugin\MagazineReviewsResourceRoutePlugin;
//...

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * {@inheritdoc}
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            //...
+            new MagazineReviewsResourceRoutePlugin(),
        ];
    }
    //...
}
```

- Optionally, we can make this resource available for re-use in relationships with other resources.

> `src/Pyz/Glue/MagazineReviewsRestApi/MagazineReviewsRestApiResourceInterface.php`

```php
<?php

namespace Pyz\Glue\MagazineReviewsRestApi;

use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface;
use Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface;

interface MagazineReviewsRestApiResourceInterface
{
    public function findMagazineReviewsByName(string $name, RestRequestInterface $restRequest): ?RestResourceInterface;
}
```

- `src/Pyz/Glue/MagazineReviewsRestApi/MagazineReviewsRestApiResource.php`

```php
<?php

namespace Pyz\Glue\MagazineReviewsRestApi;

use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface;
use Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface;
use Spryker\Glue\Kernel\AbstractRestResource;

/**
 * @method \Pyz\Glue\MagazineReviewsRestApi\MagazineReviewsRestApiFactory getFactory()
 */
class MagazineReviewsRestApiResource extends AbstractRestResource implements MagazineReviewsRestApiResourceInterface
{
    public function findMagazineReviewsByName(string $name, RestRequestInterface $restRequest): ?RestResourceInterface
    {
        return $this->getFactory()
            ->createMagazineReviewsReader()
            ->findMagazineReviewsByName($name, $restRequest);
    }
}
```

- Now, visit /magazine-reviews/<MAGAZINE_REVIEW_NAME> on your glue endpoint and celebrate!
