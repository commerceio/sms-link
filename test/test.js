/* globals window, chai, it, describe */

var expect = chai.expect;
var should = chai.should();

//fixtures
var aTag = window.document.getElementById('test-link');

describe('smsLink', function() {
  it('expect smsLink to be defined', function() {
    expect(window.smsLink).to.be.a('object');
  });
});

describe('detectDevice', function() {
  var examples = [{
    case: 'iPad; CPU OS 7_0  37.53',
    os: 'ios',
    version: 7
  }, {
    case: 'iPhone; CPU iPhone OS 8_0_1  36.25',
    os: 'ios',
    version: 8
  }, {
    case: 'Linux; U; Android 4.0.3; 0',
    os: 'android',
    version: 4
  }, ];
  it('should detect and set the OS', function() {
    var result = '';
    for (var i = 0; i < examples.length; i += 1) {
      result = window.smsLink.detectDevice(examples[i].case);
      expect(result.os).to.eql(examples[i].os);
    }
  });
  it('should detect and set the version', function() {
    var result = '';
    for (var i = 0; i < examples.length; i += 1) {
      result = window.smsLink.detectDevice(examples[i].case);
      expect(result.version).to.eql(examples[i].version);
    }
  });
});

describe('parse', function() {
  var result = window.smsLink.parse(aTag);

  it('should read the data-number attribute', function() {
    expect(result.number).to.eql('19876543210');
  });
  it('should read the data-message attribute', function() {
    expect(result.message).to.eql('A great message');
  });
});

describe('buildLink', function() {
  it('should return an valid iOS < 8 link', function() {
    var devise = {
      os: 'ios',
      version: 7
    };
    var result = window.smsLink.buildLink(aTag, devise);
    expect(result).to.eql('sms:19876543210;body=A%20great%20message');
  });
  it('should return an valid iOS >= 8 link', function() {
    var devise = {
      os: 'ios',
      version: 8
    };
    var result = window.smsLink.buildLink(aTag, devise);
    expect(result).to.eql('sms:19876543210&body=A%20great%20message');
  });
  it('should return an valid Andriod link', function() {
    var devise = {
      os: 'Andriod',
      version: 1
    };
    var result = window.smsLink.buildLink(aTag, devise);
    expect(result).to.eql('sms:19876543210?body=A%20great%20message');
  });
});

describe('setLink', function() {
  it('should set the href of the link', function() {
    var devise = {
      os: 'Andriod',
      version: 1
    };
    var link = window.document.getElementById('test-set-link');
    var result = window.smsLink.setLink(link, devise);
    expect(result.href).to.eql('sms:19876543210?body=A%20great%20message');
  });
});
