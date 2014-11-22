

( function( ng ) {

    function ModalController( $scope ) {
        this.super('BaseController' , [ $scope ] );
        this.scope.openModal = ng.bind( this , this.openModal );
        this.scope.closeModal = ng.bind( this , this.closeModal );
    }

    ng.inherit( 'ModalController' , ModalController ).from( 'BaseController' );

    ModalController.prototype.openModal = function( modalElementId ) {
        console.log('open modal');
        ng.element( modalElementId ).modal('show');
    };

    ModalController.prototype.closeModal = function( modalElementId) {
        ng.element( modalElementId).modal('hide');
    };


})( angular );