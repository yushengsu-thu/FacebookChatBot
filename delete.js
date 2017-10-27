var fs = require('fs');
var companyName = "3M"
var allCompanyInf = JSON.parse(fs.readFileSync('brandandcCompanyNews.json'), 'utf8');

var parsedJSON = allCompanyInf.filter(function(value){ return value.name == companyName;})
    var companyinformation = parsedJSON[0]
    parsedJSON = companyinformation.companyNews

    var parse1 = []
    console.log(parse1)
    /*Random*/
    //console.log(parsedJSON.length)
    function pickRandomProperty(obj) {
        var result;
        var count = 0;
        for (var prop in obj)
            if (Math.random() < 1/++count)
                result = prop;
        return result;
    }


    var parse1 = parsedJSON[pickRandomProperty(parsedJSON)]
    console.log(parse1)
    var title1 = parse1.title
    var link1 = parse1.newsLink
    var airticle1 = parse1.newsLink
    var date1 =  parse1.date
    var brief1 = parse1.brief
    var photo1 = parse1.airticlePhoto

    //console.log(companyName)
    //process.exit()
    //console.log(airticle1)//wrong
    //process.exit()
    //console.log(companyinformation.photoLink)
    //console.log(brief1)
    //console.log(date1)
    //console.log(photo1)
    //console.log(title1)
    //console.log(parse1)
    //process.exit(1)
