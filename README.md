Angular Inheritance
===================

A problem that may occur when one develop a web application based on AngularJS (1.X) is the fact that you cannot really abstract some common controller or service behavior. Besides, you often have to deal with the problem of controller granularity: do I have to create several sub-controllers ( but in this way, you have to cope with some scope inheritance issues) or do I have to define only one main controller ( but getting an awful big piece of code included in the controller function ).  

Angular Inheritance is a library which proposes a third alternative by giving you the possibility to define your controllers and services in an inheritance way. It allows to take advantage of both worlds by introducing inheritance and multi-inheritance-like process in your Angular code.

## Installation

To install Storycode, you just need to get the JS files in the ```dist``` folder. A bower versio is coming soon. Then, put them in your ```lib``` folder and add in your index file:

```html
  <script type="text/javascript" src="<LIB_PATH>/angular-inheritance.js"> </script>
```

## Features

### Controller Inheritance

### Service Inheritance

### Controller Multi-Inheritance

### Service Multi-Inheritance

