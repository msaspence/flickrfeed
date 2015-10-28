global.expect = require('chai').expect;
global.React = require('react');
global.TestUtils = require('react-addons-test-utils');

beforeEach(function(done) {
  delete document;
  delete window;
  delete navigator;
  delete HTMLElement;
  require('testdom')('<html><body></body></html>');
  done();
});
