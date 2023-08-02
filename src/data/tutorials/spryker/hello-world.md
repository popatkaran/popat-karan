---
slug: "/spryker/training/hello-world"
description: The tutorial describes how to display a text string on the page in the browser by adding a new Yves module.
date: "2019-05-04"
title: "Hello World"
category: "spryker"
type: "professional"
image: '../../../images/platforms/banner-spryker.png'
order: 0
---

### Objective

Show "Hello World!" string on a web page on your browser. To do so, build a new module called **HelloWorld**.

### Implementation steps

The steps described in this procedure describe how to build a new module. To add a new Yves module called **HelloWorld**, do the following:

1. Go to `/src/Pyz/Yves/` and add a new module called HelloWorld.

> A new module is simply a new folder.

2. Add a new controller for the module.
   Add a new folder inside the HelloWorld module called `Controller`, and then add the following controller class called `IndexController`:

```php
<?php

namespace Pyz\Yves\HelloWorld\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class IndexController extends AbstractController
{
	/**
    * @param Request $request
	*
	* @return \Spryker\Yves\Kernel\View\View
	*/
	public function indexAction(Request $request)
    {
        $data = ['helloWorld' => 'Hello World!'];

        return $this->view(
            $data,
            [],
            '@HelloWorld/views/index/index.twig'
        );
    }
}
```

3. Add the route to the controller:
   1. Add a new folder inside the HelloWorld module called `Plugin`.
   2. Inside the **Plugin** folder, add a folder called **Provider**.
   3. Add your `RouteProviderPlugin` class with the name `HelloWorldRouteProviderPlugin`:

```php
<?php

namespace Pyz\Yves\HelloWorld\Plugin\Provider;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class HelloWorldRouteProviderPlugin extends AbstractRouteProviderPlugin
{
	protected const ROUTE_HELLO_WORLD = 'hello-world';

	/**
	 * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
         *
         * @return \Spryker\Yves\Router\Route\RouteCollection
         */
        public function addRoutes(RouteCollection $routeCollection): RouteCollection
        {
            $route = $this->buildRoute('/hello-world', 'HelloWorld', 'Index', 'indexAction');
            $routeCollection->add(static::ROUTE_HELLO_WORLD, $route);

            return $routeCollection;
        }
}
```

4. Register the `RouteProviderPlugin` in the application, so the application knows about your controller action.
   Go to `RouterDependencyProvider::getRouteProvider()` method in `Router` module and add `HelloWorldRouteProviderPlugin` to the array.
5. Finally, add the twig file to render your Hello World page. Add the following folder structure inside the **HelloWorld** module: `Theme/default/views/index`.

> This folder structure reflects your theme and controller names. Default is the theme name, and index is the controller name. For every action there is a template with the same name.

As your action is called index, add a twig file for your action called `index.twig`:

```php
{% extends template('page-layout-main') %}

{% define data = {
helloWorld: _view.helloWorld
} %}

{% block content %}
    <div><h2>{{ data.helloWorld }}</h2></div>
{% endblock %}
```

6. Open the new page `http://www.de.suite.local/hello-world`.
