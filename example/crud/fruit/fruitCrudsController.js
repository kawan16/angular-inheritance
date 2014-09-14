/**
 *
 * Author : Karl Devooght
 * Date :   13/09/2014
 */

( function( ng ) {

    function FruitCrudsController( $scope , FruitCrudsService ) {
        this.super( 'CrudsController' ).apply( arguments );
    }

    ng.inherit().controller( FruitCrudsController , 'CrudsController');

}) ( angular );