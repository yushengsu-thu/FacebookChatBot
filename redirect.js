'use strict'

const axios = require('axios')
const fs = require('fs');
//var file = require('fs');
var jsonfile = require('jsonfile')
var array=[]
var async = require("async");

var allCompanyNews=JSON.parse(fs.readFileSync("latestNews.json"), 'utf8');

doRedirect()

function doRedirect(){
    var counter=0
    allCompanyNews.forEach(function(news){
        counter++
        redirect(news.title,news.newsLink,news.airticlePhoto,news.brief,news.date,counter,allCompanyNews.length)
    })
}



function redirect(title,newsLink,airticlePhoto,brief,date,counter,length){
    
    axios({
        url:"http://192.168.1.131/api/v1/Redirector/short_code/",
        method:'POST',
        headers:{"Pragma-T":"e8c62ed49e57dd734651fad21bfdaf40"},
        responseType:"application/json",
        data:{
            url:newsLink,
            title:title
        }
    }).then(function(response){
        
        array.push({
            "title":title,
            "newsLink":response.data.shorten_url,
            "airticlePhoto":airticlePhoto,
            "brief":brief,
            "date":date
        });

        console.log(length,counter)
        //console.log(array)
        if(counter == length)
            console.log(array)
            jsonfile.writeFile('latestNews_redirect.json',array,function(err){
                if(err){
                    return console.log("error")
                }
                console.log("save")
            });

    }).catch(function(error){
        console.log(error) 
    })
}


