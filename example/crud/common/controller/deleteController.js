
( function( ng ) {

    function DeleteController( $scope , DeleteService ) {
        this.super( 'BaseController' ).apply( [ $scope ] );
        this.service = DeleteService;
        this.q = ng.injector(['ng']).get('$q');
    }

    ng.inherit().controller( DeleteController , 'BaseController' );

    /**
     * Actions performed just before the delete operation
     */
     ReadController.prototype.doBeforeDelete = function() {
        // Nothing to do by default;
     }

    /**
     * @returns true if the delete operation can be performed
     */
    DeleteController.prototype.canDelete = function() { return true;}

    /**
     * @returns the promise resolved after the delete operation and the call to doAfterXXXDelete function
     */
    DeleteController.prototype.delete =  function() {
        var defer = this.q.defer();
        if( this.canDelete() ) {
            this.doBeforeDelete();
            this.service.delete( this.itemToDelete() )
                .then( function( result ) {
                    this.doAfterSuccessDelete( result );
                    defer.resolve( result );
                }, function( error ) {
                    this.doAfterFailDelete( error );
                    defer.reject( error );
                });
            return defer.promise;
        }
    };

    /**
     * Actions performed after the delete operation has been successfully performed
     * @param result    The result of the delete operation
     */
    DeleteController.prototype.doAfterSuccessDelete = function( result ) {
        // Nothing by default
    };

    /**
     * Actions performed after the delete operation has been  performed with errors
     * @param result    The result of the delete operation
     */
    DeleteController.prototype.doAfterFailDelete = function(  error ) {
        // Nothing by default
    };

    /**
     * Get / Set the item to be delete related to the itemToDelete scope variable
     * @param item  The item to set
     * @returns the value of the itemToDelete scope variable
     */
    DeleteController.prototype.itemToDelete = function( item ) {
        if( item ) this.scope.itemToDelete = item;
        else return this.scope.itemToDelete;
    };

    /**
     * Get / Set the deleted related to the deletedItem scope variable
     * @param item  The deleted item to set
     * @returns the value of the deletedItem scope variable
     */
    DeleteController.prototype.deletedItem = function( item ) {
        if( item ) this.scope.deletedItem = item;
        else return this.scope.deletedItem;
    };

    ng.store( 'DeleteController' , DeleteController );

}) ( angular );