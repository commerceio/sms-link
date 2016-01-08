/* globals window, chai, it, describe */

var expect = chai.expect;
var should = chai.should();

describe('Test', function() {
  it('expect smsLink to be defined', function() {
    expect(window.smsLink).to.be.a('function');
  });
});
