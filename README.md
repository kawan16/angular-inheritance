angular-inheritance
===================

This Angular library provides tools to define inheritance and quasi multi-inheritance relationships for controllers, services and factories.

Base components
--------------------

Three base functions are defined ( BaseController , BaseService and BaseFactory ) upon which inheritance relations will start from ( althrough this is optional ).

Inheritance
--------------------

Angular inheritance use the classic pattern for Javascript inheritance. Suppose a simple controller called ParentController which inherits from the BaseController. 

First, we will called the base constructor into the ParentController which is a constructor ( Step 1 ). We use the super function defined in the BaseController.

Then, we just need to call the angular.inherit().controller function with the ParentController function and the name of the BaseController. That's it !

If we want to add new controller methods, we just need to add them after the inheritance assignment ( step 3 ).

If you need to inherit another controller from the ParentController, you have to store the ParentController function in order to be available for future inheritance relations ( step 4 ).

```
( function( ng , appName ) {

  
  function ParentController($scope) {
      // Step 1
      this.super('BaseController', arguments );
  }
  
  // Step 2
  ng.inherit().controller( ParentController , 'BaseController' );
  
  
  // Step 3
  ParentController.prototype.doSomethingNew = function() {}
  
  // Step 4
  ng.store('ParentController' , ParentController );
  
  ng.module(appName).controller( 'ParentController' , ParentController );
  
  
} ( angular , 'YOUR_APP')

```





Quasi Multi-Inheritance
--------------------


