---
slug: "/spryker/training/cms"
date: "2019-05-04"
title: "Hands on CMS"
category: "spryker"
type: "professional"
image: '../../../images/platforms/banner-spryker.png'
order: 6
---

We would actually like to see our Antelopes to run over the savannah. So, let us set them free!

Create a template for the savannah in src/Pyz/Shared/Cms/Theme/default/templates. Give it a fitting name like antelope/savannah.twig and create a CMS page in the Zed backend that is available under the /de/savannah URL. Don’t forget to fill the placeholders with some dummy text and publish it!

src/Pyz/Shared/Cms/Theme/default/templates/antelope/savannah.twig
{% extends template('page-layout-main') %}

{% define data = {
title: _view.pageTitle | default('global.spryker.shop' | trans),
metaTitle: _view.pageTitle | default('global.spryker.shop' | trans),
metaDescription: _view.pageDescription | default(''),
metaKeywords: _view.pageKeywords | default('')
} %}

{% block title %}

<!-- CMS_PLACEHOLDER : "title" -->
<h3>{{ spyCms('title') | raw }}</h3>
{% endblock %}

{% block content %}

<!-- CMS_PLACEHOLDER : "content" -->
<div style="background-color: brown;">
<h1>Savannah</h1>
{{ spyCms('content') | raw }}
</div>
{% endblock %}
Go to Yves’ /de/savannah and see your empty savannah.

Try to create a redirect for this page in order to have a more SEO friendly URL: /safari-park → /de/savannah

Now we would like to have our Antelopes roam this Savannah. For this, we will create a CMS content widget that we can embed in our CMS template. We will do this in a module that connects the concept of Antelope with the concept of CmsContentWidget. Let’s call it CmsContentWidgetAntelopeConnector. Create a content widget plugin for our Antelopes including the default template (e.g. in src/Pyz/Yves/CmsContentWidgetAntelopeConnector/Theme/default/views/cms-antelope/cms-antelope.twig).

src/Pyz/Yves/CmsContentWidgetAntelopeConnector/Plugin/CmsContentWidget/AntelopeContentWidgetPlugin.php

<?php

namespace Pyz\Yves\CmsContentWidgetAntelopeConnector\Plugin\CmsContentWidget;

use Spryker\Shared\CmsContentWidget\Dependency\CmsContentWidgetConfigurationProviderInterface;
use Spryker\Yves\CmsContentWidget\Dependency\CmsContentWidgetPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;
use Twig_Environment;

/**
 * @method \Pyz\Yves\CmsContentWidgetAntelopeConnector\CmsContentWidgetAntelopeConnectorFactory getFactory()
 */
class AntelopeContentWidgetPlugin extends AbstractPlugin implements CmsContentWidgetPluginInterface
{
/**
     * @var \Spryker\Shared\CmsContentWidget\Dependency\CmsContentWidgetConfigurationProviderInterface
     */
    protected $widgetConfiguration;

    public function __construct(CmsContentWidgetConfigurationProviderInterface $widgetConfiguration)
    {
$this->widgetConfiguration = $widgetConfiguration;
    }

    public function getContentWidgetFunction(): callable
    {
        return [$this, 'contentWidgetFunction'];
    }

    public function contentWidgetFunction(Twig_Environment $twig, array $context, array $names, $templateIdentifier = null): string
    {
$templatePath = $this->resolveTemplatePath($templateIdentifier);

        return $twig->render($templatePath, [
'antelope' => $this->getFactory()->getAntelopeClient()->getAntelopeByName($names[0])
        ]);
    }

    protected function resolveTemplatePath(?string $templateIdentifier = null): string
    {
$availableTemplates = $this->widgetConfiguration->getAvailableTemplates();
        if (!$templateIdentifier || !array_key_exists($templateIdentifier, $availableTemplates)) {
$templateIdentifier = CmsContentWidgetConfigurationProviderInterface::DEFAULT_TEMPLATE_IDENTIFIER;
        }

        return $availableTemplates[$templateIdentifier];
    }
}
src/Pyz/Yves/CmsContentWidgetAntelopeConnector/Theme/default/views/cms-antelope/cms-antelope.twig
{% block body %}
    <div style="background-color: {{ antelope.color }};">
{{ antelope.name }}
    </div>
{% endblock %}
Don’t forget to configure its dependencies!

src/Pyz/Yves/CmsContentWidgetAntelopeConnector/CmsContentWidgetAntelopeConnectorDependencyProvider.php
<?php

namespace Pyz\Yves\CmsContentWidgetAntelopeConnector;

use Spryker\Yves\Kernel\AbstractBundleDependencyProvider;
use Spryker\Yves\Kernel\Container;

