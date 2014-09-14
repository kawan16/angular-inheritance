
( function( ng , appName ) {

    function FruitCrudsService( ) {
        this.super( 'CrudsService' ,  arguments );

        this.fruits = [
            {
                name:"Apple" ,
                designation:"The apple is the pomaceous fruit of the apple tree, Malus domestica of the rose family (Rosaceae)."
            },
            {
                name:"Banana" ,
                designation:"A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa."
            },
            {
                name:"Orange" ,
                designation:"The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus x sinensis in the family Rutaceae."
            }
        ];
    }

    ng.inherit().service( FruitCrudsService , 'CrudsService');

    // Overriding
    FruitCrudsService.prototype.search = function( filter ) {
        this.log.info('FruitsCrudsService is searching items ' );
        var defer = this.q.defer();
        var service = ng.injector(['ng']).get('$filter');
        defer.resolve( service('filter')( this.fruits , { name: filter } ) );
        return defer.promise;
    };

    ng.module( appName ).service( 'FruitCrudsService' , FruitCrudsService );


}) ( angular , 'CrudDemo');