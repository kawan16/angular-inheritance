
( function( ng ) {

    function ReadController( $scope , ReadService ) {
        this.super( 'BaseController' ).apply( [ $scope ] );
        this.service = ReadService;
        this.q = ng.injector(['ng']).get('$q');

        this.readItem( {} );
    }

    ng.inherit().controller( ReadController , 'BaseController' );

    /**
     * @returns true if the read operation can be performed
     */
    ReadController.prototype.canRead = function() { return true;}

    /**
     * @returns the promise resolved after the read operation and the call to doAfterXXXRead function
     */
    ReadController.prototype.read =  function() {
        var defer = this.q.defer();
        if( this.canRead() ) {
            this.doBeforeRead();
            this.service.read( this.itemId )
                .then( function( result ) {
                    this.doAfterSuccessRead( result );
                    defer.resolve( result );
                }, function( error ) {
                    this.doAfterFailRead( error );
                    defer.reject( error );
                });
            return defer.promise;
        }
    };

    /**
     * Actions performed just before the read operation
     */
     ReadController.prototype.doBeforeRead = function() {
        // Nothing to do by default;
     }

    /**
     * Actions performed after the read operation has been successfully performed
     * @param result    The result of the read operation
     */
    ReadController.prototype.doAfterSuccessRead = function( result ) {
        this.readItem( result );
    };

    /**
     * Actions performed after the read operation has been  performed with errors
     * @param result    The result of the read operation
     */
    ReadController.prototype.doAfterFailRead = function(  error ) {
        this.readItem( {} );
    };

    /**
     * Get / Set the item id to be read related to the itemId scope variable
     * @param itemId The item id to set
     * @returns the value of the itemId scope variable
     */
    ReadController.prototype.itemId = function( itemId ) {
        if( itemId ) this.scope.itemId= itemId;
        else return this.scope.itemId;
    };

    /**
     * Get / Set the read related to the readItem scope variable
     * @param item  The read item to set
     * @returns the value of the readItem scope variable
     */
    ReadController.prototype.readItem = function( item ) {
        if( item ) this.scope.readItem = item;
        else return this.scope.readItem;
    };

    ng.store( 'ReadController' , ReadController );

}) ( angular );