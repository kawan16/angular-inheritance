
( function( ng ) {

    function CrudsController( $scope , CrudsService ) {
        this.super( 'CreateController',  arguments );
        this.super( 'ReadController' , arguments );
        this.super( 'UpdateController' , arguments );
        this.super( 'DeleteController' , arguments );
        this.super( 'SearchController' , arguments );
    }

    ng.expand().controller( CrudsController ,
        [ 'CreateController' ,  'ReadController' , 'UpdateController' ,
          'DeleteController' , 'SearchController' ] );

    ng.store( 'CrudsController' , CrudsController );

}) ( angular , 'Demo' );