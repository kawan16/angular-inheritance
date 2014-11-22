
( function( ng ) {

    function CrudsService(  ) {
        this.super('BaseService');
        this.q = ng.injector(['ng']).get('$q');
    }

    ng.inherit( 'CrudsService' , CrudsService ).from( 'BaseService' );

    CrudsService.prototype.create = function( itemToCreate ) {
        this.log.info('CrudsService is creating an item ' );
        var defer = this.q.defer();
        defer.resolve({});
        return defer.promise;
    };

    CrudsService.prototype.read = function( itemId ) {
        this.log.info('CrudsService is reading an item ');
        var defer = this.q.defer();
        defer.resolve({});
        return defer.promise;
    };

    CrudsService.prototype.update = function( itemToUpdate ) {
        this.log.info('CrudsService is updating an item ' );
        var defer = this.q.defer();
        defer.resolve({});
        return defer.promise;
    };

    CrudsService.prototype.delete = function( itemToDelete ) {
        this.log.info('CrudsService is deleting an item ');
        var defer = this.q.defer();
        defer.resolve({});
        return defer.promise;
    };

    CrudsService.prototype.search = function( filter ) {
        this.log.info('CrudsService is searching items ' );
        var defer = this.q.defer();
        defer.resolve( [ ]);
        return defer.promise;
    };


}) (angular);