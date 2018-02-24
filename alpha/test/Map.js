import { Map } from '../index';

describe( 'A "map" object', function() {
    it( 'has a `set` function', function() {
        const map = new Map();
        expect( map.set ).to.be.ok();
        expect( map.set ).to.be.instanceOf( Function );
    } );
} );
