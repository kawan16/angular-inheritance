/**
 *
 * Author : Karl Devooght
 * Date :   13/09/2014
 */

( function( ng , appName ) {

    function FruitCrudsController( $scope , FruitCrudsService  ) {
        this.super( 'CrudsController' ,  [ $scope, FruitCrudsService ]);
        this.super( 'ModalController' ,  [ $scope ]);

        // Initial search
        this.filter( "" );
        this.search();

        angular.element('#testModal').modal('show');
    }

    ng.expand( 'FruitCrudsController' , FruitCrudsController).from( [ 'CrudsController' , 'ModalController' ] );


    // Override
    FruitCrudsController.prototype.doAfterSuccessSearch = function( result ) {
        this.parent('CrudsController').doAfterSuccessSearch.apply( this , [ result ]  );
        // Need to scope apply since we don't use real xhr requests
        this.scope.$apply();
    };

    ng.module( appName ).controller( 'FruitCrudsController' , FruitCrudsController );

}) ( angular , 'CrudDemo');