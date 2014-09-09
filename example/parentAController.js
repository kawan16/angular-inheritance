
( function( ng ) {

    function ParentAController( $scope , $log  ) {
        this.super('BaseController', [ $scope ] );
        this.log = $log;
        this.scope.doA = ng.bind( this , this.doA );
    }

    ng.inherit().controller(ParentAController,'BaseController');

    ParentAController.prototype.doA = function() {
        this.log.info('Level 0 - Parent A Controller is doing...');
    };

    ng.store( 'ParentAController' , ParentAController  );


}) ( angular );