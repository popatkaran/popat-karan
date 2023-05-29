---
slug: "/spryker/training/zed-ui"
date: "2019-05-04"
title: "Zed UI"
category: "Spryker Tutorials"
type: "professional"
order: 999
---

Now, of course, we would like to have the possibility to see our Antelopes in Spryker without having to go through the database all the time. We should create a way to look at the herd and every individual Antelope.

First we need a way of fetching the Antelope from the database. For the sake of covering all the bits, we will first do that by creating a QueryContainer (don’t forget the interface) for the Antelopes. Since the QueryContainer only extends the queries, we also need a PersistenceFactory to create the Query object for us.

src/Pyz/Zed/Antelope/Persistence/AntelopeQueryContainerInterface.php

<?php

namespace Pyz\Zed\Antelope\Persistence;

use Orm\Zed\Antelope\Persistence\PyzAntelopeQuery;

interface AntelopeQueryContainerInterface
{
/**
     * @return \Orm\Zed\Antelope\Persistence\PyzAntelopeQuery
     */
    public function queryAntelopes(): PyzAntelopeQuery;
}
src/Pyz/Zed/Antelope/Persistence/AntelopeQueryContainer.php
<?php

namespace Pyz\Zed\Antelope\Persistence;

use Orm\Zed\Antelope\Persistence\PyzAntelopeQuery;
use Spryker\Zed\Kernel\Persistence\AbstractQueryContainer;

/**
 * @method \Pyz\Zed\Antelope\Persistence\AntelopePersistenceFactory getFactory()
 */
class AntelopeQueryContainer extends AbstractQueryContainer implements AntelopeQueryContainerInterface
{
/**
     * @return \Orm\Zed\Antelope\Persistence\PyzAntelopeQuery
     */
    public function queryAntelopes(): PyzAntelopeQuery
    {
        return $this->getFactory()->createPyzAntelopeQuery();
    }
}
src/Pyz/Zed/Antelope/Persistence/AntelopePersistenceFactory.php
<?php

namespace Pyz\Zed\Antelope\Persistence;

use Orm\Zed\Antelope\Persistence\PyzAntelopeQuery;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\Antelope\Persistence\AntelopeQueryContainerInterface getQueryContainer()
 */
class AntelopePersistenceFactory extends AbstractPersistenceFactory
{
/**
     * @return \Orm\Zed\Antelope\Persistence\PyzAntelopeQuery
     */
    public function createPyzAntelopeQuery()
    {
        return PyzAntelopeQuery::create();
    }
}
Now, let’s create the zed table to display our herd.

src/Pyz/Zed/Antelope/Communication/Table/AntelopeTable.php
<?php

namespace Pyz\Zed\Antelope\Communication\Table;

use Orm\Zed\Antelope\Persistence\Map\PyzAntelopeTableMap;
use Orm\Zed\Antelope\Persistence\PyzAntelope;
use Propel\Runtime\Collection\ObjectCollection;
use Pyz\Zed\Antelope\Persistence\AntelopeQueryContainerInterface;
use Spryker\Zed\Gui\Communication\Table\AbstractTable;
use Spryker\Zed\Gui\Communication\Table\TableConfiguration;

class AntelopeTable extends AbstractTable
{
    public const ACTIONS = 'actions';

