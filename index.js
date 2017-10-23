//Fix bug:
//1.沒有公司資料時，不用再“更多”
//Once tyoe subscribe will be see as subscribe
//subscribeAirticle modify default: ['Facebook',,,,,] to []]
'use strict'
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))


// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', function(req, res) {
    res.send("Hi I am a chatbot")
})

const token = "EAAZAznrny0WQBAGS2QyDpFqwxtuZBdQcr4ikXAfAXcZCbXFfuv6WMDdZApJa8OYNfpdxHb3C7ZCD7ZCY2CGZBCApLChUalh4z6zifVcNjtn0kE9K1DQ9kABZBZAZCy1ZCu2sFHjixbehr4lrQ4l9se8FfPfBqkWRwNHZCt3jwHHnhwKZAcGWwZBffHwgIR"

// Facebook

app.get('/webhook/', function(req, res) {
    //Callback URL:ngrok http 5000  token:FacebookChatBot
    if (req.query['hub.verify_token'] === "FacebookChatBot") { //FacebookChatBot
        return res.send(req.query['hub.challenge'])
    }
    res.send("Wrong token")
})

/*Function need*/
var fs = require('fs');
var companyList = JSON.parse(fs.readFileSync(String('brands_and_photos.json'), 'utf8'));
const companyNameList = Object.keys(companyList);
/*Gobal variable*/

app.post('/webhook/', function(req, res) {
    var event_entry = req.body.entry[0];
    //Received events
    //process.exit(1);
    console.log(event_entry)
    console.log("====================")
    //console.log(event_entry.messaging)
    console.log("====================")
    if(event_entry.messaging){
        //console.log("inininin")
        var messaging_events = event_entry.messaging;
        //console.log("-")
        //console.log("out")
        //console.log(messaging_events);
        //console.log("-")
        for (var i = 0; i < messaging_events.length; i++) {
            var event = messaging_events[i];
            var sender = event.sender.id;

            //    
            //console.log("-")
            //console.log("out")
            //console.log(event);
            //console.log("-")
            //
            /*button*/
            if(event.postback){
                switch (event.postback.title) {
                    case "瀏覽文章":
                        browseAirticle(sender, "Text echo: 瀏覽文章")
                        break;
                    case "訂閱文章": 
                        subscribeAirticle(sender, "Text echo: 訂閱文章")
                        break;
                    case "回首頁":
                        backHome(sender, "Text echo: 回首頁")
                        break;
                    case "美股清單":
                        checkStocklist(sender, "Text echo: 美股清單", 0)
                        break;    
                    case "訂閱管理":
                        subscribeManagement_show_and_modify(sender, "Text echo: 訂閱管理", "subscribeList")
                        break;
                    default:
                        break;
                }
            }
            /*
            /*text button*/
            else if(event.message.text && event.message.quick_reply){
                switch(event.message.quick_reply.payload){
                    case "checkStocklist":
                        if(event.message.text == "更多:1"){
                            checkStocklist(sender,"Text echo: 更多公司資訊",1)
                        }
                        if(event.message.text == "更多:2"){
                            checkStocklist(sender,"Text echo: 更多公司資訊",2)
                        }
                        if(event.message.text == "更多:3"){
                            checkStocklist(sender,"Text echo: 更多公司資訊",3)
                        }
                        else{
                            //Open text link and subscribe function!!
                        }
                        break;
                    case "subscribeManagement_show_and_modify":
                        subscribeManagement_show_and_modify(sender, String("Text echo: "+event.message.text), event.message.text)
                        break;
                        //case "":
                        //    break;
                    default:
                        break;
                }
            }
            /*nlp text*/
            else if(event.message.text){
                //console.log("-")
                //console.log("nlp")
                //console.log("-")
                backHome(sender, "Text echo: 回首頁")
            }
            /*Noisy*/
            else{
                //console.log("==++==")
                //console.log("nosiy")
                //console.log(event)
                //console.log(event.messages)
                //console.log("==++==")
            }

            //process.exit(1);
        }
    }
    res.sendStatus(200)
})


