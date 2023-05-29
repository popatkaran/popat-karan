---
slug: "/spryker/training/pub-sync"
date: "2019-05-04"
title: "Publish & Synchronization"
category: "Spryker Tutorials"
type: "professional"
order: 997
---

## Objective

In order to synchronize magazine reviews to the storefront, we have to connect it to our Publish&Synchronize infrastructure. Modules responsible for P&S should be outside of the actual base module. The should be in *Storage or *Search modules.

First of all we have to make the system listen for changes of our entities. Add the according behaviour to the existing schema definitions in the Antelope module.

## Prerequities

## Implementatino steps

src/Pyz/Zed/Antelope/Persistence/Propel/Schema/pyz_antelope.schema.xml

<table name="pyz_antelope" ...>
    ...
+    <behavior name="event">
+        <parameter name="pyz_antelope_all" column="*"/>
+    </behavior>
</table>
And let the system know about our entity lifecycle events

src/Pyz/Zed/Antelope/Dependency/AntelopeEvents.php

<?php
 
namespace Pyz\Zed\Antelope\Dependency;
 
interface AntelopeEvents
{
    public const ENTITY_PYZ_ANTELOPE_CREATE = 'Entity.pyz_antelope.create';
    public const ENTITY_PYZ_ANTELOPE_UPDATE = 'Entity.pyz_antelope.update';
    public const ENTITY_PYZ_ANTELOPE_DELETE = 'Entity.pyz_antelope.delete';
}
For sure, we need business functionality, that allows us to de-normalize and store the prepared data. This will happen in the Business layer and we will expose the functionality through the facade. We also need to prepare data structures to hold our prepared data. By convention, these will be in *_storage or *_search tables in the corresponding modules.

Let’s create a module for searching Antelopes (AntelopeSearch) and add the database table for our search data to it in src/Pyz/Zed/AntelopeSearch/Persistence/Propel/Schema/pyz_antelope_search.schema.xml:

src/Pyz/Zed/AntelopeSearch/Persistence/Propel/Schema/pyz_antelope_search.schema.xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\AntelopeSearch\Persistence" package="src.Orm.Zed.AntelopeSearch.Persistence">

    <table name="pyz_antelope_search" idMethod="native" allowPkInsert="true" identifierQuoting="true">
        <column name="id_antelope_search" type="BIGINT" autoIncrement="true" primaryKey="true"/>
        <column name="fk_antelope" type="INTEGER" required="true"/>
        <index name="pyz_antelope_search-fk_antelope">
            <index-column name="fk_antelope"/>
        </index>
        <behavior name="synchronization">
            <parameter name="resource" value="antelope"/>
            <parameter name="key_suffix_column" value="fk_antelope"/>
            <parameter name="queue_group" value="sync.search.antelope"/>
        </behavior>
        <behavior name="timestampable"/>
        <id-method-parameter value="pyz_antelope_search_pk_seq"/>
    </table>

</database>
Incorporate these changes with docker/sdk console propel:install!

Create the Antelope transfer definition in src/Pyz/Shared/Antelope/Transfer/antelope.transfer.xml

src/Pyz/Shared/Antelope/Transfer/antelope.transfer.xml

<?xml version="1.0"?>

<transfers xmlns="spryker:transfer-01"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="Antelope">
        <property name="idAntelope" type="int" />
        <property name="name" type="string" />
        <property name="color" type="string" />
    </transfer>

</transfers>
and generate the PHP classes with docker/sdk console transfer:generate.

src/Pyz/Zed/AntelopeSearch/Business/Writer/AntelopeSearchWriter.php

<?php

namespace Pyz\Zed\AntelopeSearch\Business\Writer;

use Generated\Shared\Transfer\AntelopeTransfer;
use Orm\Zed\Antelope\Persistence\PyzAntelopeQuery;
use Orm\Zed\AntelopeSearch\Persistence\PyzAntelopeSearchQuery;

class AntelopeSearchWriter
{
    /**
     * @param int $idAntelope
     *
     * @return void
     */
    public function publish(int $idAntelope): void
    {
        $antelopeEntity = PyzAntelopeQuery::create()
            ->filterByIdAntelope($idAntelope)
            ->findOne();

        $antelopeTransfer = new AntelopeTransfer();
        $antelopeTransfer->fromArray($antelopeEntity->toArray());

        $searchEntity = PyzAntelopeSearchQuery::create()
            ->filterByFkAntelope($idAntelope)
            ->findOneOrCreate();
        $searchEntity->setFkAntelope($idAntelope);
        $searchEntity->setData($antelopeTransfer->toArray());

        $searchEntity->save();
    }
}
src/Pyz/Zed/AntelopeSearch/Business/AntelopeSearchBusinessFactory.php
<?php

namespace Pyz\Zed\AntelopeSearch\Business;

use Pyz\Zed\AntelopeSearch\Business\Writer\AntelopeSearchWriter;

class AntelopeSearchBusinessFactory
{
    /**
     * @return \Pyz\Zed\AntelopeSearch\Business\Writer\AntelopeSearchWriter
     */
    public function createAntelopeSearchWriter()
    {
        return new AntelopeSearchWriter();
    }
}
src/Pyz/Zed/AntelopeSearch/Business/AntelopeSearchFacadeInterface.php
<?php

namespace Pyz\Zed\AntelopeSearch\Business;

interface AntelopeSearchFacadeInterface
{
    /**
     * @param int $idAntelope
     *
     * @return void
     */
    public function publish(int $idAntelope): void;
}
src/Pyz/Zed/AntelopeSearch/Business/AntelopeSearchFacade.php
<?php

