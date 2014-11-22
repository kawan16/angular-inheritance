
/*
 * Angular Inheritance
 *
 * Copyright (c) 2014 Karl Devooght
 * Licensed under the MIT license.
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

    // Returns a specified constructor ( for testing reason )
    ng.ancestor = function( constructorName ) {
        return cache.get( constructorName );
    };

    ////// INHERITANCE /////

    /*
     * Angular method that returns tools in order to describe inheritance relationship
     * for controllers, service and factories
     * @param   The name of the child component
     * @param   The child component constructor
     */
    ng.inherit = function( childName , childConstructor ) {

        /*
         * Extends the Child constructor with the Parent constructor
         * and keep a track of the parent constructor in a $super property
         */
        function extend(Child, Parent) {
            Child.prototype = inheritPrototype(Parent.prototype);
            Child.prototype.constructor = Child;
            if( ! Child.$parent ) { Child.$parent = []; }
            Child.$parent.push( Parent );
            if( Parent.$parent ) { Child.$parent.concat( Parent.$parent ); }
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
        function inherit( childConstructor , parentName ) {
            var parentConstructor = cache.get( parentName );
            if( parentConstructor) {
                extend(childConstructor, parentConstructor);
            }
            else {
                throw 'The name' + parentName + ' does not refer to any constructor. Did you forget to define/include it ?';
            }
        }

        // Suspend the current script about ms milliseconds
        function delay( ms ){
            var end = new Date().getTime() + ms;
            while ( end > new Date().getTime() );
        };

        return {
            from: function ( parentName ) {
                inherit( childConstructor , parentName );
                // Store the child component for future inheritance
                cache.put( childName , childConstructor );
            }
        };
    };

    ////// QUASI MULTI-INHERITANCE /////

    /*
     * Angular method that returns tools in order to describe quasi multi-inheritance relationship
     * for controllers and service
     * @param   The name of the child component
     * @param   The child component constructor
     */
    ng.expand = function(  childName , childConstructor  ) {

        /*
         * Extends the Child constructor with the Component constructor
         */
        function extend( Child, Component ) {
            for( var property in Component.prototype ) {
                Child.prototype[ property ] = Component.prototype[ property ];
            }
            Child.prototype.constructor = Child;
            if( ! Child.$parent ) { Child.$parent = []; }
            Child.$parent.push( Component );
            if( Component.$parent ) { Child.$parent.concat( Component.$parent ); }
        }

        /*
         * Look for the stored components constructors identified with componentNameArray
         * and extends the child constructor with them.
         */
        function inherit( childConstructor, componentNameArray  ) {
            angular.forEach( componentNameArray , function( componentName ) {
                var componentConstructor = cache.get( componentName );
                if( ! componentConstructor)
                    throw 'The name ' + componentName + ' does not refer to any constructor. Did you forget to define/include it ?';
                extend( childConstructor , componentConstructor );
            });
        }

        return {
            from: function( componentNameArray ) {
                inherit( childConstructor , componentNameArray );
                // Store the child component for future inheritance
                cache.put( childName , childConstructor );
            }
        };
    };

    ////// BASE COMPONENTS /////

    /**
     * @param $scope    Scope injection
     * @constructor     Base controller
     */
    function BaseController( $scope ) {
        if( ! this.scope ) { this.scope = $scope; }
        if( ! this.log ) { this.log = ng.injector(['ng']).get('$log'); }
    }

    /**
     * @param componentName The component name
     * @param componentDependencies     The arguments used to call the component constructor
     * @returns The component constructor
     */
    BaseController.prototype.super = function( componentName , componentDependencies ) {
        cache.get( componentName ).apply( this , componentDependencies );
    };

    /**
     *
     * @param componentName The component name
     * @returns The prototype of the component ( which eases methods overriding )
     */
    BaseController.prototype.parent = function( componentName ) {
        var cachedComponent = cache.get( componentName );
        var component = this.constructor.$parent [ this.constructor.$parent.indexOf( cachedComponent ) ];
        return component.prototype;
    };

    cache.put( 'BaseController' , BaseController );


    /**
     * @constructor     Base service
     */
    function BaseService() {
        if( ! this.log ) { this.log = ng.injector(['ng']).get('$log');}
    }

    /**
     * @param componentName The component name
     * @param componentDependencies     The arguments used to call the component constructor
     * @returns The component constructor
     */
    BaseService.prototype.super = function( componentName , componentDependencies ) {
        cache.get( componentName ).apply( this , componentDependencies );
    };

    /**
     *
     * @param componentName The component name
     * @returns The prototype of the component ( which eases methods overriding )
     */
    BaseService.prototype.parent = function( componentName ) {
        return cache.get( componentName ).prototype;
    };

    cache.put( 'BaseService' , BaseService );

}) ( angular );