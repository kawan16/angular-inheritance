
/*
 * Angular inheritance
 *
 * @author Karl Devooght
 */

( function( ng  ) {

    'use strict';

    // Constructors cache
    var cache;
    // Angular injector
    var $injector = ng.injector(['ng']);

    // Initialize the constructors cache
    $injector.invoke(function( $cacheFactory ) {
        cache = $cacheFactory('angular-inheritance');
    });

    /*
     * Get / Set a constructor functions
     */
     ng.store = function( constructorName , constructor )  {
        if( ! constructor ) {
            return cache.get( constructorName );
        }
        else {
            cache.put( constructorName , constructor );
        }
     };


    ////// INHERITANCE /////

    /*
     * Angular method that returns tools in order to describe inheritance relationship
     * for controllers, service and factories
     */
    ng.inherit = function( ) {

        /*
         * Extends the Child constructor with the Parent constructor
         * and keep a track of the parent constructor in a $super property
         */
        function extend(Child, Parent) {
            Child.prototype = inheritPrototype(Parent.prototype);
            Child.prototype.constructor = Child;
        }

        /* Returns an "empty-constructor" object with the specified prototype */
        function inheritPrototype(proto) {
            function F() {}
            F.prototype = proto;
            return new F;
        }

        /*
         * Look for the stored parent constructor identified with parentName
         * and extends the child constructor with the parent constructor
         */
        function inherit(childConstructor, parentName) {
            var parentConstructor = cache.get( parentName );
            if( ! parentConstructor)
                throw 'The name does not refer to any constructor. Did you forget to store it ?';
            extend(childConstructor, parentConstructor);
        }

        return {
            controller: function (childController, parentControllerName) {
                inherit(childController, parentControllerName);
            },
            service: function (childService, parentServiceName) {
                inherit(childService, parentServiceName);
            },
            factory: function (childFactory, parentFactoryName) {
                inherit(childFactory, parentFactoryName);
            }
        };
    };

    ////// QUASI MULTI-INHERITANCE /////

    /*
     * Angular method that returns tools in order to describe quasi multi-inheritance relationship
     * for controllers, service and factories
     */
    ng.expand = function( ) {

        /*
         * Extends the Child constructor with the Component constructor
         */
        function extend( Child, Component ) {
            for( var property in Component.prototype ) {
                //if( Component.hasOwnProperty( property ) ) {
                    Child.prototype[ property ] = Component.prototype[ property ];
                //}
            }
            Child.prototype.constructor = Child;
        }

        /*
         * Look for the stored components constructors identified with componentNameArray
         * and extends the child constructor with them.
         */
        function inherit( childConstructor, componentNameArray  ) {
            angular.forEach( componentNameArray , function( componentName ) {
                var componentConstructor = ng.store( componentName );
                if( ! componentConstructor)
                    throw 'The name does not refer to any constructor. Did you forget to store it ?';
                extend( childConstructor , componentConstructor );
            });
        }

        return {
            controller: function( childController , componentControllerNameArray ) {
                inherit( childController , componentControllerNameArray );
            },
            service: function( childService, componentServiceNameArray ) {
                inherit( childService, componentServiceNameArray );
            },
            factory: function( childFactory, componentFactoryNameArray ) {
                inherit( childFactory, componentFactoryNameArray );
            }
        };
    };

    ////// BASE COMPONENTS /////

    /**
     * @param $scope    Scope injection
     * @constructor     Base controller
     */
    function BaseController( $scope ) {
        if( ! this.scope ) {
            this.scope = $scope;
        }

        if( ! this.log ) {
            this.log = ng.injector(['ng']).get('$log');
        }
    }

    /**
     * @param componentName The component name
     * @param componentDependencies     The arguments used to call the component constructor
     * @returns The component constructor
     */
    BaseController.prototype.super = function( componentName , componentDependencies ) {
        return ng.store( componentName ).apply( this , componentDependencies );
    };

    /**
     *
     * @param componentName The component name
     * @returns The prototype of the component ( which eases methods overriding )
     */
    BaseController.prototype.parent = function( componentName ) {
        return ng.store( componentName ).prototype;
    };

    ng.store( 'BaseController' , BaseController );


    /**
     * @constructor     Base service
     */
    function BaseService() {
        if( ! this.log ) {
            this.log = ng.injector(['ng']).get('$log');
        }
    }

    /**
     * @param componentName The component name
     * @param componentDependencies     The arguments used to call the component constructor
     * @returns The component constructor
     */
    BaseService.prototype.super = function( componentName , componentDependencies ) {
        ng.store( componentName ).apply( this , componentDependencies );
    };

    /**
     *
     * @param componentName The component name
     * @returns The prototype of the component ( which eases methods overriding )
     */
    BaseService.prototype.parent = function( componentName ) {
        return ng.store( componentName ).prototype;
    };

    ng.store( 'BaseService' , BaseService );

    /**
     * @constructor     Base service
     */
    function BaseFactory() {
        if( ! this.log ) {
            this.log = ng.injector(['ng']).get('$log');
        }
    }

    /**
     * @param componentName The component name
     * @param componentDependencies     The arguments used to call the component constructor
     * @returns The component constructor
     */
    BaseFactory.prototype.super = function( componentName , componentDependencies ) {
        ng.store( componentName ).apply( this , componentDependencies );
    };

    ng.store( 'BaseFactory' , BaseFactory );

}) ( angular );