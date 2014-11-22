
( function( ng ) {

    function UpdateController( $scope , UpdateService ) {
        this.super( 'BaseController' , [ $scope ] );
        this.service = UpdateService;
        this.q = ng.injector(['ng']).get('$q');

        this.itemToUpdate( {} );
        this.updatedItem( {} );
        this.scope.update = ng.bind( this , this.update );
    }

    ng.inherit( 'UpdateController' , UpdateController ).from( 'BaseController' );

    /**
     * Actions performed just before the update operation
     */
    UpdateController.prototype.doBeforeUpdate = function() {
        // Nothing to do by default;
    };

    /**
     * @returns true if the create operation can be performed
     */
    UpdateController.prototype.canUpdate = function() { return true;}

    /**
     * @returns the promise resolved after the update operation and the call to doAfterXXXUpdate function
     */
    UpdateController.prototype.update =  function() {
        var that = this;
        var defer = this.q.defer();
        if( this.canUpdate() ) {
            this.doBeforeUpdate();
            this.service.update( this.itemToUpdate() )
                .then( function( result ) {
                    that.doAfterSuccessUpdate( result );
                    defer.resolve( result );
                }, function( error ) {
                    that.doAfterFailUpdate( error );
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
        this.updatedItem( this.itemToUpdate() );
    };

    /**
     * Actions performed after the create operation has been  performed with errors
     * @param result    The result of the creation operation
     */
    UpdateController.prototype.doAfterFailUpdate = function(  error ) {
        this.updatedItem( {} );
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
    UpdateController.prototype.updatedItem = function( item ) {
        if( item ) this.scope.updatedItem = item;
        else return this.scope.updatedItem;
    };


}) ( angular );