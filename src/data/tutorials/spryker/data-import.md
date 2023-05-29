---
slug: "/spryker/training/data-import"
date: "2019-05-04"
title: "Data Import"
category: "Spryker Tutorials"
type: "professional"
order: 3
---

## Objective

Insert magazine reviews to populate our database. In order to so, we need a mechanism to fetch them from an external source and a data structure that can hold them inside our system.

## Prerequities

- You should have a table created for magazine_reviews in order to import data.

## Implementation steps

- Create an import file for MagazineReviews in data/import/local/common and give them friendly names and colors.
  > data/import/local/common/magazine-reviews.csv

```
magazine_name,review_title,review_description
MAG1,Good,Good products!
MAG2,Great,Really great products, go for it!
MAG2,Beware,Poor customer servies.
MAG3,Okay,nice experience so far.
```

- Now, let the DataImport module know that we have a new import type.

> src/Pyz/Zed/DataImport/DataImportConfig.php

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;

class DataImportConfig extends SprykerDataImportConfig
{
    //...
+   public const IMPORT_TYPE_MAGAZINE_REVIEWS = 'magazine_reviews';

    //...
}
```

- We should also have a way to tell the DataImporter how we would like to store our imported Magazine reviews. We will store those entities with Propel, for convenience.

> src/Pyz/Zed/DataImport/Business/Model/MagazineReviews/MagazineReviewsWriterStep.php

```php
<?php

namespace Pyz\Zed\DataImport\Business\Model\MagazineReviews;

use Orm\Zed\MagazineReviews\Persistence\PyzMagazineReviewsQuery;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class MagazineReviewsWriterStep implements DataImportStepInterface
{
    public const KEY_MAGAZINE_NAME = 'namagazine_name';
    public const KEY_REVIEW_TITLE = 'review_title';
    public const KEY_REVIEW_DESCRIPTION = 'review_description';

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @throws \Spryker\Zed\DataImport\Business\Exception\EntityNotFoundException
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $magazineReviewsEntity = PyzMagazineReviewsQuery::create()
            ->filterByMagazineName($dataSet[static::KEY_MAGAZINE_NAME])
            ->filterByReviewTitle($dataSet[static::KEY_REVIEW_TITLE])
            ->findOneOrCreate();

        $magazineReviewsEntity->setReviewDescription($dataSet[static::KEY_REVIEW_DESCRIPTION]);

        if ($magazineReviewsEntity->isNew() || $magazineReviewsEntity->isModified()) {
            $magazineReviewsEntity->save();
        }
    }
}
```

- Then, we have to configure the actual importer in the BusinessFactory.

> src/Pyz/Zed/DataImport/Business/DataImportBusinessFactory.php

```php
<?php

namespace Pyz\Zed\DataImport\Business;

+ use Pyz\Zed\DataImport\Business\Model\MagazineReviews\MagazineReviewsWriterStep;

//...

class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
    //...

+    /**
+     * @param \Generated\Shared\Transfer\DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer
+     *
+     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
+     */
+    protected function createMagazineReviewsImporter(DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer)
+    {
+        $dataImporter = $this->getCsvDataImporterFromConfig(
+            $this->getConfig()->buildImporterConfigurationByDataImportConfigAction($dataImportConfigurationActionTransfer)
+        );
+
+        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
+        $dataSetStepBroker
+            ->addStep(new MagazineReviewsWriterStep());
+
+        $dataImporter->addDataSetStepBroker($dataSetStepBroker);
+
+        return $dataImporter;
+    }
}
```

- And let the importer know, where to fetch the data from by adding the magazine_reviews entity type to the import yaml file data/import/local/full_EU.yml

> data/import/local/full_EU.yml

```yml
//...
+  - data_entity: magazine_reviews
+    source: data/import/local/common/magazine_reviews.csv
```

- We are all set, but have to let that DataImporter module know that our MagazineReviews importer exists. Add it to the getDataImporterByType() at the top of the BusinessFactory.

> src/Pyz/Zed/DataImport/Business/DataImportBusinessFactory.php

```php
<?php

namespace Pyz\Zed\DataImport\Business;

//...

class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
    /**
     * @param \Generated\Shared\Transfer\DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|null
     */
    public function getDataImporterByType(DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer): ?DataImporterInterface
    {
        switch ($dataImportConfigurationActionTransfer->getDataEntity()) {
            //...
+            case DataImportConfig::IMPORT_TYPE_MAGAZINE_REVIEWS:
+                return $this->createMagazineReviewsImporter($dataImportConfigurationActionTransfer);
            default:
                return null;
        }
    }

    //...
}
```

- and we should register the new importer command in Zed’s ConsoleDependencyProvider:

> src/Pyz/Zed/Console/ConsoleDependencyProvider.php

```php
<?php

namespace Pyz\Zed\Console;

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
+            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . DataImportConfig::IMPORT_TYPE_MAGAZINE_REVIEWS),
            //...
}
```

- Now, we are able to execute docker/sdk console data:import:magazine_reviews.

> We can check data inserted into table magazine_reviews.

## What next?

- Fetch data from database using Glue API
