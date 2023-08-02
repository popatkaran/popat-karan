---
slug: "/spryker/training/oms"
date: "2019-05-04"
title: "OMS"
category: "spryker"
type: "professional"
image: '../../../images/platforms/banner-spryker.png'
order: 999
---

OMS (Order Management System and State Machine
Challenge Description
In this task, you will create a full order management process using the OMS (Order Management System) using the Spryker state machine and then use it in your shop.

1. Create the State Machine Skeleton
   In this order process, we will use the following states: new, paid, shipped, returned, refunded, unauthorized and closed. We will build all the transitions and events between these states as well. The skeleton of Spryker state machines is simply an XML file.

Create a new XML file in config/Zed/oms/ and call it Demo01.xml.

Add the Demo01 state machine process schema as follows:

config/Zed/oms/Demo01.xml

<?xml version="1.0"?>

<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

<!-- Used as example XML for OMS implementation -->

    <process name="Demo01" main="true">
        <states>
        </states>

        <transitions>
        </transitions>

        <events>
        </events>
    </process>

</statemachine>
Activate the OMS process in config_oms-development.php in config/Shared/ by adding the name of the process Demo01 to $config[OmsConstants::ACTIVE_PROCESSES].

config/Shared/common/config_oms-development.php
\$config[OmsConstants::ACTIVE_PROCESSES] = array_merge([
'Nopayment01',
'DummyPayment01',

- 'Demo01',
  ], \$config[OmsConstants::ACTIVE_PROCESSES]);
  Now, let’s go back to the skeleton XML and add the first state.

config/Zed/oms/Demo01.xml

<?xml version="1.0"?>

<statemachine
xmlns="spryker:oms-01"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

<!-- Used as example XML for OMS implementation -->

    <process name="Demo01" main="true">
        <states>

-            <state name="new" />
        </states>

        <transitions>
        </transitions>

        <events>
        </events>

    </process>

</statemachine>
Check the state machine graph while building it. Go to the OMS page in the Backend Office at http://backoffice.de.spryker.local/oms and you will see your state machine Demo01. Click on it and you will see the graph that represents your XML file. Whenever you change the skeleton in the XML file, refresh the page to see the new changes.

Add the rest of the states to the state machine. Refresh the state machine graph after adding them.

config/Zed/oms/Demo01.xml

<?xml version="1.0"?>

<statemachine
xmlns="spryker:oms-01"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

<!-- Used as example XML for OMS implementation -->

    <process name="Demo01" main="true">
        <states>
            <state name="new" />

-            <state name="paid" />
-            <state name="shipped" />
-            <state name="returned" />
-            <state name="refunded" />
-            <state name="closed" />
        </states>

        <transitions>
        </transitions>

        <events>
        </events>

    </process>

</statemachine>
Next, let’s add the transitions with their events. Every transition has a source, a target, and an optional event. The source and target are state names, and the event is the name of the event defined in the events section. Let’s start with the first transition. Refresh after adding the transition and check the updated state machine.

config/Zed/oms/Demo01.xml

<?xml version="1.0"?>

<statemachine
xmlns="spryker:oms-01"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

<!-- Used as example XML for OMS implementation -->

    <process name="Demo01" main="true">
        <states>
            <state name="new" />
            <state name="paid" />
            <state name="shipped" />
            <state name="returned" />
            <state name="refunded" />
            <state name="closed" />
        </states>

        <transitions>

-            <transition>
-                <source>new</source>
-                <target>paid</target>
-            </transition>
        </transitions>

        <events>
        </events>

    </process>

</statemachine>
Now, add the event to the events section and in the transition you already have. Refresh the graph afterward.

config/Zed/oms/Demo01.xml

<?xml version="1.0"?>

<statemachine
xmlns="spryker:oms-01"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

<!-- Used as example XML for OMS implementation -->

    <process name="Demo01" main="true">
        <states>
            <state name="new" />
            <state name="paid" />
            <state name="shipped" />
            <state name="returned" />
            <state name="refunded" />
            <state name="closed" />
        </states>

        <transitions>
            <transition>
                <source>new</source>
                <target>paid</target>

-                <event>pay</event>
            </transition>
        </transitions>

        <events>

-            <event name="pay" onEnter="true" />
        </events>
    </process>
</statemachine>
Finally, add rest of the transitions and events.

config/Zed/oms/Demo01.xml

<?xml version="1.0"?>

<statemachine
xmlns="spryker:oms-01"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

<!-- Used as example XML for OMS implementation -->

    <process name="Demo01" main="true">
        <states>
            <state name="new" />
            <state name="paid" />
            <state name="shipped" />
            <state name="returned" />
            <state name="refunded" />
            <state name="closed" />
        </states>

        <transitions>
            <transition>
                <source>new</source>
                <target>paid</target>
                <event>pay</event>
            </transition>

-

-            <transition>
-                <source>paid</source>
-                <target>shipped</target>
-                <event>ship</event>
-            </transition>
-
-            <transition>
-                <source>shipped</source>
-                <target>returned</target>
-                <event>return</event>
-            </transition>
-
-            <transition>
-                <source>returned</source>
-                <target>refunded</target>
-                <event>refund</event>
-            </transition>
-
-            <transition>
-                <source>shipped</source>
-                <target>closed</target>
-                <event>close</event>
-            </transition>
-
-            <transition>
-                <source>refunded</source>
-                <target>closed</target>
-                <event>close after refund</event>
-            </transition>
        </transitions>

        <events>
            <event name="pay" onEnter="true" />

-            <event name="ship" manual="true" />
-            <event name="return" manual="true" />
-            <event name="refund" onEnter="true" />
-            <event name="close" timeout="14 days" />
-            <event name="close after refund" onEnter="true" />
        </events>
    </process>
</statemachine>
The skeleton of the order process is now done. Refresh the graph and check your process.

2. Add a Command and a Condition to the State Machine
   Order process usually needs PHP implementations for certain functionalities e.g. calling a payment provider or checking if a payment is authorized or not. To do so, Spryker introduces Commands and Conditions. From the names, Commands are used for any implementation of any functionality used in the process, and Conditions are used to replace an if-then statement in your process. They are both implemented in PHP and injected in the state machine skeleton.

Add a dummy Command to perform the payment. In a real scenario, this command would call a payment provider to authorize the payment. A Command in the Spryker state machine is added to an event. Add the Command Demo/Pay to the pay event.

config/Zed/oms/Demo01.xml

<?xml version="1.0"?>

<statemachine
xmlns="spryker:oms-01"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

<!-- Used as example XML for OMS implementation -->

    <process name="Demo01" main="true">
        <states>
            ...
        </states>

        <transitions>
            ...
        </transitions>

        <events>

-            <event name="pay" onEnter="true" />

*            <event name="pay" onEnter="true" command="Demo/Pay" />
            <event name="ship" manual="true" />
            <event name="return" manual="true" />
            <event name="refund" onEnter="true" />
            <event name="close" timeout="14 days" />
            <event name="close after refund" onEnter="true" />
        </events>
    </process>
</statemachine>
Refresh the graph again. You will see that the Command is added with the label “not implemented”. This means that the PHP implementation is not hooked yet

Let’s add the Command and hook into the skeleton. The Command is a Spryker plugin connected to the OMS module. For the demo, we will add the command plugin directly to the OMS module. In a real-life scenario, you can add the plugin in any other module depending on the software design of your shop. Add the Command plugin in src/Pyz/Zed/Oms/Communication/Plugin/Command/Demo/ and call it PayCommand. As the Command is a plugin, it should implement some interface. The interface for the Command here is CommandByOrderInterface which has the method run();

src/Pyz/Zed/Oms/Communication/Plugin/Command/Demo/PayCommand.php

<?php

namespace Pyz\Zed\Oms\Communication\Plugin\Command\Demo;

use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\AbstractCommand;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface;

class PayCommand extends AbstractCommand implements CommandByOrderInterface
{
    /**
     *
     * Command which is executed per order basis
     *
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
     *
     * @return array
     */
    public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data)
    {
        return [];
    }
}
Now, hook the Command to your state machine using the OmsDependencyProvider. In the OmsDependencyProvider, there is a method called extendCommandPlugins(). Add your new Command to the Command collection inside the container and use the same Command name you have used in the XML skeleton like this:

