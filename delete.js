/*
var fs = require('fs');
var companyName = "3M"
var allCompanyInf = JSON.parse(fs.readFileSync('brandandcCompanyNews.json'), 'utf8');

var parsedJSON = allCompanyInf.filter(function(value){ return value.name == companyName;})
    var companyinformation = parsedJSON[0]
    parsedJSON = companyinformation.companyNews

    var parse1 = []
    console.log(parse1)
    
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
*/
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

/*excute fun*/
//var date = new Date.getTime()
/*
function  myfunc(){
    console.log("myfunc  "+"when");
}
*/
/*interval time*/
/*
setInterval(myfunc,1000);
*/
/*trigger*/
/*
function active(){
    console.log(myInterval);
}
*/

/*
function  stop(){
    clearTimeout(myInterval);
 //myInterval.unref();
}
*/
/*stop activing after 5s*/
//setTimeout(active,5000);
var moment = require('moment');
var date = "2017-10-26"
//var airticleDate = moment(date, "YYYY-MM-DD")
//console.log(airticleDate)
if(dayDiff(moment(date,"YYYY-MM-DD")))

function dayDiff(airticleDate){
    var nowEnd = moment();
    var nowStart = moment();
    var endDate = nowEnd.add(1,'days')
    var startDate = nowStart.subtract(7,'days')
    //var endDate = moment.add(1,'days')
    //var startDate = moment.subtract(7,'days')
    console.log(airticleDate,endDate)
    console.log(airticleDate.isBefore(endDate))
    console.log(airticleDate,startDate)
    console.log(airticleDate.isAfter(startDate))
    return airticleDate.isBefore(endDate) && airticleDate.isAfter(startDate)
}
//var dayDiff = now.diff(startDate, 'DD')
//console.log(dayDiff)

