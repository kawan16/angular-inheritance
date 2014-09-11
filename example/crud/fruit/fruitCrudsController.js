
( function( ng ) {

    function FruitCrudsController( $scope , FruitCrudsService ) {
        this.super( 'CrudsController' ).apply( arguments );
    }

    ng.inherit().controller( FruitCrudsController , 'CrudsController');

    ng.store( 'CrudsController' , CrudsController );

}) ( angular , 'Demo' );