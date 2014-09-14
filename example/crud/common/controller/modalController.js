

( function( ng ) {

    function ModalController( $scope , $modal) {
        this.super('BaseController' , [ $scope ] );
        this.modal = $modal;
        this.scope.openModal = ng.bind( this , this.openModal);
    }

    ng.inherit().controller( ModalController ,'BaseController');

    ModalController.prototype.openModal = function( modalName ) {
        this.instance = this.modal.open({
            templateUrl: modalName,
            controller: ModalInstanceController
        });
    };

    function ModalInstanceController( $scope , $modalInstance ) {
        this.super('BaseController' , [ $scope ] );
        this.instance = $modalInstance;
        this.scope.closeModal = ng.bind( this , this.closeModal );
    }

    ng.inherit().controller( ModalInstanceController ,'BaseController');

    ModalInstanceController.prototype.closeModal = function( ) {
        this.instance.dismiss('cancel');
    };

    ng.store( 'ModalController' , ModalController );

})( angular );