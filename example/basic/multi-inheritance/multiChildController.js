
( function( ng , appName ) {

    'use strict';

    function MultiChildController( $scope , $log  ) {
        this.super('ParentAController' , arguments );
        this.super('ParentBController' , arguments );
    }
    ng.expand( 'MultiChildController' , MultiChildController ).from( [ 'ParentAController' , 'ParentBController'] );

    ng.module(appName).controller('MultiChildController', MultiChildController );

}) ( angular , 'Demo' );