
( function( ng , appName ) {

    'use strict';

    function MultiChildController( $scope , $log  ) {
        ng.store('ParentAController').apply(this, arguments );
        ng.store('ParentBController').apply(this, arguments );
    }
    ng.expand().controller(  MultiChildController , [ 'ParentAController' , 'ParentBController'] );

    ng.module(appName).controller('MultiChildController', MultiChildController );

}) ( angular , 'Demo' );