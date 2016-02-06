# SMS Link

Simple SMS Link Builder

## Install

Include the Javascript file on the page.

## Usage

Include the javascript file on your page and call the init function.

```
smsLink.init();
```

By default any `<a>` tags that you include the data-number will be converted to a SMS friendly based on the device that is browsing.

```
<a href="/fallback-link-for-desktop" data-number="123-456-7890" data-message="A great message">Text Us</a>
```

## Options

You can configure some options for the SMS links:

```
smsLink.init({
  items: $('a.sms-link') //pass in a jquery selection of elements
});
```

## Credits

I used the device detection from: [https://github.com/jimbergman/devicever.js/blob/master/devicever.js](https://github.com/jimbergman/devicever.js/blob/master/devicever.js)

## Reference

I used the following guides in determining the logic for this library:

* [https://beradrian.wordpress.com/2010/01/15/special-links/](https://beradrian.wordpress.com/2010/01/15/special-links/)
* [http://weblog.west-wind.com/posts/2013/Oct/09/Prefilling-an-SMS-on-Mobile-Devices-with-the-sms-Uri-Scheme](http://weblog.west-wind.com/posts/2013/Oct/09/Prefilling-an-SMS-on-Mobile-Devices-with-the-sms-Uri-Scheme)

