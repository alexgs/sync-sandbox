import Immutable from 'immutable';

const data = new WeakMap();

class Map {
    constructor() {
        data.set( this, Immutable.Map() );
    }

    set( key, value ) {
        const map = data.get( this );
        // TODO
    }
}

export default Map;