namespace Pyz\Zed\AntelopeSearch\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\AntelopeSearch\Business\AntelopeSearchBusinessFactory getFactory()
 */
class AntelopeSearchFacade extends AbstractFacade implements AntelopeSearchFacadeInterface
{
    /**
     * @param int $idAntelope
     *
     * @return void
     */
    public function publish(int $idAntelope): void
    {
        $this->getFactory()
            ->createAntelopeSearchWriter()
            ->publish($idAntelope);
    }
}
Now, we should have something that can react to the lifecycle events and delegates to the Business functionality. We usually do that in an EventListener that is then connected to the events through an EventSubscriber.

src/Pyz/Zed/AntelopeSearch/Communication/Plugin/Event/Listener/AntelopeSearchListener.php
<?php

namespace Pyz\Zed\AntelopeSearch\Communication\Plugin\Event\Listener;

use Pyz\Zed\Antelope\Dependency\AntelopeEvents;
use Spryker\Shared\Kernel\Transfer\TransferInterface;
use Spryker\Zed\Event\Dependency\Plugin\EventHandlerInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\AntelopeSearch\Business\AntelopeSearchFacadeInterface getFacade()
 */
class AntelopeSearchListener extends AbstractPlugin implements EventHandlerInterface
{
    /**
     * @param \Spryker\Shared\Kernel\Transfer\TransferInterface $transfer
     * @param string $eventName
     *
     * @return void
     */
    public function handle(TransferInterface $transfer, $eventName): void
    {
        /** @var \Generated\Shared\Transfer\EventEntityTransfer $transfer */
        if ($eventName === AntelopeEvents::ENTITY_PYZ_ANTELOPE_CREATE) {
            $this->getFacade()->publish($transfer->getId());
        }
    }
}
src/Pyz/Zed/AntelopeSearch/Communication/Plugin/Event/Subscriber/AntelopeSearchEventSubscriber.php
<?php

namespace Pyz\Zed\AntelopeSearch\Communication\Plugin\Event\Subscriber;

use Pyz\Zed\Antelope\Dependency\AntelopeEvents;
use Pyz\Zed\AntelopeSearch\Communication\Plugin\Event\Listener\AntelopeSearchListener;
use Spryker\Zed\Event\Dependency\EventCollectionInterface;
use Spryker\Zed\Event\Dependency\Plugin\EventSubscriberInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\AntelopeSearch\Business\AntelopeSearchFacadeInterface getFacade()
 */
class AntelopeSearchEventSubscriber extends AbstractPlugin implements EventSubscriberInterface
{
    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    public function getSubscribedEvents(EventCollectionInterface $eventCollection)
    {
        $eventCollection->addListenerQueued(AntelopeEvents::ENTITY_PYZ_ANTELOPE_CREATE, new AntelopeSearchListener());
        $eventCollection->addListenerQueued(AntelopeEvents::ENTITY_PYZ_ANTELOPE_UPDATE, new AntelopeSearchListener());
        $eventCollection->addListenerQueued(AntelopeEvents::ENTITY_PYZ_ANTELOPE_DELETE, new AntelopeSearchListener());

        return $eventCollection;
    }
}
The EventSubscriber should be added to the according collection in the EventDependencyProvider.

src/Pyz/Zed/Event/EventDependencyProvider.php
<?php
 
namespace Pyz\Zed\Event;
 
+ use Pyz\Zed\AntelopeSearch\Communication\Plugin\Event\Subscriber\AntelopeSearchEventSubscriber;
//...
 
class EventDependencyProvider extends SprykerEventDependencyProvider
{
    //...
 
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
 
        //...
 
        /**
         * Search Events
         */
        //...
+        $eventSubscriberCollection->add(new AntelopeSearchEventSubscriber());
Then, we have to configure RabbitMQ with the queues we actually want to talk to:

src/Pyz/Client/RabbitMq/RabbitMqConfig.php
<?php

namespace Pyz\Client\RabbitMq;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            //...
+            'sync.search.antelope',
        ];
    }
And tell the Queue module, that messages in this queue should be piped through the search synchronization.

src/Pyz/Zed/Queue/QueueDependencyProvider.php
<?php
 
namespace Pyz\Zed\Queue;
 
//...
 
class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            ///...
+            'sync.search.antelope' => new SynchronizationSearchQueueMessageProcessorPlugin(),
        ];
Lastly, emit the creation event in your Antelope DataImporter.

src/Pyz/Zed/DataImport/Business/Model/Antelope/AntelopeWriterStep.php
<?php
 
namespace Pyz\Zed\DataImport\Business\Model\Antelope;
 
+ use Pyz\Zed\Antelope\Dependency\AntelopeEvents;
+ use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
//...
 
- class AntelopeWriterStep implements DataImportStepInterface
+ class AntelopeWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    //...
 
    public function execute(DataSetInterface $dataSet)
    {
        //...
+        $this->addPublishEvents(AntelopeEvents::ENTITY_PYZ_ANTELOPE_CREATE, $antelopeEntity->getIdAntelope());
    }
}
Now, run the data import again. You can see in Elasticsearch, that our Antelopes are now available to the frontend applications. In the next task we will see how we can achieve that!

A http request to your Elasticsearch, might look as follows:

POST localhost:9200/de_page/_search
Content-type: application/json

{
  "query": {
    "exists": {
      "field": "id_antelope"
    }
  }
}
Don’t forget to put your corresponding host and port. And of course you can also use this query with oother toools, like Kibana, to fetch the Antelopes from Elasicsearch.
