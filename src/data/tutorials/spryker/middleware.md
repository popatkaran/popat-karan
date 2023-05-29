---
slug: "/spryker/training/middleware"
date: "2019-05-04"
title: "Middleware"
category: "Spryker Tutorials"
type: "professional"
order: 9
---

Middleware
To make the Middleware itself generally available, we first have to require the spryker-middleware/process module through composer inside of our virtual machine.

composer require spryker-middleware/process
If it fails with memory issues, we might want to buff the process a little bit up:

php -d memory_limit=-1 \$(which composer) require spryker-middleware/process
or even run this locally if you have composer available, but be aware that we instruct composer to ignore some of our system restrictions this way:

php -d memory_limit=-1 \$(which composer) require spryker-middleware/process --ignore-platform-reqs
Then, we have to add the SprykerMiddleware namespace to config_default.php.

config/Shared/config_default.php
\$config[ KernelConstants::CORE_NAMESPACES] = [
'SprykerShop',

- 'SprykerMiddleware',
  'SprykerEco',
  'Spryker',
  'SprykerSdk',
  ];
  Register the console command and generate the necessary TransferObjects

src/Pyz/Zed/Console/ConsoleDependencyProvider.php

<?php

namespace Pyz\Zed\Console;

+ use SprykerMiddleware\Zed\Process\Communication\Console\ProcessConsole;
//...

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            //...
+            new ProcessConsole(),
        ];
$ console transfer:generate
Now we can begin to write our actual functionality.

We plan to have a set of records in a line-by-line JSON format.

And we want to transform part of the data. Create a directory, e.g. data/import/demo/ and put in.json into it.

in.json should have the following content for our task:

data/import/demo/in.json
{"name":"Bob","color":"grey"}
{"name":"Lucy","color":"yellow"}
{"name":"Jane","color":"grey"}
(Because of a little bug in the reader, we probably have to tweak our editor settings here a bit. Check .editorconfig and your IDE settings to not put a new line at the end of files by default! You might want to change these settings back after the task is done.)

We can now create a TranslatorFunction that does our transformation and then create a dictionary, to give our process a recipe on what translations we actually want to perform on the data. Let’s do this in a new module that connects our antelopes and the Middleware: AntelopeMiddlewareConnector

src/Pyz/Zed/AntelopeMiddlewareConnector/Business/Translator/TranslatorFunction/GreyToPink.php
<?php

namespace Pyz\Zed\AntelopeMiddlewareConnector\Business\Translator\TranslatorFunction;

use SprykerMiddleware\Zed\Process\Business\Translator\TranslatorFunction\AbstractTranslatorFunction;
use SprykerMiddleware\Zed\Process\Business\Translator\TranslatorFunction\TranslatorFunctionInterface;

class GreyToPink extends AbstractTranslatorFunction implements TranslatorFunctionInterface
{
    protected const COLOR_GREY = 'grey';
    protected const COLOR_PINK = 'pink';

    /**
     * @param mixed $value
     * @param array $payload
     *
     * @return mixed
     */
    public function translate($value, array $payload)
    {
        if ($value === static::COLOR_GREY) {
            return static::COLOR_PINK;
        }

        return $value;
    }
}
src/Pyz/Zed/AntelopeMiddlewareConnector/Business/Translator/Dictionary/AntelopeDictionary.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector\Business\Translator\Dictionary;
 
use SprykerMiddleware\Zed\Process\Business\Translator\Dictionary\AbstractDictionary;
 
class AntelopeDictionary extends AbstractDictionary
{
    /**
     * @return array
     */
    public function getDictionary(): array
    {
        return [
            'color' => 'GreyToPink',
        ];
    }
}
Then, we wire things together.

In order to have the dictionary available for our plugins, we have to expose it through the facade:

src/Pyz/Zed/AntelopeMiddlewareConnector/Business/AntelopeMiddlewareConnectorBusinessFactory.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector\Business;
 
use Pyz\Zed\AntelopeMiddlewareConnector\Business\Translator\Dictionary\AntelopeDictionary;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use SprykerMiddleware\Zed\Process\Business\Translator\Dictionary\DictionaryInterface;
 
class AntelopeMiddlewareConnectorBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \SprykerMiddleware\Zed\Process\Business\Translator\Dictionary\DictionaryInterface
     */
    public function createAntelopeDictionary(): DictionaryInterface
    {
        return new AntelopeDictionary();
    }
}
src/Pyz/Zed/AntelopeMiddlewareConnector/Business/AntelopeMiddlewareConnectorFacadeInterface.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector\Business;
 
use Generated\Shared\Transfer\TranslatorConfigTransfer;
 
/**
 * @method \Pyz\Zed\AntelopeMiddlewareConnector\Business\AntelopeMiddlewareConnectorBusinessFactory getFactory()
 */
interface AntelopeMiddlewareConnectorFacadeInterface
{
    /**
     * @return \Generated\Shared\Transfer\TranslatorConfigTransfer;
     */
    public function getAntelopeTranslatorConfig(): TranslatorConfigTransfer;
}
src/Pyz/Zed/AntelopeMiddlewareConnector/Business/AntelopeMiddlewareConnectorFacade.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector\Business;
 
use Generated\Shared\Transfer\TranslatorConfigTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;
 
/**
 * @method \Pyz\Zed\AntelopeMiddlewareConnector\Business\AntelopeMiddlewareConnectorBusinessFactory getFactory()
 */
class AntelopeMiddlewareConnectorFacade extends AbstractFacade implements AntelopeMiddlewareConnectorFacadeInterface
{
    /**
     * @return \Generated\Shared\Transfer\TranslatorConfigTransfer;
     */
    public function getAntelopeTranslatorConfig(): TranslatorConfigTransfer
    {
        return $this->getFactory()
            ->createAntelopeDictionary()
            ->getTranslatorConfig();
    }
}
And wrap it into a StagePlugin (that needs access to the ProcessFacade)

src/Pyz/Zed/AntelopeMiddlewareConnector/AntelopeMiddlewareConnectorDependencyProvider.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector;
 
use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;
 
class AntelopeMiddlewareConnectorDependencyProvider extends AbstractBundleDependencyProvider
{
    public const FACADE_PROCESS = 'FACADE_PROCESS';
 
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = $this->addFacadeProcess($container);
 
        return $container;
    }
 
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addFacadeProcess(Container $container): Container
    {
        $container[static::FACADE_PROCESS] = function (Container $container) {
            return $container->getLocator()->process()->facade();
        };
        return $container;
    }
}
src/Pyz/Zed/AntelopeMiddlewareConnector/Communication/AntelopeMiddlewareConnectorCommunicationFactory.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector\Communication;
 
use Pyz\Zed\AntelopeMiddlewareConnector\AntelopeMiddlewareConnectorDependencyProvider;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use SprykerMiddleware\Zed\Process\Business\ProcessFacadeInterface;
 
class AntelopeMiddlewareConnectorCommunicationFactory extends AbstractCommunicationFactory
{
    public function getProcessFacade(): ProcessFacadeInterface
    {
        return $this->getProvidedDependency(AntelopeMiddlewareConnectorDependencyProvider::FACADE_PROCESS);
    }
}
src/Pyz/Zed/AntelopeMiddlewareConnector/Communication/Plugin/AntelopeTranslationStagePlugin.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector\Communication\Plugin;
 
use Generated\Shared\Transfer\TranslatorConfigTransfer;
use Pyz\Zed\AntelopeMiddlewareConnector\Business\AntelopeMiddlewareConnectorFacadeInterface;
use Pyz\Zed\AntelopeMiddlewareConnector\Communication\AntelopeMiddlewareConnectorCommunicationFactory;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use SprykerMiddleware\Shared\Process\Stream\WriteStreamInterface;
use SprykerMiddleware\Zed\Process\Dependency\Plugin\StagePluginInterface;
 
/**
 * @method AntelopeMiddlewareConnectorCommunicationFactory getFactory()
 * @method AntelopeMiddlewareConnectorFacadeInterface getFacade()
 */
class AntelopeTranslationStagePlugin extends AbstractPlugin implements StagePluginInterface
{
    protected const PLUGIN_NAME = 'AntelopeTranslationStagePlugin';
 
    /**
     * @return \Generated\Shared\Transfer\TranslatorConfigTransfer
     */
    protected function getTranslatorConfig(): TranslatorConfigTransfer
    {
        return $this->getFacade()
            ->getAntelopeTranslatorConfig();
    }
 