src/Pyz/Zed/Oms/OmsDependencyProvider.php
<?php

namespace Pyz\Zed\Oms;

+use Pyz\Zed\Oms\Communication\Plugin\Command\Demo\PayCommand;
//...

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            //...
+            $commandCollection->add(new PayCommand(), 'Demo/Pay');

            return $commandCollection;
        });

        return $container;
    }
    
    //...
}
Refresh the graph, you should not see the “not implement” label anymore meaning that the state machine recognizes the command by now.

Let’s add the Condition in the same way but using the ConditionInterface interface for the plugin instead of the Command one. The state machine engine recognizes where to move next using the event name. In this case, the transitions paid -> shipped and paid -> unauthorized should use the same event name with a Condition on one of the transitions. The machine then will examine the condition, if it returns true then go to shipped state, otherwise go to unauthorized. The skeleton will look like this:

config/Zed/oms/Demo01.xml
<?xml version="1.0"?>

<statemachine
xmlns="spryker:oms-01"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

<!-- Used as example XML for OMS implementation -->

    <process name="Demo01" main="true">
        <states>
            <state name="new" />

-            <state name="unauthorized" />
            ...
        </states>

        <transitions>

*            <transition>

-            <transition condition="Demo/IsAuthorized">
                <source>new</source>
                <target>paid</target>
                <event>pay</event>
            </transition>
