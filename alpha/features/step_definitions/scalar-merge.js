import { Given, Then, When } from 'cucumber';

Given( /"(.*)" is an empty Map$/, function( mapName ) {
    this.maps = this.maps || {};
    this.maps[ mapName ] = {};
    expect( this.maps[ mapName ] ).to.deep.equal( {} );
} );

When( /I call the set function "(.*)\.set\('(.*)', (\d*)\)"$/, function( mapName, key, value ) {
    value = parseInt( value );

    const map = this.maps[ mapName ];
    expect( map ).to.be.ok();
    expect( map.set ).to.be.ok();
    expect( map.set ).to.be.instanceOf( Function );

    map.set( key, value );
} );

Then( /(.*) deep-equals ({.*})$/, function( mapName, jsonString ) {
    const expectedMap = JSON.parse( jsonString );
    const map = this.maps[ mapName ];
    expect( map.toJson() ).to.deep.equal( expectedMap );
} );