    /**
     * @param mixed $payload
     * @param \SprykerMiddleware\Shared\Process\Stream\WriteStreamInterface $outStream
     * @param mixed $originalPayload
     *
     * @return mixed
     */
    public function process($payload, WriteStreamInterface $outStream, $originalPayload)
    {
        return $this->getFactory()
            ->getProcessFacade()
            ->translate($payload, $this->getTranslatorConfig());
    }
 
    /**
     * @return string
     */
    public function getName(): string
    {
        return static::PLUGIN_NAME;
    }
}
The TranslatorFunction is made available in a different way.

src/Pyz/Zed/AntelopeMiddlewareConnector/Communication/Plugin/TranslatorFunction/GreyToPinkTranslatorFunctionPlugin.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector\Communication\Plugin\TranslatorFunction;
 
use Pyz\Zed\AntelopeMiddlewareConnector\Business\Translator\TranslatorFunction\GreyToPink;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use SprykerMiddleware\Zed\Process\Dependency\Plugin\TranslatorFunction\GenericTranslatorFunctionPluginInterface;
 
class GreyToPinkTranslatorFunctionPlugin extends AbstractPlugin implements GenericTranslatorFunctionPluginInterface
{
    protected const NAME = 'GreyToPink';
 
    /**
     * @return string
     */
    public function getName(): string
    {
        return static::NAME;
    }
 
    /**
     * @return string
     */
    public function getTranslatorFunctionClassName(): string
    {
        return GreyToPink::class;
    }
 
    /**
     * @param mixed $value
     * @param array $payload
     * @param string $key
     * @param array $options
     *
     * @return mixed
     */
    public function translate($value, array $payload, string $key, array $options)
    {
        return (new GreyToPink())->translate($value, $payload);// This is a shortcut
    }
}
With a set of standard plugins, we have everything together and make it available in AntelopeMiddlewareConnectorDependencyProvider, so that we can finally construct the ProcessPlugin, and with that finally the ProfilePlugin that we have to register in the ProcessDependencyProvider.

src/Pyz/Zed/AntelopeMiddlewareConnector/AntelopeMiddlewareConnectorDependencyProvider.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector;
 
use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;
+ use Pyz\Zed\AntelopeMiddlewareConnector\Communication\Plugin\AntelopeTranslationStagePlugin;
+ use SprykerMiddleware\Zed\Process\Communication\Plugin\Iterator\NullIteratorPlugin;
+ use SprykerMiddleware\Zed\Process\Communication\Plugin\Log\MiddlewareLoggerConfigPlugin;
+ use SprykerMiddleware\Zed\Process\Communication\Plugin\Stream\JsonRowInputStreamPlugin;
+ use SprykerMiddleware\Zed\Process\Communication\Plugin\Stream\JsonRowOutputStreamPlugin;
+ use SprykerMiddleware\Zed\Process\Communication\Plugin\StreamReaderStagePlugin;
+ use SprykerMiddleware\Zed\Process\Communication\Plugin\StreamWriterStagePlugin;
 
class AntelopeMiddlewareConnectorDependencyProvider extends AbstractBundleDependencyProvider
{
+    public const ANTELOPE_INPUT_STREAM_PLUGIN = 'ANTELOPE_INPUT_STREAM_PLUGIN';
+    public const ANTELOPE_OUTPUT_STREAM_PLUGIN = 'ANTELOPE_OUTPUT_STREAM_PLUGIN';
+    public const ANTELOPE_ITERATOR_PLUGIN = 'ANTELOPE_ITERATOR_PLUGIN';
+    public const ANTELOPE_STAGE_PLUGIN_STACK = 'ANTELOPE_STAGE_PLUGIN_STACK';
+    public const ANTELOPE_LOGGER_PLUGIN = 'ANTELOPE_LOGGER_PLUGIN';
    public const FACADE_PROCESS = 'FACADE_PROCESS';
 
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = $this->addFacadeProcess($container);
+        $container = $this->addAntelopeTransformationProcessPlugins($container);
 
        return $container;
    }
 
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addFacadeProcess(Container $container): Container
    {
        $container[static::FACADE_PROCESS] = function (Container $container) {
            return $container->getLocator()->process()->facade();
        };
        return $container;
    }
 
