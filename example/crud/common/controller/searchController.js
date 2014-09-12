
( function( ng ) {

    function SearchController( $scope , SearchService ) {
        this.super( 'BaseController' ).apply( [ $scope ] );
        this.service = SearchService;
        this.q = ng.injector(['ng']).get('$q');

        this.searchedItems( [] );
    }

    ng.inherit().controller( SearchController , 'BaseController' );

    /**
     * @returns true if the search operation can be performed
     */
    SearchController.prototype.canSearch = function() { return true;}

    /**
     * @returns the promise resolved after the search operation and the call to doAfterXXXSearch function
     */
    SearchController.prototype.search =  function() {
        var defer = this.q.defer();
        if( this.canSearch() ) {
            this.doBeforeSearch();
            this.service.search( this.filter )
                .then( function( result ) {
                    this.doAfterSuccessSearch( result );
                    defer.resolve( result );
                }, function( error ) {
                    this.doAfterFailSearch( error  );
                    defer.reject( error );
                });
            return defer.promise;
        }
    };

    /**
     * Actions performed just before the search operation
     */
     ReadController.prototype.doBeforeSearch = function() {
        // Nothing to do by default;
     }

    /**
     * Actions performed after the search operation has been successfully performed
     * @param result    The result of the search operation
     */
    SearchController.prototype.doAfterSuccessSearch = function( result ) {
        this.searchedItems( result );
    };

    /**
     * Actions performed after the search operation has been  performed with errors
     * @param result    The result of the search operation
     */
    SearchController.prototype.doAfterFailSearch = function(  error ) {
        this.searchedItems( {} ) ;
    };

    /**
     * Get / Set the filter used for thesearch related to the filter scope variable
     * @param itemId The filter to set
     * @returns the value of the filter scope variable
     */
    SearchController.prototype.itemId = function( filter ) {
        if( filter ) this.scope.filter = filter;
        else return this.scope.filter;
    };

    /**
     * Get / Set the searched items  related to the searchedItem scope variable
     * @param item  The search item to set
     * @returns the value of the searchItem scope variable
     */
    SearchController.prototype.searchedItems = function( items ) {
        if( items ) this.scope.searchedItems = items;
        else return this.scope.searchedItems;
    };

    ng.store( 'SearchController' , SearchController );

}) ( angular );