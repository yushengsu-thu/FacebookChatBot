'use strict'

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

var token = "EAAZAznrny0WQBAGS2QyDpFqwxtuZBdQcr4ikXAfAXcZCbXFfuv6WMDdZApJa8OYNfpdxHb3C7ZCD7ZCY2CGZBCApLChUalh4z6zifVcNjtn0kE9K1DQ9kABZBZAZCy1ZCu2sFHjixbehr4lrQ4l9se8FfPfBqkWRwNHZCt3jwHHnhwKZAcGWwZBffHwgIR"

// Facebook

app.get('/webhook/', function(req, res) {
    //Callback URL:ngrok http 5000  token:FacebookChatBot
	if (req.query['hub.verify_token'] === "FacebookChatBot") { //FacebookChatBot
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

//!!!Rewrite
app.post('/webhook/', function(req, res) {
	var event_entry = req.body.entry[0];
	//console.log("\n\n\n\nevent_entry = ");
	//console.log(event_entry);
	// Subscribes to Message Received events
	if(event_entry.messaging){
		var messaging_events = event_entry.messaging;
		//console.log("\n\n\n\n=== messaging_events ===");
		//console.log(messaging_events);

		for (var i = 0; i < messaging_events.length; i++) {
			var event = messaging_events[i];
			var sender = event.sender.id;
			// For messages
			if (event.message && event.message.text) {
				var text = event.message.text
			    backHome(sender, "Text echo: 回首頁")
                //mainMenue(sender,"Text echo: mainMenue")
                //browseAirticle(sender, "Text echo: " + text.substring(0, 100))
			}
			// For buttons
            if (event.postback && event.postback.title) {
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
						checkStocklist(sender, "Text echo: 美股清單")
						break;
					default:
						break;
				}
			}
		}
	}
	res.sendStatus(200)
})


///////
//////
function checkStocklist(sender, text){
    var fs = require('fs');
    var brands_and_photos = JSON.parse(fs.readFileSync('brands_and_photos.json', 'utf8'));
    
    var data=[];
    for(var i=0;i<brands_and_photos.length;i++){
        console.log(brands_and_photos[i].key)
        console.log(brands_and_photos[i].value)
        data.push({ 
            content_type:"text",
            title:brands_and_photos[i].key,
            image_url:brands_and_photos[i].value,
            payload:"brands"
        })
    }
        
    console.log(data)

    var messageData = {
        text: "我們列出部分美股如下，你也可以點選‘更多’來找尋你感興趣的公司",
        quick_replies:data/*[{
            content_type:"text",
            title:"3M",
            image_url:"https://stockfeel-1.azureedge.net/wp-content/themes/stockfeel_2016_theme/images/stock_company/usa/logo_stock-usa-3m.svg",
            payload:"3M"
        },{
            content_type:"text",
            title:"A&F",
            image_url:"https://stockfeel-1.azureedge.net/wp-content/themes/stockfeel_2016_theme/images/stock_company/usa/logo_stock-usa-3m.svg",
            payload:"A&F"
        }]*/,
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
			//console.log("\n\n\n\n=== response body error ===");
			console.log(response.body.error);
		}
	})
}

//////
//////
function subscribeAirticle(sender, text){

    request({
		url: "https://graph.facebook.com/v2.6/"+sender+"?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token="+token,
		qs : {access_token: token},
		method: "GET", 
	}, function(error, response, body) {
        //console.log(response)//
        //console.log(body)
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
        /*Restore data*/
        const fs = require('fs');
        const content = body;
        //const content = JSON.stringify(body);
        console.log(content)
        
        /*Check the user if exist in the list*/
       /*====================================*/ 
        /*Write in*/
        fs.writeFile("subscribeUser.json",content,'utf8', function (err){
        if (err) {
            return console.log(err);
        }
            console.log("The file was saved!");
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
	                        payload: "回首頁 payload content"
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
                        payload: "回首頁 payload content",
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
                        payload: "回首頁 payload content",
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
        //const content = JSON.stringify(body);
        //console.log(content)

        fs.writeFile("userdata.json", content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
            console.log("The file was saved!");
        });
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
                        payload: "subscribe"
                    }]
				},{
                    title:"最新文章",
                    //subtitle:"Let's create the life you want,together.",
                    image_url:"https://cw1.tw/CW/images/article/201611/article-583561e0eb39a.jpg",
                    buttons:[{
                        type: "postback",
                        title: "瀏覽文章",
                        payload: "browse"
                    },{
                        type: "postback",
                        title: "訂閱文章",
                        payload: "subscribe"
                    }]
				},{
                    title:"個股介紹",
                    //subtitle:"Let's create the life you want,together.",
                    image_url:"https://cw1.tw/CW/images/article/201612/article-5850de3be54b4.jpg",
                    buttons:[{
                        type: "postback",
                        title: "美股清單",
                        payload: "browse"
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
}

//////////
//////////

//////////
/////////
////////
////////
///////


//*Haven't call this function*//
/*
function greetingText(sender){
	var messageData = {
        setting_type:"greeting",
        greeting:{
            text:"Hi {{user_first_name}}, 我是TradingValley的智能小助手。我會寄給你每週精選的美股文摘！"
        }
    };

	request({
		url: "https://graph.facebook.com/v2.6/me/thread_settings?",
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
}
*/


//////
//////

app.listen(app.get('port'), function() {
	console.log("running: port",app.get('port')) //app,get('port')
})

