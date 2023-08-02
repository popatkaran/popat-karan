---
slug: "/spryker/training/data-import"
date: "2019-05-04"
title: "Database Table"
category: "spryker"
type: "professional"
image: '../../../images/platforms/banner-spryker.png'
order: 2
---

## Objective

Create a table to store custom data into Spryker database.

## Implementation steps

- Create a new zed module by creating the directory `src/Pyz/Zed/MagazineReviews`.
- In this new module we create the database schema file `Persistence/Propel/Schema/pyz_magazine_reviews.schema.xml` with the following content:

> src/Pyz/Zed/MagazineReviews/Persistence/Propel/Schema/pyz_magazine_reviews.schema.xml

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
        namespace="Orm\Zed\MagazineReviews\Persistence"
        package="src.Orm.Zed.MagazineReviews.Persistence">

    <table name="pyz_magazine_reviews" idMethod="native" allowPkInsert="true" phpName="PyzMagazineReviews">
        <column name="id_magazine_review" required="true" type="INTEGER" primaryKey="true" autoIncrement="true"/>
        <column name="magazine_name" required="true" type="VARCHAR" size="255"/>
        <column name="review_title" required="true" type="VARCHAR" size="255"/>
        <column name="review_description" required="true" type="VARCHAR" size="255"/><>
    </table>
</database>
```

- run docker/sdk console propel:install to make changes in database
  > We can connect with database in PHPStorm or any other tool and check the table created.
  > We can also check generated classes in the directory `src\Orm\Zed\MagazineReviews`
  > We can check generated schema file in the directory `src\Orm\Propel\Schema`

## What next?

- Import data into database using data importer