    public const COL_ID_ANTELOPE = 'id_antelope';
    public const COL_NAME = 'name';
    public const COL_COLOR = 'color';

/**
     * @var \Pyz\Zed\Antelope\Persistence\AntelopeQueryContainerInterface
     */
    protected $antelopeQueryContainer;

/**
     * @param \Pyz\Zed\Antelope\Persistence\AntelopeQueryContainerInterface $antelopeQueryContainer
     */
    public function __construct(AntelopeQueryContainerInterface $antelopeQueryContainer)
    {
$this->antelopeQueryContainer = $antelopeQueryContainer;
    }

/**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return \Spryker\Zed\Gui\Communication\Table\TableConfiguration
     */
    protected function configure(TableConfiguration $config)
    {
$config->setHeader([
            static::COL_ID_ANTELOPE => '#',
            static::COL_NAME => 'Name',
            static::COL_COLOR => 'Color',
            static::ACTIONS => self::ACTIONS,
        ]);

$config->addRawColumn(self::ACTIONS);

$config->setSortable([
            static::COL_ID_ANTELOPE,
            static::COL_NAME,
            static::COL_COLOR,
        ]);

$config->setSearchable([
            PyzAntelopeTableMap::COL_NAME,
            PyzAntelopeTableMap::COL_COLOR,
        ]);

        return $config;
    }

/**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return array
     */
    protected function prepareData(TableConfiguration $config)
    {
$query = $this->prepareQuery();

/** @var \Propel\Runtime\Collection\ObjectCollection|\Orm\Zed\Antelope\Persistence\PyzAntelope[] $antelopeCollection */
$antelopeCollection = $this->runQuery($query, $config, true);

        if ($antelopeCollection->count() < 1) {
            return [];
        }

        return $this->mapAntelopeCollection($antelopeCollection);
    }

/**
     * @param \Orm\Zed\Antelope\Persistence\PyzAntelope $antelope
     *
     * @return string
     */
    protected function buildLinks(PyzAntelope $antelope)
    {
$buttons = [];
$buttons[] = $this->generateViewButton(
            sprintf('/antelope/view?id-antelope=%d', $antelope->getIdAntelope()),
'View'
        );

        return implode(' ', $buttons);
    }

/**
     * @param \Propel\Runtime\Collection\ObjectCollection|\Orm\Zed\Antelope\Persistence\PyzAntelope[] $antelopeCollection
     *
     * @return array
     */
    protected function mapAntelopeCollection(ObjectCollection $antelopeCollection)
    {
$antelopeList = [];

        foreach ($antelopeCollection as $antelopeEntity) {
$antelopeList[] = $this->mapAntelopeRow($antelopeEntity);
        }

        return $antelopeList;
    }

/**
     * @param \Orm\Zed\Antelope\Persistence\PyzAntelope $antelopeEntity
     *
     * @return array
     */
    protected function mapAntelopeRow(PyzAntelope $antelopeEntity)
    {
$antelopeRow = $antelopeEntity->toArray();

$antelopeRow[static::COL_ID_ANTELOPE] = $antelopeEntity->getIdAntelope();
$antelopeRow[static::COL_NAME] = $antelopeEntity->getName();
$antelopeRow[static::COL_COLOR] = $antelopeEntity->getColor();

$antelopeRow[static::ACTIONS] = $this->buildLinks($antelopeEntity);

        return $antelopeRow;
    }

/**
     * @return \Orm\Zed\Antelope\Persistence\PyzAntelopeQuery
     */
    protected function prepareQuery()
    {
$query = $this->antelopeQueryContainer->queryAntelopes();

        return $query;
    }
}
This table can now be displayed through acorresponding controller in Zed, that of course needs a view as well. The Table class itself should be created in the CommunicationFactory, because it may come with dependencies.

src/Pyz/Zed/Antelope/Communication/AntelopeCommunicationFactory.php
<?php

namespace Pyz\Zed\Antelope\Communication;

use Pyz\Zed\Antelope\Communication\Table\AntelopeTable;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \Pyz\Zed\Antelope\Persistence\AntelopeQueryContainerInterface getQueryContainer()
 */
class AntelopeCommunicationFactory extends AbstractCommunicationFactory
{
/**
     * @return \Pyz\Zed\Antelope\Communication\Table\AntelopeTable
     */
    public function createAntelopeTable()
    {
        return new AntelopeTable(
$this->getQueryContainer()
        );
    }
}
src/Pyz/Zed/Antelope/Communication/Controller/IndexController.php
<?php

namespace Pyz\Zed\Antelope\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;

/**
 * @method \Pyz\Zed\Antelope\Communication\AntelopeCommunicationFactory getFactory()
 * @method \Pyz\Zed\Antelope\Persistence\AntelopeQueryContainerInterface getQueryContainer()
 */
class IndexController extends AbstractController
{
/**
     * @return array
     */
    public function indexAction()
    {
$table = $this->getFactory()
            ->createAntelopeTable();

        return $this->viewResponse([
'antelopeTable' => $table->render(),
        ]);
    }

/**
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function tableAction()
    {
$table = $this->getFactory()
            ->createAntelopeTable();

        return $this->jsonResponse($table->fetchData());
    }
}
We need to create a twig template at src/Pyz/Zed/Antelope/Presentation/Index/index.twig. Please note that the folder is with capitalized I and template file is in lowercase. Folder name matches the controller name and twig file matches the action name.

src/Pyz/Zed/Antelope/Presentation/Index/index.twig
{% extends '@Gui/Layout/layout.twig' %}

{% set widget_title = 'Antelopes' %}

{% block head_title widget_title | trans %}

{% block section_title widget_title | trans %}

{% block content %}

{% embed '@Gui/Partials/widget.twig' %}

{% block widget_content %}

{{ antelopeTable | raw }}

{% endblock %}

{% endembed %}

{% endblock %}
Now run console propel:install (could return nothing to migrate).

Visit /antelope on your zed, to see the herd

Since we would also want to look at our Antelopes in detail and we want to learn something new, we will go the way through a repository. These repositories are usually accompanied by a reader and its interface.

First, create the Antelope transfer definition in src/Pyz/Shared/Antelope/Transfer/antelope.transfer.xml

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
and generate the PHP classes with console transfer:generate.

src/Pyz/Zed/Antelope/Persistence/AntelopeRepositoryInterface.php

<?php

namespace Pyz\Zed\Antelope\Persistence;

use Generated\Shared\Transfer\AntelopeTransfer;

interface AntelopeRepositoryInterface
{
/**
   * @param int $idAntelope
   *
   * @return \Generated\Shared\Transfer\AntelopeTransfer|null
   */
  public function findAntelopeById(int $idAntelope): ?AntelopeTransfer; 
}
src/Pyz/Zed/Antelope/Persistence/AntelopeRepository.php
<?php

