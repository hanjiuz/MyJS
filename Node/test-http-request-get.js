

var http = require("http");



var options = {
	hostname : "www.baidu.com",
	port : 80,
	path : "/",
	method : "GET",
	headers : {
		Host : "www.baidu.com",
		Agent : "test-httputils app"
	}
};

/*
//use lambda style code to replace function, just use "res"
var request = http.request(options, (res) => {
	res.setEncoding("utf8");
	var body = "";
	res.on("data", function(chunk) {
		body += chunk;
	});
	res.on("end", function(){
		console.log(res.statusCode);
		console.log(res.headers);
		console.log(body);
		console.log("response end!");
	});
});
*/


//use anoymous function
var request = http.request(options, function(res) {
	res.setEncoding("utf8");
	var body = "";
	res.on("data", function(chunk) {
		body += chunk;
	});
	res.on("end", function(){
		console.log(res.statusCode);
		console.log(res.headers);
		console.log(body);
		console.log("response end!");
	});
});

/*
var client = http.createClient(80, "www.baidu.com");
var request = client.request("GET", "/", {"Host": "www.baidu.com"});

request.on("response", function(resposne) {
	resposne.setEncoding("utf8");
	var body = "";
	response.on("data", function(chunk) {
		body += chunk;
	});
	response.on("end", function(){
		console.log(response.statusCode);
		console.log(response.headers);
		console.log(body);
		console.log("response end!");
	});
});
*/

request.on("error", function(error){
	console.log("error happened!", error);
});
//request.write();
request.end();