+    /**
+     * @param \Spryker\Zed\Kernel\Container $container
+     *
+     * @return \Spryker\Zed\Kernel\Container
+     */
+    protected function addAntelopeTransformationProcessPlugins(Container $container): Container
+    {
+        $container[static::ANTELOPE_INPUT_STREAM_PLUGIN] = function () {
+            return new JsonRowInputStreamPlugin();
+        };
+        $container[static::ANTELOPE_OUTPUT_STREAM_PLUGIN] = function () {
+            return new JsonRowOutputStreamPlugin();
+        };
+        $container[static::ANTELOPE_ITERATOR_PLUGIN] = function () {
+            return new NullIteratorPlugin();
+        };
+        $container[static::ANTELOPE_STAGE_PLUGIN_STACK] = function () {
+            return [
+                new StreamReaderStagePlugin(),
+                new AntelopeTranslationStagePlugin(),
+                new StreamWriterStagePlugin(),
+            ];
+        };
+        $container[static::ANTELOPE_LOGGER_PLUGIN] = function () {
+            return new MiddlewareLoggerConfigPlugin();
+        };
+ 
+        return $container;
+    }
}
src/Pyz/Zed/AntelopeMiddlewareConnector/Communication/AntelopeMiddlewareConnectorCommunicationFactory.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector\Communication;
 
use Pyz\Zed\AntelopeMiddlewareConnector\AntelopeMiddlewareConnectorDependencyProvider;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use SprykerMiddleware\Zed\Process\Business\ProcessFacadeInterface;
+ use SprykerMiddleware\Zed\Process\Business\Translator\TranslatorFunction\TranslatorFunctionInterface;
+ use SprykerMiddleware\Zed\Process\Dependency\Plugin\Configuration\ProcessConfigurationPluginInterface;
+ use SprykerMiddleware\Zed\Process\Dependency\Plugin\Iterator\ProcessIteratorPluginInterface;
+ use SprykerMiddleware\Zed\Process\Dependency\Plugin\Log\MiddlewareLoggerConfigPluginInterface;
+ use SprykerMiddleware\Zed\Process\Dependency\Plugin\StagePluginInterface;
+ use SprykerMiddleware\Zed\Process\Dependency\Plugin\Stream\InputStreamPluginInterface;
+ use SprykerMiddleware\Zed\Process\Dependency\Plugin\Stream\OutputStreamPluginInterface;
 
class AntelopeMiddlewareConnectorCommunicationFactory extends AbstractCommunicationFactory
{

+    public function getAntelopeInputStreamPlugin(): InputStreamPluginInterface
+    {
+        return $this->getProvidedDependency(AntelopeMiddlewareConnectorDependencyProvider::ANTELOPE_INPUT_STREAM_PLUGIN);
+    }
+ 
+    public function getAntelopeOutputStreamPlugin(): OutputStreamPluginInterface
+    {
+        return $this->getProvidedDependency(AntelopeMiddlewareConnectorDependencyProvider::ANTELOPE_OUTPUT_STREAM_PLUGIN);
+    }
+ 
+    public function getAntelopeIteratorPlugin(): ProcessIteratorPluginInterface
+    {
+        return $this->getProvidedDependency(AntelopeMiddlewareConnectorDependencyProvider::ANTELOPE_ITERATOR_PLUGIN);
+    }
+ 
+    public function getAntelopeLoggerConfigPlugin(): MiddlewareLoggerConfigPluginInterface
+    {
+        return $this->getProvidedDependency(AntelopeMiddlewareConnectorDependencyProvider::ANTELOPE_LOGGER_PLUGIN);
+    }
+ 
+    /**
+     * @return StagePluginInterface[]
+     */
+    public function getAntelopeStagePluginStack(): array
+    {
+        return $this->getProvidedDependency(AntelopeMiddlewareConnectorDependencyProvider::ANTELOPE_STAGE_PLUGIN_STACK);
+    }
 
    public function getProcessFacade(): ProcessFacadeInterface
    {
        return $this->getProvidedDependency(AntelopeMiddlewareConnectorDependencyProvider::FACADE_PROCESS);
    }
}
src/Pyz/Zed/AntelopeMiddlewareConnector/Communication/Plugin/Configuration/AntelopeTransformationProcessPlugin.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector\Communication\Plugin\Configuration;
 
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use SprykerMiddleware\Zed\Process\Dependency\Plugin\Configuration\ProcessConfigurationPluginInterface;
use SprykerMiddleware\Zed\Process\Dependency\Plugin\Iterator\ProcessIteratorPluginInterface;
use SprykerMiddleware\Zed\Process\Dependency\Plugin\Log\MiddlewareLoggerConfigPluginInterface;
use SprykerMiddleware\Zed\Process\Dependency\Plugin\Stream\InputStreamPluginInterface;
use SprykerMiddleware\Zed\Process\Dependency\Plugin\Stream\OutputStreamPluginInterface;
 
