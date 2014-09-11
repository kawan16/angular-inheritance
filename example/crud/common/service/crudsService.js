
( function( ng ) {

    function CrudsService( $q ) {
        this.super('BaseService').apply( this );
        this.q = $q;
    }

    ng.inherit().service( CrudsService , 'BaseService');

    CrudsService.prototype.create = function( itemToCreate ) {
        this.log('CrudsService is creating an item ' );
        var defer = $q.defer();
        defer.resolve({});
        return defer.promise;
    };

    CrudsService.prototype.read = function( itemId ) {
        this.log('CrudsService is reading an item ');
        var defer = $q.defer();
        defer.resolve({});
        return defer.promise;
    };

    CrudsService.prototype.update = function( itemToUpdate ) {
        this.log('CrudsService is updating an item ' );
        var defer = $q.defer();
        defer.resolve({});
        return defer.promise;
    }

    CrudsService.prototype.delete = function( itemToDelete ) {
        this.log('CrudsService is deleting an item ');
        var defer = $q.defer();
        defer.resolve({});
        return defer.promise;
    }

    CrudsService.prototype.search = function( filter ) {
        this.log('CrudsService is searching items ' );
        var defer = $q.defer();
        defer.resolve( [ ]);
        return defer.promise;
    }




});