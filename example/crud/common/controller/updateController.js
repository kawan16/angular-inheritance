
( function( ng ) {

    function UpdateController( $scope , UpdateService ) {
        this.super( 'BaseController' ).apply( [ $scope ] );
        this.service = UpdateService;
        this.q = ng.injector(['ng']).get('$q');
    }

    ng.inherit().controller( UpdateController , 'BaseController' );

    /**
     * @returns true if the create operation can be performed
     */
    UpdateController.prototype.canUpdate = function() { return true;}

    /**
     * @returns the promise resolved after the update operation and the call to doAfterXXXUpdate function
     */
    UpdateController.prototype.create =  function() {
        var defer = this.q.defer();
        if( this.canUpdate() ) {
            this.service.create( this.itemToUpdate() )
                .then( function( result ) {
                    this.doAfterSuccessUpdate( result );
                    defer.resolve( result );
                }, function( error ) {
                    this.doAfterFailUpdate( error );
                    defer.reject( error );
                });
            return defer.promise;
        }
    };

    /**
     * Actions performed after the create operation has been successfully performed
     * @param result    The result of the creation operation
     */
    UpdateController.prototype.doAfterSuccessUpdate = function( result ) {
        this.createdItem( this.itemToUpdate() );
    };

    /**
     * Actions performed after the create operation has been  performed with errors
     * @param result    The result of the creation operation
     */
    UpdateController.prototype.doAfterFailUpdate = function(  error ) {
        this.createdItem( {} );
    };

    /**
     * Get / Set the item to be create related to the itemToUpdate scope variable
     * @param item  The item to set
     * @returns the value of the itemToUpdate scope variable
     */
    UpdateController.prototype.itemToUpdate = function( item ) {
        if( item ) this.scope.itemToUpdate = item;
        else return this.scope.itemToUpdate;
    };

    /**
     * Get / Set the created related to the createdItem scope variable
     * @param item  The created item to set
     * @returns the value of the createdItem scope variable
     */
    UpdateController.prototype.createdItem = function( item ) {
        if( item ) this.scope.createdItem = item;
        else return this.scope.createdItem;
    };

    ng.store( 'UpdateController' , UpdateController );

}) ( angular );