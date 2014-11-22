
( function( ng , appName ) {

    function FruitCrudsService( ) {
        this.super( 'CrudsService' ,  arguments );

        this.fruits = [
            {
                id: '1',
                name:"Apple" ,
                designation:"The apple is the pomaceous fruit of the apple tree, Malus domestica of the rose family (Rosaceae)."
            },
            {
                id:'2',
                name:"Banana" ,
                designation:"A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa."
            },
            {
                id:'3',
                name:"Orange" ,
                designation:"The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus x sinensis in the family Rutaceae."
            }
        ];
    }

    ng.inherit( 'FruitCrudsService' , FruitCrudsService).from( 'CrudsService' );

    // Overriding

    FruitCrudsService.prototype.create = function( itemToCreate ) {
        var defer = this.q.defer();
        itemToCreate.id = Math.random();
        this.fruits.push( itemToCreate );
        defer.resolve();
        return defer.promise;
    };

    FruitCrudsService.prototype.search = function( filter ) {
        var defer = this.q.defer();
        var service = ng.injector(['ng']).get('$filter');
        defer.resolve( service('filter')( this.fruits , { name: filter } ) );
        return defer.promise;
    };

    ng.module( appName ).service( 'FruitCrudsService' , FruitCrudsService );


}) ( angular , 'CrudDemo');