namespace Pyz\Zed\Antelope\Persistence;

use Generated\Shared\Transfer\AntelopeTransfer;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\Antelope\Persistence\AntelopePersistenceFactory getFactory()
 */
class AntelopeRepository extends AbstractRepository implements AntelopeRepositoryInterface
{
/**
     * @param int $idAntelope
     *
     * @return \Generated\Shared\Transfer\AntelopeTransfer|null
     */
    public function findAntelopeById(int $idAntelope): ?AntelopeTransfer
    {
$antelopeEntity = $this->getFactory()
            ->createPyzAntelopeQuery()
            ->findOneByIdAntelope($idAntelope);

        if ($antelopeEntity === null) {
            return null;
        }

$antelopeTransfer = new AntelopeTransfer();

        return $antelopeTransfer->fromArray($antelopeEntity->toArray());
    }
}
src/Pyz/Zed/Antelope/Business/Reader/AntelopeReaderInterface.php
<?php

namespace Pyz\Zed\Antelope\Business\Reader;

use Generated\Shared\Transfer\AntelopeTransfer;

interface AntelopeReaderInterface
{
/**
     * @param \Generated\Shared\Transfer\AntelopeTransfer $antelopeTransfer
     *
     * @return \Generated\Shared\Transfer\AntelopeTransfer|null
     */
    public function getAntelope(AntelopeTransfer $antelopeTransfer): ?AntelopeTransfer;
}
src/Pyz/Zed/Antelope/Business/Reader/AntelopeReader.php
<?php

namespace Pyz\Zed\Antelope\Business\Reader;

use Generated\Shared\Transfer\AntelopeTransfer;
use Pyz\Zed\Antelope\Persistence\AntelopeRepositoryInterface;

class AntelopeReader implements AntelopeReaderInterface
{
/**
     * @var \Pyz\Zed\Antelope\Persistence\AntelopeRepositoryInterface
     */
    protected $antelopeRepository;

/**
     * @param \Pyz\Zed\Antelope\Persistence\AntelopeRepositoryInterface $antelopeRepository
     */
    public function __construct(AntelopeRepositoryInterface $antelopeRepository)
    {
$this->antelopeRepository = $antelopeRepository;
    }

/**
     * @param \Generated\Shared\Transfer\AntelopeTransfer $antelopeTransfer
     *
     * @return \Generated\Shared\Transfer\AntelopeTransfer|null
     */
    public function getAntelope(AntelopeTransfer $antelopeTransfer): ?AntelopeTransfer
    {
        return $this->antelopeRepository->findAntelopeById($antelopeTransfer->getIdAntelope());
    }
}
This business functionality should now be exposed through the facade, which means also through the factory.

src/Pyz/Zed/Antelope/Business/AntelopeBusinessFactory.php
<?php

namespace Pyz\Zed\Antelope\Business;

use Pyz\Zed\Antelope\Business\Reader\AntelopeReader;
use Pyz\Zed\Antelope\Business\Reader\AntelopeReaderInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\Antelope\Persistence\AntelopeRepositoryInterface getRepository()
 * @method \Pyz\Zed\Antelope\Persistence\AntelopeQueryContainerInterface getQueryContainer()
 */
class AntelopeBusinessFactory extends AbstractBusinessFactory
{
/**
     * @return \Pyz\Zed\Antelope\Business\Reader\AntelopeReaderInterface
     */
    public function createAntelopeReader(): AntelopeReaderInterface
    {
        return new AntelopeReader(
$this->getRepository()
        );
    }
}
src/Pyz/Zed/Antelope/Business/AntelopeFacadeInterface.php
<?php

namespace Pyz\Zed\Antelope\Business;

use Generated\Shared\Transfer\AntelopeTransfer;

/**
 * @method \Pyz\Zed\Antelope\Business\AntelopeBusinessFactory getFactory()
 */
