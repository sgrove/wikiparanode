var request = require('request')
    , sys = require('sys')
    , jsdom = require('jsdom');

// Will this 1337 hax0rs get me into the Neck Beard Society?
var chromeUserAgent = "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.X.Y.Z Safari/525.13.";

request({
    uri:'http://en.wikipedia.org/wiki/Special:Random',
    headers: {"User-Agent": chromeUserAgent}
},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var window = jsdom.jsdom(body).createWindow();
                jsdom.jQueryify(window, 'lib/jquery-1.4.2.min.js', function (window, $) {
                    // jQuery is now loaded on the jsdom window created from 'body'
                    var paragraphs = $("#content p");
                    var index = Math.round(Math.random() * paragraphs.length);
                    var paragraph = $(paragraphs[index]);
                    
                    console.log(paragraph.text());
                    $('.someClass').each(function () { /* Your custom logic */ });
                });
            } else {
                sys.puts("Error retrieving url [" + response.statusCode + "]");
            }
        });
