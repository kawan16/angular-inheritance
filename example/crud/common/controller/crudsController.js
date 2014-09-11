
( function( ng ) {

    function CrudsController( $scope , CrudsService ) {
        this.super( 'CreateController' ).apply( arguments );
        this.super( 'ReadController' ).apply( arguments );
        this.super( 'UpdateController' ).apply( arguments );
        this.super( 'DeleteController' ).apply( arguments );
        this.super( 'SearchController' ).apply( arguments );
    }

    ng.expand().controller( CrudsController ,
        [ 'CreateController' ,  'ReadController' , 'UpdateController' ,
          'DeleteController' , 'SearchController' ] );

    ng.store( 'CrudsController' , CrudsController );

}) ( angular , 'Demo' );