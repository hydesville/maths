// (C) RUHAAN KADRI 2019

const http = require('http');
const url = require('url');
const filesystem = require('fs');

http.createServer(function (request, response) {
    const path = decodeURI(url.parse(request.url).path.split("?")[0]);

    if (path === "/") {
        response.end(filesystem.readFileSync("./index.html"));
    } else {
        if (filesystem.existsSync("." + path)) response.end(filesystem.readFileSync("." + path), 'binary');
    }
}).listen(8080, () => { console.log("\x1b[42mSUCCESS\x1b[0m Server successfully started on port 8080") });