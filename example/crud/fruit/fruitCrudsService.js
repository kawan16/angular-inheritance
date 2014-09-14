
( function( ng ) {

    function FruitCrudsService() {
        this.super( 'Crudsservice' ).apply( arguments );

        this.fruits = [

        ];
    }

    ng.inherit().service( FruitCrudsService , 'CrudsService');




}) ( angular );