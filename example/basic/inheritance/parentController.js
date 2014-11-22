
( function( ng  ) {

    function ParentController( $scope , $log , Service  ) {
        this.super('BaseController', [ $scope ] );
        this.log = $log;
        this.service = Service;
        this.bind();
    }

    ng.inherit( 'ParentController' , ParentController ).from( 'BaseController' );

    ParentController.prototype.save = function() {
        this.log.info('Level 0 - Parent Controller is saving data...');
        this.service.save( this.data() );
    };

    ParentController.prototype.data = function() {
        if( arguments.length === 0 ) {
            return this.scope.data;
        }
        else {
            this.scope.data = arguments[0];
        }
    };

    ParentController.prototype.bind = function() {
        this.scope.save = ng.bind( this , this.save );
    };

}) ( angular );