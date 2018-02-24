// Source: http://nerds.intuo.io/2016/07/06/setup-cucumberjs-webdriverio-and-chai-js.html

import chai from 'chai';
import dirtyChai from 'dirty-chai';

chai.use( dirtyChai );

global.expect = chai.expect;
global.assert = chai.assert;