class CmsContentWidgetAntelopeConnectorDependencyProvider extends AbstractBundleDependencyProvider
{
    public const CLIENT_ANTELOPE = 'CLIENT_ANTELOPE';

/**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
$container = parent::provideDependencies($container);
$container = $this->addCmsBlockStorageClient($container);

        return $container;
    }

/**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addCmsBlockStorageClient(Container $container): Container
    {
$container[static::CLIENT_ANTELOPE] = function (Container $container) {
            return $container->getLocator()->antelope()->client();
        };

        return $container;
    }
}
src/Pyz/Yves/CmsContentWidgetAntelopeConnector/CmsContentWidgetAntelopeConnectorFactory.php
<?php

namespace Pyz\Yves\CmsContentWidgetAntelopeConnector;

use Pyz\Client\Antelope\AntelopeClientInterface;
use Spryker\Yves\Kernel\AbstractFactory;

class CmsContentWidgetAntelopeConnectorFactory extends AbstractFactory
{
/**
     * @return \Pyz\Client\Antelope\AntelopeClientInterface
     */
    public function getAntelopeClient(): AntelopeClientInterface
    {
        return $this->getProvidedDependency(CmsContentWidgetAntelopeConnectorDependencyProvider::CLIENT_ANTELOPE);
    }
}
To have this CMS content widget shared between Yves and Zed, we have to add corresponding configuration providers. This is one of the rare occasions when we have to add some code to the Shared namespace.

src/Pyz/Shared/CmsContentWidgetAntelopeConnector/ContentWidgetConfigurationProvider/CmsContentWidgetAntelopeConnectorConfigurationProviderInterface.php
<?php

namespace Pyz\Shared\CmsContentWidgetAntelopeConnector\ContentWidgetConfigurationProvider;

use Spryker\Shared\CmsContentWidget\Dependency\CmsContentWidgetConfigurationProviderInterface;

interface CmsContentWidgetAntelopeConnectorConfigurationProviderInterface extends CmsContentWidgetConfigurationProviderInterface
{
/**
     * @return string
     */
    public function getFunctionName(): string;

/**
     * @return array
     */
    public function getAvailableTemplates(): array;

/**
     * @return string
     */
    public function getUsageInformation(): string;
}
src/Pyz/Shared/CmsContentWidgetAntelopeConnector/ContentWidgetConfigurationProvider/CmsContentWidgetAntelopeConnectorConfigurationProvider.php
<?php

namespace Pyz\Shared\CmsContentWidgetAntelopeConnector\ContentWidgetConfigurationProvider;

use Spryker\Shared\CmsContentWidget\Dependency\CmsContentWidgetConfigurationProviderInterface;

class CmsContentWidgetAntelopeConnectorConfigurationProvider implements CmsContentWidgetAntelopeConnectorConfigurationProviderInterface
{
    public const FUNCTION_NAME = 'antelope';

/**
     * @return string
     */
    public function getFunctionName(): string
    {
        return static::FUNCTION_NAME;
    }

/**
     * @return array
     */
    public function getAvailableTemplates(): array
    {
        return [
            CmsContentWidgetConfigurationProviderInterface::DEFAULT_TEMPLATE_IDENTIFIER => '@CmsContentWidgetAntelopeConnector/views/cms-antelope/cms-antelope.twig',
        ];
    }

/**
     * @return string
     */
    public function getUsageInformation(): string
    {
        return "{{ antelope(['name']) }}. To use a different template {{ antelope(['name'], 'default') }}.";
    }
}
Finally, we have to add these configurations to the CMS widget plugin stacks in Yves AND Zed!

src/Pyz/Yves/CmsContentWidget/CmsContentWidgetDependencyProvider.php
<?php

namespace Pyz\Yves\CmsContentWidget;

+ use Pyz\Shared\CmsContentWidgetAntelopeConnector\ContentWidgetConfigurationProvider\CmsContentWidgetAntelopeConnectorConfigurationProvider;
+ use Pyz\Yves\CmsContentWidgetAntelopeConnector\Plugin\CmsContentWidget\AntelopeContentWidgetPlugin;
//...

class CmsContentWidgetDependencyProvider extends SprykerCmsContentWidgetDependencyProvider
{
    /**
     * @return \Spryker\Yves\CmsContentWidget\Dependency\CmsContentWidgetPluginInterface[]
     */
    public function getCmsContentWidgetPlugins()
    {
        return [
            //...
+            CmsContentWidgetAntelopeConnectorConfigurationProvider::FUNCTION_NAME => new AntelopeContentWidgetPlugin(
+                new CmsContentWidgetAntelopeConnectorConfigurationProvider()
+            ),
        ];
src/Pyz/Zed/CmsContentWidget/CmsContentWidgetConfig.php
<?php

namespace Pyz\Zed\CmsContentWidget;

+ use Pyz\Shared\CmsContentWidgetAntelopeConnector\ContentWidgetConfigurationProvider\CmsContentWidgetAntelopeConnectorConfigurationProvider;
//...

class CmsContentWidgetConfig extends SprykerCmsContentConfig
{
    /**
     * {@inheritdoc}
     *
     * @return array|\Spryker\Shared\CmsContentWidget\Dependency\CmsContentWidgetConfigurationProviderInterface[]
     */
    public function getCmsContentWidgetConfigurationProviders()
    {
        return [
+            //...
+            CmsContentWidgetAntelopeConnectorConfigurationProvider::FUNCTION_NAME => new CmsContentWidgetAntelopeConnectorConfigurationProvider(),
        ];
You can now go back to the Zed UI and add your Antelope CMS widget to your savannah page. Below the WYSIWYG editor box is a description of how to do that. Save AND publish! Then, visit Yves /safari-park, and cheer for your Antelope!
