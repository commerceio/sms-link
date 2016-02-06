/* globals window, document, navigator */
(function(window, document, navigator) {
  'use strict';

  var smsLink = {
    //refactored from
    //https://github.com/jimbergman/devicever.js/blob/master/devicever.js
    detectDevice: function(ua) {
      if (!ua) {
        ua = navigator.userAgent;
      }
      var device = {
        device: null,
        os: null,
        version: null,
      };
      var uaindex;
      if (ua.match(/iPad/i)) {
        device.device = 'iPad';
        device.os = 'ios';
        uaindex = ua.indexOf('OS ');
      } else if (ua.match(/iPod/i)) {
        device.device = 'iPod';
        device.os = 'ios';
        uaindex = ua.indexOf('OS ');
      } // must come before iPhone line
      else if (ua.match(/iPhone/i)) {
        device.device = 'iPhone';
        device.os = 'ios';
        uaindex = ua.indexOf('OS ');
      } else if (ua.match(/Android/i)) {
        device.device = 'Android';
        device.os = 'android';
        uaindex = ua.indexOf('Android ');
      } else {
        device.device = 'unknown';
        device.os = false;
      }

      if (device.os === 'ios' && uaindex > -1) {
        device.version = parseInt(ua.substr(uaindex + 3, 3).replace('_', '.'));
      } else if (device.os === 'android') {
        device.version = parseInt(ua.substr(uaindex + 8, 3));
      } else {
        device.version = false;
      }
      return device;
    },
    parse: function(linkElement) {
      var data = {
        number: linkElement.getAttribute('data-number'),
        message: linkElement.getAttribute('data-message'),
      };
      return data;
    },
    buildLink: function(linkElement, device) {
      var delemiter = '?';
      var data = smsLink.parse(linkElement);
      if (device.os === 'ios') {
        delemiter = '&';
        if (device.version < 8) {
          delemiter = ';';
        }
      }
      return ['sms:', data.number, delemiter, 'body=', encodeURI(data.message)].join('');
    },
    setLink: function(linkElement, device) {
      linkElement.href = smsLink.buildLink(linkElement, device);
      return linkElement;
    },
    init: function(options) {
      if (!options) {
        options = {
          items: false
        };
      }
      if (!options.items) {
        options.items = document.querySelectorAll('[data-number]');
      }
      var device = smsLink.detectDevice(navigator.userAgent);
      if (device.device === 'unknown') {
        return false;
      }
      var itemCount = options.items.length;
      for (var i = 0; i < itemCount; i += 1) {
        smsLink.setLink(options.items[i], device);
      }
    }
  };

  window.smsLink = smsLink;

})(window, document, navigator);