interface AntelopeFacadeInterface
{
/**
     * @param \Generated\Shared\Transfer\AntelopeTransfer $antelopeTransfer
     *
     * @return \Generated\Shared\Transfer\AntelopeTransfer
     */
    public function getAntelope(AntelopeTransfer $antelopeTransfer);
}
src/Pyz/Zed/Antelope/Business/AntelopeFacade.php
<?php

namespace Pyz\Zed\Antelope\Business;

use Generated\Shared\Transfer\AntelopeTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\Antelope\Business\AntelopeBusinessFactory getFactory()
 * @method \Pyz\Zed\Antelope\Persistence\AntelopeRepositoryInterface getRepository()
 */
class AntelopeFacade extends AbstractFacade implements AntelopeFacadeInterface
{
/**
     * @param \Generated\Shared\Transfer\AntelopeTransfer $antelopeTransfer
     *
     * @return \Generated\Shared\Transfer\AntelopeTransfer
     */
    public function getAntelope(AntelopeTransfer $antelopeTransfer)
    {
        return $this->getFactory()
            ->createAntelopeReader()
            ->getAntelope($antelopeTransfer);
    }
}
We are ready to use this model now to display the Antelope details through a new controller and the corresponding view.

src/Pyz/Zed/Antelope/Communication/Controller/ViewController.php
<?php

namespace Pyz\Zed\Antelope\Communication\Controller;

use Generated\Shared\Transfer\AntelopeTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\Antelope\Business\AntelopeFacadeInterface getFacade()
 * @method \Pyz\Zed\Antelope\Communication\AntelopeCommunicationFactory getFactory()
 * @method \Pyz\Zed\Antelope\Persistence\AntelopeRepositoryInterface getRepository()
 * @method \Pyz\Zed\Antelope\Persistence\AntelopeQueryContainerInterface getQueryContainer()
 */
class ViewController extends AbstractController
{
    public const PARAM_ID_ANTELOPE = 'id-antelope';

/**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
$idAntelope = $request->get(static::PARAM_ID_ANTELOPE);

        if (empty($idAntelope)) {
            return $this->redirectResponse('/antelope');
        }

$idAntelope = $this->castId($idAntelope);

$antelopeTransfer = $this->loadAntelopeTransfer($idAntelope);

        return $this->viewResponse([
'antelope' => $antelopeTransfer,
'idAntelope' => $idAntelope,
        ]);
    }

/**
     * @return \Generated\Shared\Transfer\AntelopeTransfer
     */
    protected function createAntelopeTransfer()
    {
        return new AntelopeTransfer();
    }

/**
     * @param int $idAntelope
     *
     * @return \Generated\Shared\Transfer\AntelopeTransfer
     */
    protected function loadAntelopeTransfer($idAntelope)
    {
$antelopeTransfer = $this->createAntelopeTransfer();
$antelopeTransfer->setIdAntelope($idAntelope);
$antelopeTransfer = $this->getFacade()->getAntelope($antelopeTransfer);

        return $antelopeTransfer;
    }
}
Now we add a template to src/Pyz/Zed/Antelope/Presentation/View/index.twig.

src/Pyz/Zed/Antelope/Presentation/View/index.twig
{% extends '@Gui/Layout/layout.twig' %}

{% set widget_title = 'View Antelope' %}

{% block head_title %}
{{ widget_title | trans }}
{% endblock %}
{% block section_title %}
{{ widget_title | trans }}
{% endblock %}

{% block action %}
{{ backActionButton('/antelope', 'List Antelopes' | trans) }}
{% endblock %}

{% block content %}

{% embed '@Gui/Partials/widget.twig' with { widget_title: 'Antelope' } %}

{% block widget_content %}

            <div class="row">
                <table class="table">
                    <thead></thead>
                    <tbody>
                    <tr>
                        <th>
{{ 'ID' | trans }}</th>
                        <td>{{ antelope.idAntelope }}</td>
                    </tr>
                    <tr>
                        <th>{{ 'Name' | trans }}</th>
                        <td>{{ antelope.name }}</td>
                    </tr>
                    <tr>
                        <th>{{ 'Color' | trans }}</th>
                        <td>{{ antelope.color }}</td>
                    </tr>
                    </tbody>
                    <tfoot>
                </table>
            </div>

{% endblock %}
{% endembed %}

{% endblock %}
Go ahead in click one of the details buttons in your table!

Let’s integrate the herd into the main navigation by putting out Antelopes into config/Zed/navigation.xml

config/Zed/navigation.xml
<?xml version="1.0"?>
<config>
<!-- You can control navigation order here and add your custom navigation entries -->
+    <antelope>
+        <label>Antelope</label>
+        <title>Antelope</title>
+        <uri>/antelope</uri>
+        <icon>fa-globe</icon>
+    </antelope>
...
</config>
and run console navigation:build-cache to include it in Zed's menu.