////////////////////////////////////////////
////////////////////////////////////////////
function subscribeManagement_show_and_modify(sender, text, subscribeCompany){
    
    /*Fetch user subscribeUser_inf*/
    var subscribeCompany_list=[]; 
    var messageData={};
    var subscribeUser_inf = {};// 
    var resetUser=[];//

    axios({
        method: 'GET',
        url: 'http://192.168.1.131/trista/v1/FBuser/user/'+sender,
        headers: {"Pragma-T": "e8c62ed49e57dd734651fad21bfdaf40"},
        responseType:"application/json"
    }).then(function(response) {
        /*Fetch user subscribeUser_inf*/
        subscribeUser_inf = response.data.data.data
        var subscribeCategory =  subscribeUser_inf.subscribeCategory

        console.log("Fetch user subscribe information");
        /*text:company*/
        subscribeCategory.forEach(function(value){
            subscribeCompany_list.push({ 
                content_type:"text",
                title:value,
                payload:"subscribeManagement_show_and_modify",
            })
        });

        /*subscribe list show and modify*/
        if(subscribeCompany=="subscribeList"){
            subscribeCompany_list.push({
                content_type:"text",
                title:"完成", //use payload to change page
                payload:"subscribeManagement_show_and_modify",
            })
            messageData = {
                text:"請選擇欲取消訂閱之主題，完成後請點選'完成'",
                quick_replies:subscribeCompany_list
            }
            /*Facebook API:subscribe content*/
            request({
                url: "https://graph.facebook.com/v2.6/me/messages",
                qs : {access_token: token},
                method: "POST",
                json: {
                    recipient: {id: sender},
                    message : messageData,
                }
            }, function(error, response, body) {
                if (error) {
                    console.log("sending error")
                } else if (response.body.error) {
                    //console.log(response.body)
                    console.log(response.body.error);
                }
            })
        } 
        else if(subscribeCompany=="完成"){
            backHome(sender, "Text echo: 完成") //
        }
        /*subscribe list updates:text*/
        else{
            subscribeCompany_list.forEach(function(value){
                resetUser.push(value.title)
            });
            var nth_element = resetUser.indexOf(subscribeCompany);
            resetUser.splice(nth_element,1);

            axios({
                method: 'PUT',
                url: 'http://192.168.1.131/trista/v1/FBuser/user/',
                //data: user_inf,
                data:{
                    id:sender,
                    data:{
                        first_name: subscribeUser_inf.first_name,
                        last_name: subscribeUser_inf.last_name,
                        profile_pic: subscribeUser_inf.profile_pic,
                        locale: subscribeUser_inf.locale,
                        timezone: subscribeUser_inf.timezone,
                        gender: subscribeUser_inf.gender,
                        subscribeCategory: resetUser
                    }
                },
                headers: {"Pragma-T": "e8c62ed49e57dd734651fad21bfdaf40"},
                responseType:"application/json"
            }).then(function(response) {
                console.log("User subscribe has been change!");
            }).catch(function(error){
                console.log("PUT! Error: User data has been existed");
            });

            /*Update subscribeList*/
            subscribeCompany_list = []
            resetUser.forEach(function(value){
                subscribeCompany_list.push({ 
                    content_type:"text",
                    title:value,
                    payload:"subscribeManagement_show_and_modify",
                })
            });
            /*modify the subscribe list*/ 
            subscribeCompany_list.push({
                content_type:"text",
                title:"完成", //use payload to change page
                payload:"subscribeManagement_show_and_modify",
            })
            messageData = {
                text:"請選擇欲取消訂閱之主題，完成後請點選'完成'",
                quick_replies:subscribeCompany_list
            }
            /*Facebook API:subscribe content*/
            request({
                url: "https://graph.facebook.com/v2.6/me/messages",
                qs : {access_token: token},
                method: "POST",
                json: {
                    recipient: {id: sender},
                    message : messageData,
                }
            }, function(error, response, body) {
                if (error) {
                    console.log("sending error")
                } else if (response.body.error) {
                    //console.log(response.body)
                    console.log(response.body.error);
                }
            })
        }
    }).catch(function(error){
        console.log("GET request error");
    });
}


