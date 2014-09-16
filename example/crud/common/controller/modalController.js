

( function( ng ) {

    function ModalController( $scope ) {
        this.super('BaseController' , [ $scope ] );
        this.scope.openModal = ng.bind( this , this.openModal );
        this.scope.closeModal = ng.bind( this , this.closeModal );
    }

    ng.inherit().controller( ModalController ,'BaseController');

    ModalController.prototype.openModal = function( modalElementId ) {
        console.log('open modal');
        ng.element( modalElementId ).modal('show');
    };

    ModalController.prototype.closeModal = function( modalElementId) {
        ng.element( modalElementId).modal('hide');
    };

    ng.store( 'ModalController' , ModalController );

})( angular );