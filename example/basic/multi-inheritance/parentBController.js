
( function( ng ) {

    function ParentBController( $scope , $log  ) {
        this.super('BaseController', [ $scope ] );
        this.log = $log;
        this.scope.doB = ng.bind( this , this.doB );
    }

    ng.inherit( 'ParentBController' , ParentBController ).from( 'BaseController' );

    ParentBController.prototype.doB = function() {
        this.log.info('Level 0 - Parent B Controller is doing...');
    };

}) ( angular );