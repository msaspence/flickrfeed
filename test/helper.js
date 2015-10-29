global.React = require('react');
global.ReactDOM = require('react-dom');
global.TestUtils = require('react-addons-test-utils');

global.chai           = require('chai')
global.expect         = chai.expect;
global._              = require('rquery');
global.$R             = require('rquery')(global._, React);
sinon                 = require("sinon");
sinonChai             = require("sinon-chai");
chaiReact             = require('chai-react')

chai.use(sinonChai);
chai.use(sinonChai);

global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global.xhr            = new XMLHttpRequest();