-
-            <transition>
-                <source>new</source>
-                <target>unauthorized</target>
-                <event>pay</event>
-            </transition>
            ...
        </transitions>

        <events>
            ...
        </events>

    </process>

</statemachine>
The Condition plugin:

src/Pyz/Zed/Oms/Communication/Plugin/Condition/Demo/IsAuthorizedCondition.php

<?php

namespace Pyz\Zed\Oms\Communication\Plugin\Condition\Demo;

use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\AbstractCondition;
use Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionInterface;

class IsAuthorizedCondition extends AbstractCondition implements ConditionInterface
{
    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItem
     *
     * @return bool
     */
    public function check(SpySalesOrderItem $orderItem)
    {
        return true;
    }
}
And the OmsDependencyProvider:

src/Pyz/Zed/Oms/OmsDependencyProvider.php
<?php

namespace Pyz\Zed\Oms;

+use Pyz\Zed\Oms\Communication\Plugin\Condition\Demo\IsAuthorizedCondition;
//...

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    //...
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendConditionPlugins(Container $container): Container
    {
        $container->extend(OmsDependencyProvider::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
            $conditionCollection
                //...
+                ->add(new IsAuthorizedCondition(), 'Demo/IsAuthorized');

            return $conditionCollection;
        });

        return $container;
    }
    //...
}
The order process for your shop is done! Refresh the graph and check it out.

3. Use the State Machine for your orders
The final step is to use the state machine by hooking it into the checkout. To do so, open the configuration file config/Shared/common/config_oms-development.php and make the invoice payment method use the Demo01 process.

config/Shared/common/config_oms-development.php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    //...
-    DummyPaymentConfig::PAYMENT_METHOD_INVOICE => 'DummyPayment01',
+    DummyPaymentConfig::PAYMENT_METHOD_INVOICE => 'Demo01',
    //...
];
4. Test the State Machine
That’s it! You have just built a new order process. To test it:

Go to your shop http://yves.de.spryker.local/ and choose a product, add it to the cart, and checkout using the Invoice payment method.
Open the orders page in the Backend Office http://backoffice.de.spryker.local/sales/ and then open your order. The Demo01 process is now applied on your order.
You will notice that there is a button next to your order called ship, this one triggers the manual event ship.
You can click on the last state name under the state column to see what the current state for a specific item is. The current state has a yellowish background color.
Now click on ship to move the item into the next state.
Click again on the last state name and check the current state.
You can keep moving the item until you reach a state that is not manually executable.
Something Extra:
Along with the nice representation of the state machine as a graph, Spryker provides a flag called happy. This flag adds green arrows on the transitions in order to define the happy path of an order item and aligns the graph for better representation of the desired process.

To add this flag, just write happy = true on the transitions that are part of your process’s happy path and refresh the graph.

The complete statemachine will look like this

config/Zed/oms/Demo01.xml
<?xml version="1.0"?>

<statemachine
xmlns="spryker:oms-01"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

<!-- Used as example XML for OMS implementation -->

    <process name="Demo01" main="true">
        <states>
            <state name="new" />
            <state name="unauthorized" />
            <state name="paid" />
            <state name="shipped" />
            <state name="returned" />
            <state name="refunded" />
            <state name="closed" />
        </states>

        <transitions>
            <transition condition="Demo/IsAuthorized" happy="true">
                <source>new</source>
                <target>paid</target>
                <event>pay</event>
            </transition>

            <transition>
                <source>new</source>
                <target>unauthorized</target>
                <event>pay</event>
            </transition>

            <transition happy="true">
                <source>paid</source>
                <target>shipped</target>
                <event>ship</event>
            </transition>

            <transition>
                <source>shipped</source>
                <target>returned</target>
                <event>return</event>
            </transition>

            <transition>
                <source>returned</source>
                <target>refunded</target>
                <event>refund</event>
            </transition>

            <transition happy="true">
                <source>shipped</source>
                <target>closed</target>
                <event>close</event>
            </transition>

            <transition>
                <source>refunded</source>
                <target>closed</target>
                <event>close after refund</event>
            </transition>
        </transitions>

        <events>
            <event name="pay" onEnter="true" command="Demo/Pay" />
            <event name="ship" manual="true" />
            <event name="return" manual="true" />
            <event name="refund" onEnter="true" />
            <event name="close" timeout="14 days" />
            <event name="close after refund" onEnter="true" />
        </events>
    </process>

</statemachine>
