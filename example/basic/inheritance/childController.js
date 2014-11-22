
( function( ng , appname ) {

    'use strict';

    function ChildController( $scope , $log , ChildService ) {
        this.super('ParentController' , arguments );
        // Test by assigning directly the scope and check methods overriding in the console of save
        this.scope.data =  { name:'Tyrion' };
    }

    ng.inherit( 'ChildController' , ChildController ).from( 'ParentController' );

    ChildController.prototype.validData = function() {
        this.log.info('Level 1 - Child Controller checks data before saving them ...');
        return true;
    };

    ChildController.prototype.save = function() {
        this.log.info('Level 1 - Child Controller overrides the parent saving data method...');
        if( ! this.validData() ) { return; }
        this.parent('ParentController').save.apply(this);
    };

    ng.module( appname ).controller('ChildController', ChildController );

}) ( angular , 'Demo');