function checkStocklist(sender, text, part){
    var fs = require('fs');
    var brands_and_photos = JSON.parse(fs.readFileSync(String('brands_and_photos_p'+part+'.json'), 'utf8'));

    var data=[]; 
    for(var key in brands_and_photos){
        data.push({ 
            content_type:"text",
            title:key,
            image_url:brands_and_photos[key],
            payload:"checkStocklist"
        })
    } 
    //更多 選項
    part = part+1
    if(part < 4){
        data.push({
            content_type:"text",
            title:String("更多:"+part), //use payload to change page
            payload:"checkStocklist"
        })
    }

    var conversation;
    if(part!=0){
        conversation="更多公司資訊";    
    }
    else{
        conversation="我們列出部分美股如下，你也可以點選'更多'來找尋你感興趣的公司" 
    }
    var messageData = {
        text: conversation,
        quick_replies:data
    }

    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs : {access_token: token},
        method: "POST",
        json: {
            recipient: {id: sender},
            message : messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log("sending error")
        } else if (response.body.error) {
            console.log(response.body.error);
        }
    })
}
//////

//////
//////
function subscribeAirticle(sender, text){
    /*Fectch the user data*/
    request({
        url: "https://graph.facebook.com/v2.6/"+sender+"?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token="+token,
        qs : {access_token: token},
        method: "GET", 
    }, function(error, response, body) {
        if (error) {
            console.log("sending error")
        } else if (response.body.error) {
            console.log("response body error")
        }

        console.log("==========================")
        const content = JSON.parse(body);
        //const user_inf = JSON.stringify(content);

        /*Check the user if exist in the list and saved user data*/ 
        axios({
            method: 'POST',
            url: 'http://192.168.1.131/trista/v1/FBuser/user/',
            //data: user_inf,
            data:{
                id:sender,
                data:{
                    first_name: content.first_name,
                    last_name: content.last_name,
                    profile_pic: content.profile_pic,
                    locale: content.locale,
                    timezone: content.timezone,
                    gender: content.gender,
                    //subscribeCategory: [] //Default: news , random
                    subscribeCategory: ["AT&T","3M","Facebook"] //Default: news , random
                }
            },
            headers: {"Pragma-T": "e8c62ed49e57dd734651fad21bfdaf40"},
            responseType:"application/json"
        }).then(function(response) {
            //console.log(response) 
            console.log("User data was saved!");
        }).catch(function(error){
            console.log("User data has Existed!");
        });
    })
}

