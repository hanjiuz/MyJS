#! /usr/local/bin/node

//set a NODE_PATH to let node find httputils.js
var httputils = require("httputils");

//start test get


httputils.get("http://www.baidu.com/", function(status, headers, body) {
	console.log(status);
	console.log(headers);
	console.log(body);
});




//start test post

var postdata = {
	"un":"test@163.com",
	"pw":"htGfHEfIBxT1lrUfG8iY/zQcPlf8aNWjGaJe+cSaF6jMMYaAlKqpG2nlBaOb0ZO/cq70S8Jk91yk2BmFRdNFOU64s9aKao/8u0aaex+V0UKW5gsI7alpo1Uj6YNC0B8B4nXGnQhZ7it78zdNI4Yyk6ICCbF4+vjTWJac4u3Dp9Q=",
	"pd":"163",
	"l":0,
	"d":10,
	"t":1514214868443,
	"pkid":"MODXOXd",
	"domains":"163.com",
	"tk":"0131778a2e561c2333c79271f48e4d0e",
	"pwdKeyUp":0,
	"topURL":"http%3A%2F%2Fwww.163.com%2F"
};

httputils.post("https://dl.reg.163.com/src/mp-agent-finger.html?WEBZJVersion=1512468208810&pkid=MODXOXd&product=163", postdata, function(status, headers, body) {
	console.log(status);
	console.log(headers);
	console.log(body);	
});

