Angular Inheritance
===================

A problem that may occur when one develop a web application based on AngularJS (1.X) is the fact that you cannot really abstract some common controller or service behavior. Besides, you often have to deal with the problem of controller granularity: do I have to create several sub-controllers ( but in this way, you have to cope with some scope inheritance issues) or do I have to define only one main controller ( but getting an awful big piece of code included in the controller function ).  

Angular Inheritance is a library which proposes a third alternative by giving you the possibility to define your controllers and services in an inheritance way. It allows to take advantage of both worlds by introducing inheritance and multi-inheritance-like process in your Angular code.

## Installation

To install Storycode, you just need to get the JS files in the ```dist``` folder. A bower version is coming soon. Then, put them in your ```lib``` folder and add in your index file:

```html
  <script type="text/javascript" src="<LIB_PATH>/angular-inheritance.js"> </script>
```

## Features

Using Angular Inheritance means thinking Angular controller and service in a JS prototypal way as the following sections suggest. 

### Base Controller and Service

Angular inheritance comes with base controller and service from which children inherits. Both controller and service comes with a the $log service as ```log``` attribute. The controller has its ```scope``` as attribute in more.

```js
   function BaseController( $scope ) { /* Some code */}
   function ServiceController( ) { /* Some code */}
```

### Controller Inheritance

Simple inheritance relationship is quite simple to express. First, we define our controller function. For instance:

```js
   function ChildController( $scope ) {
      this.someAttribute = 'Some value';
      this.someMethod = function() { return 'Some method' };
   }
   
```
Then, just declare the inheritance relation such as:

```js
   angular.inherit( "ChildController" , ChildControllerFn ).from('BaseController');
```

Then, if you need to override some methods in a prototypal way, just do it:

```js
   ChildController.prototype.someParentMethod = function() { return "some overriden value"; };
```

### Service Inheritance

Service inheritance proceeds in the way with: 

```js
   angular.inherit( "ChildService" , ChildControllerFn ).from('BaseService');
```

### Controller Multi-Inheritance

If you need your controller to inherit from others controllers, you just have to use the method  ```expand``` and provide the array of parent controllers:

```js
   angular.expand( "ChildController" , ChildControllerFn ).from( [ 'Parent1Controller' , 'Parent2Controller' , 'Parent3Controller' ]);
```

### Service Multi-Inheritance

And for service multi-inheritance: 

```js
   angular.expand( "ChildService" , ChildControllerFn ).from( [ 'Parent1Service' , 'Parent2Service' , 'Parent3Service' ]);
```

### Super method

To be in a real inheritance perspective, we need to be able to call parent controller constructor i.e. the controller function. To do this, you do like this: 

```js
    function ChildController( $scope ) {
      this.super('ParentController' /* Identifier of controller */ , [ $scope ] /* List of constructor arguments */ );
   }
```
In this way, you get a super-power: the one to instantiate "manually" the parent controller. That gives you the possibility to define abstract controller and service.

### Parent method

In order to have a clean way to override a controller / service method, you can use the parent method as followas:

```js
  ChildController.prototype.someParentMethod = function() { 
    var parentValue = this.parent( 'ParentController' ).someParentMethod.apply( this , [] );
    return "some overriden value of " + parentValue; 
  };
```

## Precautions

Some exceptions may arise if you declare randomly your JS files in your index HTML file. The rule is to declare controllers and services based on their inheritance level. A parent controller must be declare before its children. 

```html
  <script type="text/javascript" src="<SRC_PATH>/parentController.js"> </script>
  <script type="text/javascript" src="<SRC_PATH>/childController.js"> </script>
  <script type="text/javascript" src="<SRC_PATH>/grandChildController.js"> </script>
```

## Examples

You can find examples of how Angular Inheritanc works in the ```example``` folder. Particularly, we propose an abstract CRUDS model of controller and service upon which child controller can base. When your Web Application has to complete CRUDS operations on N types of object, the CRUDS example can inspire you to save time and code lines.

## Release history



