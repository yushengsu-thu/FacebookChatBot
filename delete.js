var latestNews = require('./latestNews.json');
var fs = require('fs');
var Type = require('type-of-is');
console.log(Type(latestNews))
console.log(latestNews[0])
console.log(Type(latestNews[0]))
console.log("==================")

var latestNews = require('./latestNews_redirect.json');
var fs = require('fs');
console.log(Type(latestNews))
console.log(latestNews[0])
console.log(Type(latestNews[0]))