/**
 * @method \Pyz\Zed\AntelopeMiddlewareConnector\Communication\AntelopeMiddlewareConnectorCommunicationFactory getFactory()
 */
class AntelopeTransformationProcessPlugin extends AbstractPlugin implements ProcessConfigurationPluginInterface
{
    protected const PROCESS_NAME = 'ANTELOPE_PROCESS';
 
    /**
     * @return string
     */
    public function getProcessName(): string
    {
        return static::PROCESS_NAME;
    }
 
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Stream\InputStreamPluginInterface
     */
    public function getInputStreamPlugin(): InputStreamPluginInterface
    {
        return $this->getFactory()
            ->getAntelopeInputStreamPlugin();
    }
 
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Stream\OutputStreamPluginInterface
     */
    public function getOutputStreamPlugin(): OutputStreamPluginInterface
    {
        return $this->getFactory()
            ->getAntelopeOutputStreamPlugin();
    }
 
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Iterator\ProcessIteratorPluginInterface
     */
    public function getIteratorPlugin(): ProcessIteratorPluginInterface
    {
        return $this->getFactory()
            ->getAntelopeIteratorPlugin();
    }
 
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\StagePluginInterface[]
     */
    public function getStagePlugins(): array
    {
        return $this->getFactory()
            ->getAntelopeStagePluginStack();
    }
 
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Log\MiddlewareLoggerConfigPluginInterface
     */
    public function getLoggerPlugin(): MiddlewareLoggerConfigPluginInterface
    {
        return $this->getFactory()
            ->getAntelopeLoggerConfigPlugin();
    }
 
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Hook\PreProcessorHookPluginInterface[]
     */
    public function getPreProcessorHookPlugins(): array
    {
        return [];
    }
 
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Hook\PostProcessorHookPluginInterface[]
     */
    public function getPostProcessorHookPlugins(): array
    {
        return [];
    }
}
This process, together with our translator function, we now make available in a MiddlewareConfigurationProfile

src/Pyz/Zed/AntelopeMiddlewareConnector/AntelopeMiddlewareConnectorDependencyProvider.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector;
 
+ use Pyz\Zed\AntelopeMiddlewareConnector\Communication\Plugin\AntelopeTranslationStagePlugin;
+ use Pyz\Zed\AntelopeMiddlewareConnector\Communication\Plugin\Configuration\AntelopeTransformationProcessPlugin;
//...
 
class AntelopeMiddlewareConnectorDependencyProvider extends AbstractBundleDependencyProvider
{
+    public const ANTELOPE_TRANSLATOR_FUNCTIONS = 'ANTELOPE_MIDDLEWARE_TRANSLATOR_FUNCTIONS';
+    public const ANTELOPE_PROCESSES = 'ANTELOPE_MIDDLEWARE_PROCESSES';
    //...
 
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        //...
+        $container = $this->addAntelopeProcesses($container);
+        $container = $this->addAntelopeTranslatorFunctionsPlugins($container);
 
        return $container;
    }
 
    //...
 
+    /**
+     * @param \Spryker\Zed\Kernel\Container $container
+     *
+     * @return \Spryker\Zed\Kernel\Container
+     */
+    protected function addAntelopeTranslatorFunctionsPlugins($container): Container
+    {
+        $container[static::ANTELOPE_TRANSLATOR_FUNCTIONS] = function () {
+            return $this->getAntelopeTranslatorFunctionPlugins();
+        };
+        return $container;
+    }
+
+    /**
+     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Validator\GenericValidatorPluginInterface[]
+     */
+    public function getAntelopeTranslatorFunctionPlugins(): array
+    {
+        return [
+            new GreyToPinkTranslatorFunctionPlugin(),
+        ];
+    }
 
