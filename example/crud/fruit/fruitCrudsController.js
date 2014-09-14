/**
 *
 * Author : Karl Devooght
 * Date :   13/09/2014
 */

( function( ng , appName ) {

    function FruitCrudsController( $scope , FruitCrudsService , $modal ) {
        this.super( 'CrudsController' ,  [ $scope, FruitCrudsService ]);
        this.super( 'ModalController' ,  [ $scope, $modal ]);

        console.log('fruit cruds open modal ' + this.openModal);

        // Initial search
        this.filter( "" );
        this.search();
    }

    ng.expand().controller( FruitCrudsController , [ 'CrudsController' , 'ModalController' ] );


    // Override
    FruitCrudsController.prototype.doAfterSuccessSearch = function( result ) {
        this.parent('CrudsController').doAfterSuccessSearch.apply( this , [ result ]  );
        // Need to scope apply since we don't use real xhr requests
        this.scope.$apply();
    };

    ng.module( appName ).controller( 'FruitCrudsController' , FruitCrudsController );

}) ( angular , 'CrudDemo');