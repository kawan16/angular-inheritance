
( function( ng , appname ) {

    'use strict';

    function ChildController( $scope , $log , ChildService ) {
        ng.store('ParentController').apply(this, arguments );
        // Test by assigning directly the scope and check methods overriding in the console of save
        this.scope.data =  { name:'Tyrion' };
    }

    ng.inherit().controller(  ChildController , 'ParentController' );

    ChildController.prototype.validData = function() {
        this.log.info('Level 1 - Child Controller checks data before saving them ...');
        return true;
    };

    ChildController.prototype.save = function() {
        this.log.info('Level 1 - Child Controller overrides the parent saving data method...');
        if( ! this.validData() ) { return; }
        ng.store('ParentController').prototype.save.apply(this);
    };

    ng.module(appname).controller('ChildController', ChildController );

}) ( angular , 'Demo');