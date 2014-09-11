
( function( ng , appname ) {

    function ChildService( $log ) {

       this.save = function( itemToSave ) {
            $log.info('Level 1 - A child service saves the world and ' + JSON.stringify( itemToSave ) );
       };
    }

    ng.module(appname).service('ChildService', ChildService );

}) ( angular , 'Demo');
