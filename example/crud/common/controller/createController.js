
( function( ng ) {

    function CreateController( $scope , CreateService ) {
        this.super( 'BaseController', [ $scope ] );
        this.service = CreateService;
        this.q = ng.injector(['ng']).get('$q');

        this.itemToCreate( {} );
        this.createdItem( {} );
        this.scope.create = ng.bind( this , this.create );
    }

    ng.inherit().controller( CreateController , 'BaseController' );

    /**
     * @returns true if the create operation can be performed
     */
    CreateController.prototype.canCreate = function() { return true;}

    /**
     * @returns the promise resolved after the creation operation and the call to doAfterXXXCreate function
     */
    CreateController.prototype.create =  function() {
        var that = this;
        var defer = this.q.defer();
        if( this.canCreate() ) {
            this.doBeforeCreate();
            this.service.create( this.itemToCreate() )
                .then( function( result ) {
                    that.doAfterSuccessCreate( result );
                    defer.resolve( result );
                }, function( error ) {
                    that.doAfterFailCreate( error );
                     defer.reject( error );
                });
            return defer.promise;
        }
    };


    /**
     * Actions performed just before the creation operation
     */
    CreateController.prototype.doBeforeCreate = function() {
        // Nothing to do by default;
    }

    /**
     * Actions performed after the create operation has been successfully performed
     * @param result    The result of the creation operation
     */
    CreateController.prototype.doAfterSuccessCreate = function( result ) {
        this.createdItem( this.itemToCreate() );
        this.itemToCreate( {} );
    };

    /**
     * Actions performed after the create operation has been  performed with errors
     * @param result    The result of the creation operation
     */
    CreateController.prototype.doAfterFailCreate = function(  error ) {
        this.createdItem( {} );
    };

    /**
     * Get / Set the item to be create related to the itemToCreate scope variable
     * @param item  The item to set
     * @returns the value of the itemToCreate scope variable
     */
    CreateController.prototype.itemToCreate = function( item ) {
        if( item ) this.scope.itemToCreate = item;
        else return this.scope.itemToCreate;
    };

    /**
     * Get / Set the created related to the createdItem scope variable
     * @param item  The created item to set
     * @returns the value of the createdItem scope variable
     */
    CreateController.prototype.createdItem = function( item ) {
        if( item ) this.scope.createdItem = item;
        else return this.scope.createdItem;
    };

    ng.store( 'CreateController' , CreateController );

}) ( angular );