global.chai           = require('chai')
global.expect         = chai.expect;
sinon                 = require("sinon");
sinonChai             = require("sinon-chai");
chai.use(sinonChai);
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global.xhr            = new XMLHttpRequest();

global.React = require('react');
global.ReactDOM = require('react-dom');
global.TestUtils = require('react-addons-test-utils');

beforeEach(function(done) {
  delete document;
  delete window;
  delete navigator;
  delete HTMLElement;
  require('testdom')('<html><body></body></html>');
  done();
});
