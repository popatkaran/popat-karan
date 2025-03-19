---
slug: '/article/sap'
date: '2019-05-04'
title: 'SAP'
category: 'SAP Hybris'
category_key: 'sap_hybris'
type: 'professional'
image: '../../images/platforms/banner-sap-hybris.png'
order: 6
---

## Java version

- SAP hybris needs Java version 17 to run
- run `/usr/libexec/java_home -V` to check all installed versions
- open `xrc` of your system `nano ~/.zshrc` and put all listed version as follow:

```
alias j19="export JAVA_HOME=`/usr/libexec/java_home -v 19`; java -version"
alias j18="export JAVA_HOME=`/usr/libexec/java_home -v 18`; java -version"
alias j17="export JAVA_HOME=`/usr/libexec/java_home -v 17`; java -version"
```

- run `source ~/.zshrc` to reload `xrc` of system and swith to desired java version by `j17`

## Commerce 123 {#commerce-123}

- [SAP Commerce](https://help.sap.com/docs/SAP_COMMERCE?locale=en-US)

## SAP Commerce Cloud

- [Installing and Upgrading](https://help.sap.com/docs/SAP_COMMERCE/a74589c3a81a4a95bf51d87258c0ab15/8bf5a611866910149242e1a3a41eb9af.html?locale=en-US)

## hybris123 light

- [installation](https://help.sap.com/docs/SAP_COMMERCE/3fb5dcdfe37f40edbac7098ed40442c0/bb7025b1150a43449f78fb6c9a41da4a.html])
- switch to Java17 `j17`
- run hybris123 explorer

```
cd /Users/<user_name>/projects/sap/<HYBRIS_HOME_DIR>/hybris123; java -jar target/hybris123.war
```

- start Hybris

```
cd /Users/<user_name>/projects/sap/<HYBRIS_HOME_DIR>/hybris/bin/platform; ./hybrisserver.sh start
```

- stop Hybris

```
cd /Users/<user_name>/projects/sap/<HYBRIS_HOME_DIR>/hybris/bin/platform; ./hybrisserver.sh stop
```

- Rebuild SAP Commerce with Ant.

```
cd /Users/<user_name>/projects/sap/<HYBRIS_HOME_DIR>/hybris/bin/platform; ant clean all
```

## Add new extension

- `ant extgen -Dinput.template="yempty" -Dinput.name="<extension-name>" -Dinput.package="<extension-name>"`

- Stop SAP Commerce.

```
cd /Users/<user_name>/projects/sap/<HYBRIS_HOME_DIR>/hybris/bin/platform; ./hybrisserver.sh stop
```

- Rebuild SAP Commerce with Ant.

```
cd /Users/<user_name>/projects/sap/<HYBRIS_HOME_DIR>/hybris/bin/platform; ant clean all
```

- Start SAP Commerce.

```
cd /Users/<user_name>/projects/sap/<HYBRIS_HOME_DIR>/hybris/bin/platform; ./hybrisserver.sh start
```

- verify at

```
https://localhost:9002/platform/extensions
```

## Data models

- New data types for extensions, called item types, are defined in `<extension-name>-items.xml` files.
- The `core-items.xml` file contains the basic definitions of the most fundamental item types and relations provided and used by the platform
- update database after adding schema
  > cd /Users/<user_name>/projects/sap/<HYBRIS_HOME_DIR>/hybris/bin/platform; ant updatesystem
- reinitialize system from backofice OR cd /Users/<user_name>/projects/sap/<HYBRIS_HOME_DIR>/hybris/bin/platform; ant initialize`

## Data import / export

- place your ImpEx in text files in the `/resources/impex` directory of your extension
- **Essential data ImpEx file** Contains fundamental reference data that is required by your extension. Essential data is always imported when you initialize the platform with your extension. Essential data ImpEx files have names in the form `essentialdata*.impex`.
- **Project data ImpEx file** Contains data that is optional your extension, such as sample data. Project data is included only when you check the project data checkbox for your extension in the Administration Console during initialization. Project data ImpEx files have names in the form `projectdata*.impex`.
- to import Essential and Project data > <https://localhost:9002/platform/init>
- register programmatic import Java class in `<HYBRIS_HOME_DIR>/hybris/bin/custom/concerttours/resources/concerttours-spring.xml`

## xmls

- `<HYBRIS_HOME_DIR>/hybris/config/localextensions.xml` to register local extension path
- `<HYBRIS_HOME_DIR>/hybris/bin/custom/concerttours/resources/concerttours-spring.xml` to registere custom (programmatic) data
- `<HYBRIS_HOME_DIR>/hybris/bin/custom/concerttours/resources/concerttours-spring.xml` to register DAOs and services
- `<HYBRIS_HOME_DIR>/hybris/bin/custom/concerttours/resources/concerttours-beans.xml` to register DTO for facade layer
- `<HYBRIS_HOME_DIR>/hybris/bin/custom/concerttours/resources/concerttours-spring.xml` to decalare facades
- `<HYBRIS_HOME_DIR>/hybris/bin/custom/concerttours/resources/concerttours-items.xml` to define new dynamic attribute handler
- `<HYBRIS_HOME_DIR>/hybris/bin/custom/concerttours/resources/concerttours-spring.xml` to register attribute handler
- `<HYBRIS_HOME_DIR>/hybris123/src/main/webapp/resources/concerttours/resources/concerttours-beansWithDynamicAttributes.xml` to update bean defination to include Dynamic attribute
- `<HYBRIS_HOME_DIR>/hybris/bin/custom/concerttours/resources/concerttours-spring.xml` to register Event listerner class
- `<HYBRIS_HOME_DIR>/hybris123/src/main/webapp/resources/concerttours/resources/concerttours-spring-withInterceptor.xml` to register interceptor and event Listener
- `<HYBRIS_HOME_DIR>/hybris123/src/main/webapp/resources/concerttours/resources/concerttours-spring-withNewsService.xml` to register cron jobs

## Serviece layer

- A service may contain all required business logic, but more commonly will delegate to one or more of the following: - Other services providing part of the behavior required - Strategy objects that provide swappable behavior for different requirements, e.g. different cart calculation algorithms - Data access objects that handle locating and retrieving data items from the database - These other services, strategy objects and data access objects are also defined as Spring beans, with respective interfaces and implementations.
- Configure Spring to register the DAO and DefaultBandService as Spring beans in `<HYBRIS_HOME_DIR>/hybris/bin/custom/concerttours/resources/concerttours-spring.xml`

## Events & Listeners

- `AfterItemCreationEvent` need to be extend to receive event within registered listener and perform business logic.
- We need to register event listener but not the event

## tests

- perform extension specific integration tests by

```
cd /Users/<user_name>/projects/sap/<HYBRIS_HOME_DIR>/hybris/bin/platform; ant yunitinit ant integrationtests -Dtestclasses.packages="concerttours.*"
```

- perform extension specific unit tests by

```
cd /Users/<user_name>/projects/sap/<HYBRIS_HOME_DIR>/hybris/bin/platform; ant unittests -Dtestclasses.packages="concerttours.*"
```

## Recipe CX

> B2C & B2B Accelerators with OMS (formerly b2c_b2b_acc_oms). For Kyma integration + ApiRegistry, event sending is turned off by default by `apiregistryservices.events.exporting=false` property. Optionally and before initialization, `deployment.api.endpoint` property should be set to a server url reachable by kyma instead of <https://localhost:9002>.

> Platform Setup:

- Setup platform using command

```
cd /Users/<user_name>/projects/sap/hybris-r1/installer; ./install.sh -r cx setup -A initAdminPassword=admin123
```

- Initialize platform using command

```
cd /Users/<user_name>/projects/sap/hybris-r1/installer; ./install.sh -r cx initialize -A initAdminPassword=admin123
```

- Start platform using command

```
cd /Users/<user_name>/projects/sap/hybris-r1/installer; ./install.sh -r cx start
```

- Platform Storefront links
  - [Electronics - B2C](https://electronics.local:9002/yacceleratorstorefront/electronics/en/)
  - [Appereal - B2C - DE](https://apparel-de.local:9002/yacceleratorstorefront/de/)
  - [Appereal - B2C - EN](https://apparel-uk.local:9002/yacceleratorstorefront/en/)
  - [Swagger](https://localhost:9002/occ/v2/swagger-ui.html#/)
  - [Solr](https://localhost:8983/solr/#/)
    - solrserver / server123

## ACL

- `/Users/<user_name>/projects/sap/hybris-r1/hybris/bin/platform/ext/hac/web/webroot/WEB-INF/config/spring-security-config.xml` list of all permisstion defined

## Temporary Licence

- `/Users/<user_name>/projects/sap/hybris-r1/hybris/config/local.properties` add `licence.sap.sapsystem=DEV`

## Youtube resources

- <https://www.youtube.com/playlist?list=PLzz42D-7Atw4n1s0mO3RwEvujQFAoxqAX>
- <https://www.youtube.com/playlist?list=PLw7h5qVWrsNxjI8kbPr6nCo0l1p0253K6>
- <https://www.youtube.com/@chennarrrs3886>