+    /**
+     * @param \Spryker\Zed\Kernel\Container $container
+     *
+     * @return \Spryker\Zed\Kernel\Container
+     */
+    protected function addAntelopeProcesses(Container $container): Container
+    {
+        $container[static::ANTELOPE_PROCESSES] = function () {
+            return $this->getAntelopeProcesses();
+        };
+        return $container;
+    }
+ 
+    /**
+     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Configuration\ProcessConfigurationPluginInterface[]
+     */
+    protected function getAntelopeProcesses(): array
+    {
+        return [
+            new AntelopeTransformationProcessPlugin(),
+        ];
+    }
}
src/Pyz/Zed/AntelopeMiddlewareConnector/Communication/AntelopeMiddlewareConnectorCommunicationFactory.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector\Communication;

+ use SprykerMiddleware\Zed\Process\Business\Translator\TranslatorFunction\TranslatorFunctionInterface;
+ use SprykerMiddleware\Zed\Process\Dependency\Plugin\Configuration\ProcessConfigurationPluginInterface;
//...
 
class AntelopeMiddlewareConnectorCommunicationFactory extends AbstractCommunicationFactory
{
    //...

+    /**
+     * @return TranslatorFunctionInterface[]
+     */
+    public function getAntelopeTranslatorFunctions(): array
+    {
+        return $this->getProvidedDependency(AntelopeMiddlewareConnectorDependencyProvider::ANTELOPE_TRANSLATOR_FUNCTIONS);
+    }
+
+    /**
+     * @return ProcessConfigurationPluginInterface[]
+     */
+    public function getAntelopeProcesses(): array
+    {
+        return $this->getProvidedDependency(AntelopeMiddlewareConnectorDependencyProvider::ANTELOPE_PROCESSES);
+    }
}
src/Pyz/Zed/AntelopeMiddlewareConnector/Communication/Plugin/Configuration/AntelopeMiddlewareConnectorConfigurationProfilePlugin.php
<?php
 
namespace Pyz\Zed\AntelopeMiddlewareConnector\Communication\Plugin\Configuration;
 
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use SprykerMiddleware\Zed\Process\Dependency\Plugin\Configuration\ConfigurationProfilePluginInterface;
 
/**
 * @method \Pyz\Zed\AntelopeMiddlewareConnector\Communication\AntelopeMiddlewareConnectorCommunicationFactory getFactory()
 * @method \Pyz\Zed\AntelopeMiddlewareConnector\Business\AntelopeMiddlewareConnectorFacadeInterface getFacade()
 */
class AntelopeMiddlewareConnectorConfigurationProfilePlugin extends AbstractPlugin implements ConfigurationProfilePluginInterface
{
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Configuration\ProcessConfigurationPluginInterface[]
     */
    public function getProcessConfigurationPlugins(): array
    {
        return $this->getFactory()
            ->getAntelopeProcesses();
    }
 
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\TranslatorFunction\TranslatorFunctionPluginInterface[]
     */
    public function getTranslatorFunctionPlugins(): array
    {
        return $this->getFactory()
            ->getAntelopeTranslatorFunctions();
    }
 
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Validator\ValidatorPluginInterface[]
     */
    public function getValidatorPlugins(): array
    {
        return [];
    }
}
which we then register in the Middleware’s Process module

src/Pyz/Zed/Process/ProcessDependencyProvider.php
<?php
 
namespace Pyz\Zed\Process;
 
use Pyz\Zed\AntelopeMiddlewareConnector\Communication\Plugin\Configuration\AntelopeMiddlewareConnectorConfigurationProfilePlugin;
use SprykerMiddleware\Zed\Process\ProcessDependencyProvider as SprykerProcessDependencyProvider;
 
class ProcessDependencyProvider extends SprykerProcessDependencyProvider
{
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Configuration\ConfigurationProfilePluginInterface[]
     */
    protected function getConfigurationProfilePluginsStack(): array
    {
        return [
            new AntelopeMiddlewareConnectorConfigurationProfilePlugin(),
        ];
    }
}
We can now transform our grey Antelopes into pink party animals by running

console middleware:process:run -p ANTELOPE_PROCESS -i data/import/demo/in.json -o data/import/demo/out.json
Have a look at data/import/demo/out.json!

data/import/demo/in.json
{"name":"Bob","color":"pink"}
{"name":"Lucy","color":"yellow"}
{"name":"Jane","color":"pink"}
Additional Tasks
Go to the documentation and check how a DataImporter is configured as a writing component for the Middleware process. Import your Antelopes via the Middleware.
