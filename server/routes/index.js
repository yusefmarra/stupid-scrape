var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');



router.get('/', function(req, res, next) {
    request('https://news.ycombinator.com', function(err, response, html) {
        if(!err && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var titles = $('td.title a');
            var js = [];
            var py = [];
            var output = [];
            [].forEach.call(titles, function(el) {
                if ($(el).text().match(/javascript/) || $(el).text().match(/js/)) {
                    js.push($(el).text());
                }
            });
            [].forEach.call(titles, function(el) {
                if ($(el).text().match(/python/) || $(el).text().match(/py/)) {
                    py.push($(el).text());
                }
            });
            request('https://www.reddit.com/r/Web_Development/', function(err, response, html) {
               if(!err && response.statusCode == 200) {
                   var $ = cheerio.load(html);
                   var titles = $('a.title');
                   var output = [];
                   [].forEach.call(titles, function(el) {
                       if ($(el).text().match(/js/) || $(el).text().match(/javascript/)) {
                           js.push($(el).text());
                       }
                   });
                   [].forEach.call(titles, function(el) {
                       if ($(el).text().match(/python/) || $(el).text().match(/py/)) {
                           py.push($(el).text());
                       }
                   });

                   if (js.length == 0) {
                       res.send(py);
                   } else {
                       res.send(js);
                   }
               }
            });
        }
    });
});

module.exports = router;
