var page = require('webpage').create(),
    i;
var fs = require('fs');

var outout = fs.open('domains2.txt', 'a');

function crawl(i) {
    var url = 'http://www.dl.ro/index/search/pageno/' + i;
    console.log(url);
    if (i > 3453) {
        phantom.exit();
    }
    page.open(url, function (status) {
        console.log(status);
        if (status == 'fail') {
            setTimeout(crawl.bind(this, i), 300000);
            console.log("Sleeping for 5 minutes.");
            return;
        }
        //BROWSER
        var results = page.evaluate(function () {
            var list = document.querySelectorAll('html body table tbody tr td table tbody tr td table tbody tr td table tbody tr td a'),
                pizza = [],
                i;
            for (i = 0; i < list.length; i++) {
                if (i % 3 == 2)
                    pizza.push(list[i].innerText);
            }
            return pizza;
        });
        //OUT OF BROWSER
       // var out = outout;
        for (var j = 0; j < results.length; ++j) {
            outout.writeLine(results[j]);
        }
        crawl(i + 1)
    });
}

crawl(0);