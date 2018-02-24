import { Given, Then, When } from 'cucumber';

Given( /"(.*)" is an empty Map$/, function( map ) {
    this[ map ] = {};
    expect( this[ map ] ).to.deep.equal( {} );
} );
