var request = require('request')
    , sys = require('sys')
    , jsdom = require('jsdom');

// Will this 1337 hax0rs get me into the Neck Beard Society?
var chromeUserAgent = "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.X.Y.Z Safari/525.13.";

var getText = function(minWordCount) {
    minWordCount = minWordCount || 10;

    var worker = function() {
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
                            
                            cb(paragraph.text());
                        });
                    } else {
                        sys.puts("Error retrieving url [" + response.statusCode + "]");
                    }
                });
    };

    var text = worker();

    if (text.split(" ").length >= minWordCount) {
        return text;
    } else {
        getText(minWordCount);
    }
}


p1 = getText(10);
p2 = getText(50);

console.log(p1.text());
console.log(p2.text());
