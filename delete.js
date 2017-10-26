const allCompanyInf = require('./brandandcCompanyNews.json');
var parsedJSON = allCompanyInf.filter(function(value){ return value.name=="3M";})

parsedJSON = parsedJSON[0].companyNews
console.log(parsedJSON.length)
function pickRandomProperty(obj) {
        var result;
        var count = 0;
        for (var prop in obj)
            if (Math.random() < 1/++count)
                result = prop;
        return result;
}
var parse2 = parsedJSON[pickRandomProperty(parsedJSON)]
var title2 = parse2.title
var link2 = paser2.newsLink
var airticle2 = paser2.newsLink
var photo2 = paser2.airticlePhoto
var date2 = paser2.date
var brief2 = paser2.brief
//var title1 = parsedJSON[Math.floor(Math.random()*parsedJSON.length)];
//console.log(typeof(title1.title))
//console.log(title1.title)
console.log(title2)

