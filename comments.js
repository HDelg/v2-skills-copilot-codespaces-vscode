//Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var comments = [];

var server = http.createServer(function(req, res) {
    var parsedUrl = url.parse(req.url);
    var parsedQuery = qs.parse(parsedUrl.query);
    var pathName = parsedUrl.pathname;
    if (pathName === '/index.html') {
        fs.readFile('./index.html', 'utf-8', function(err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else if (pathName === '/comment') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        if (req.method === 'POST') {
            var body = '';
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                var post = qs.parse(body);
                comments.push(post.comment);
                res.end(JSON.stringify(comments));
            });
        } else {
            res.end(JSON.stringify(comments));
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.write('404 Not Found');
        res.end();
    }
});

server.listen(3000);
console.log('Server is running at http://localhost:300