function browseAirticle(sender, text) {  //browseAirticle ==> sendMessage
    /*Read a Links.json*/
    /*Synchronous version*/
    var fs = require('fs');
    var links = JSON.parse(fs.readFileSync('links.json', 'utf8'));

    /*Asynchronous version*/
    /*=====================*/
    //var messageData = {text: text}
    var parsedJSON = require('./links.json');
    function pickRandomProperty(obj) {
        var result;
        var count = 0;
        for (var prop in obj)
            if (Math.random() < 1/++count)
                result = prop;
        return result;
    }
    var title1 = pickRandomProperty(parsedJSON)
    var link1 = parsedJSON[title1]
    var airticle1 = link1[0]
    var photo1 = link1[1]
    var title2 = pickRandomProperty(parsedJSON)
    var link2 = parsedJSON[title2]
    var airticle2 = link2[0]
    var photo2 = link2[1]
    var title3 = pickRandomProperty(parsedJSON)
    var link3 = parsedJSON[title3]
    var airticle3 = link3[0]
    var photo3 = link3[1]
    /////
    ////
    var messageData = {
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements: [{
                    title: title1,
                    subtitle: "Next-generation virtual reality",
                    item_url: airticle1,
                    image_url: photo1,
                    buttons: [{
                        type: "web_url",
                        url: airticle1,
                        title: "閱讀此文章",
                        //messenger_extensions: true,
                        //fallback_url: "https://petersfancyapparel.com/fallback",
                        webview_height_ratio: "full" //compact, tall, full
                    },{
                        type:"element_share",
                    },{
                        type: "postback",
                        title: "回首頁",
                        payload: "browseAirticle"
                    }
                    ],
                }, {
                    title: title2,
                    subtitle: "Add the description",
                    item_url: airticle2,
                    image_url: photo2,
                    buttons: [{
                        type: "web_url",
                        url: airticle2,
                        title: "閱讀此文章",
                        webview_height_ratio: "full"
                    },{
                        type:"element_share"
                    },{
                        type: "postback",
                        title: "回首頁",
                        payload: "browseAirticle",
                    }]
                },{
                    title: title3,
                    subtitle: "Add the description",
                    item_url: airticle3,
                    image_url: photo3,
                    buttons: [{
                        type: "web_url",
                        url: airticle3,
                        title: "閱讀此文章",
                        webview_height_ratio: "full"
                    },{
                        type:"element_share"
                    },{
                        type: "postback",
                        title: "回首頁",
                        payload: "browseAirticle",
                    }]
                }]
            }
        }
    };


    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs : {access_token: token},
        method: "POST",
        json: {
            recipient: {id: sender},
            message : messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log("sending error")
        } else if (response.body.error) {
            //console.log("\n\n\n\n=== response body error ===");
            console.log(response.body.error);
        }
    })


    //Collect the user's data'
    request({
        url: "https://graph.facebook.com/v2.6/"+sender+"?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token="+token,
        qs : {access_token: token},
        method: "GET", 
    }, function(error, response, body) {
        if (error) {
            console.log("sending error")
        } else if (response.body.error) {
            console.log("response body error")
        }
        /*Restore data*/
        const fs = require('fs');
        const content = body;
        //const content = JSON.parse(body);
        //console.log(content)
        /*
        fs.writeFile("userdata.json", content, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
         */
        /////
        /////
    })
}



function backHome(sender, text){
    var link = "https://www.tradingvalley.com"
    var photo = "https://www.tradingvalley.com/images/sitethumb.jpg"
    var messageData = {
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements: [{
                    title:"TradingValley bot",
                    subtitle:"Let's create the life you want,together.",
                    image_url:photo,
                    buttons:[{
                        type: "web_url",
                        url: link,
                        title: "關於我們",
                        webview_height_ratio: "full" //compact, tall, full
                    },{
                        type: "postback",
                        title: "訂閱管理",
                        payload: "backHome"
                    }]
                },{
                    title:"最新文章",
                    //subtitle:"Let's create the life you want,together.",
                    image_url:"https://cw1.tw/CW/images/article/201611/article-583561e0eb39a.jpg",
                    buttons:[{
                        type: "postback",
                        title: "瀏覽文章",
                        payload: "backHome"
                    },{
                        type: "postback",
                        title: "訂閱文章",
                        payload: "backHome"
                    }]
                },{
                    title:"個股介紹",
                    //subtitle:"Let's create the life you want,together.",
                    image_url:"https://cw1.tw/CW/images/article/201612/article-5850de3be54b4.jpg",
                    buttons:[{
                        type: "postback",
                        title: "美股清單",
                        payload: "backHome"
                    }]
                }]
            }
        }
    };

    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs : {access_token: token},
        method: "POST",
        json: {
            recipient: {id: sender},
            message : messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log("sending error")
        } else if (response.body.error) {
            console.log(response.body.error);
        }
    })
}



////////
////////
app.listen(app.get('port'), function() {
    console.log("running: port",app.get('port')) //app,get('port')
})

