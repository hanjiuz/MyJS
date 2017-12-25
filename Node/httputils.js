//
// An "httputils" module for Node.
//

// Make an asynchronous HTTP GET request for the specified URL and pass the
// HTTP status, headers and response body to the specified callback function.
// Notice how we export this method through the exports object.
exports.get = function(url, callback) {  
    // Parse the URL and get the pieces we need from it
    url = require('url').parse(url);
    var hostname = url.hostname, port = url.port || 80;
    var path = url.pathname, query = url.query;
    if (query) path += "?" + query;


    /*
    //http.createClient() function is deprecated and removed.
    // Make a simple GET request
    var client = require("http").createClient(port, hostname);
    var request = client.request("GET", path, { 
        "Host": hostname    // Request headers
    }); 
    request.end();

    // A function to handle the response when it starts to arrive
    request.on("response", function(response) {
        // Set an encoding so the body is returned as text, not bytes
        response.setEncoding("utf8");
        // Save the response body as it arrives
        var body = ""
        response.on("data", function(chunk) { body += chunk; });
        // When response is complete, call the callback
        response.on("end", function() {
            if (callback) callback(response.statusCode, response.headers, body);
        });
    });
    */
    var http = require("http");
    var request = http.request(
        {
            hostname: hostname,
            port: port,
            path: path,
            method: "GET",
            headers: {
                Host: "www.baidu.com",
                Agent: "httputil from node!"
            }
        },
        (res) => {
            // Set an encoding so the body is returned as text, not bytes
            res.setEncoding("utf8");
            // Save the response body as it arrives
            var body = ""
            res.on("data", function(chunk) { body += chunk; });
            // When response is complete, call the callback
            res.on("end", function() {
                console.log("statusCode: ",res.statusCode);
                console.log("headers: ", res.headers);
                console.log("body:", body);

                if (callback) callback(res.statusCode, res.headers, body);
            });
        });
    request.on("error", function(error){
        console.log("error happened...", error);
    });
    request.end();

};

// Simple HTTP POST request with data as the request body
exports.post = function(url, data, callback) {
    // Parse the URL and get the pieces we need from it
    url = require('url').parse(url);
    var hostname = url.hostname, port = url.port || 80;
    var path = url.pathname, query = url.query;
    if (query) path += "?" + query;

    // Figure out the type of data we're sending as the request body
    var type;
    if (data == null) data = "";
    if (data instanceof Buffer)             // Binary data
        type = "application/octet-stream";
    else if (typeof data === "string")      // String data
        type = "text/plain; charset=UTF-8";
    else if (typeof data === "object") {    // Name=value pairs
        data = require("querystring").stringify(data);
        type = "application/x-www-form-urlencoded";
    }

    /*
    // http.createClient() is deprecated.
    // Make a POST request, including a request body
    var client = require("http").createClient(port, hostname);
    var request = client.request("POST", path, {
        "Host": hostname,       
        "Content-Type": type
    });
    request.write(data);                        // Send request body
    request.end();       
    request.on("response", function(response) { // Handle the response
        response.setEncoding("utf8");           // Assume it is text
        var body = ""                           // To save the response body
        response.on("data", function(chunk) { body += chunk; });
        response.on("end", function() {         // When done, call the callback
            if (callback) callback(response.statusCode, response.headers, body);
        });
    });
    */

    var http = require("http");
    var request = http.request(
        {
            hostname: hostname,
            port: port,
            path: path,
            method: "POST",
            headers: {
                Host: "www.baidu.com",
                "Content-Type": type,
                "Content-Length": data.length,
                Agent: "httputil from node!"
            }
        },
        (res) => {
            // Set an encoding so the body is returned as text, not bytes
            res.setEncoding("utf8");
            // Save the response body as it arrives
            var body = ""
            res.on("data", function(chunk) { body += chunk; });
            // When response is complete, call the callback
            res.on("end", function() {
                console.log("statusCode: ",res.statusCode);
                console.log("headers: ", res.headers);
                console.log("body:", body);

                if (callback) callback(res.statusCode, res.headers, body);
            });
        });
    request.on("error", function(error){
        console.log("error happened...", error);
    });
    request.write(data);
    request.end();


};
