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
	console.log("\n\n\n\nevent_entry = ");
	console.log(event_entry);
	// Subscribes to Message Received events
	if(event_entry.messaging){
		var messaging_events = event_entry.messaging;
		console.log("\n\n\n\n=== messaging_events ===");
		console.log(messaging_events);

		for (var i = 0; i < messaging_events.length; i++) {
			var event = messaging_events[i];
			var sender = event.sender.id;
			// For messages
			if (event.message && event.message.text) {
				var text = event.message.text
				sendText(sender, "Text echo: " + text.substring(0, 100))
			}
			// For buttons
			if (event.postback && event.postback.title) {
				switch (event.postback.title) {
					case "Back Home":
						sendHome(sender, "Text echo: Back Home")
						break;
					default:
						break;
				}
			}
		}
	}
	res.sendStatus(200)
})
//
function sendText(sender, text) {  //sendText ==> sendMessage
    /*Read a Links.json*/
    /*Synchronous version*/
    var fs = require('fs');
    var links = JSON.parse(fs.readFileSync('links.json', 'utf8'));

    /*Asynchronous version*/
    ////////////////////
    ///////////////////
	//var messageData = {text: text}
	////
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
    /////fix
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
                    buttons: [
											{
                        type: "web_url",
                        url: airticle1,
                        title: "Read this airticle",
                        //messenger_extensions: true,
                        //fallback_url: "https://petersfancyapparel.com/fallback",
                        webview_height_ratio: "full" //compact, tall, full
	                    },{
	                        type:"element_share"
	                    },{
	                        type: "postback",
	                        title: "Back Home",
	                        payload: "Back Home payload content"
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
                        title: "Read this airticle",
                        webview_height_ratio: "full"
                    },{
                        type:"element_share"
                    },{
                        type: "postback",
                        title: "Call Postback2",
                        payload: "Payload_2",
                    }]
                },{
                    title: title3,
                    subtitle: "Add the description",
                    item_url: airticle3,
                    image_url: photo3,
                    buttons: [{
                        type: "web_url",
                        url: airticle3,
                        title: "Read this airticle",
                        webview_height_ratio: "full"
                    },{
                        type:"element_share"
                    },{
                        type: "postback",
                        title: "Call Postback3",
                        payload: "Payload_3",
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
			console.log("\n\n\n\n=== response body error ===");
			console.log(response.body.error);
		}
	})


    //Collect the user's data'
    request({
		url: "https://graph.facebook.com/v2.6/"+sender+"?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token="+token,
		qs : {access_token: token},
		method: "GET", //POST
		//json: {
		//	recipient: {id: sender},
		//	message : messageData,
		//}
	}, function(error, response, body) {
        //console.log(response)//
        console.log(body)
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
        //////
        //Restore data
        const fs = require('fs');
        const content = JSON.stringify(body);

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

function sendHome(sender, text){
	console.log("\n\n\n\n=== sendHome ===");
	var fs = require('fs');
	var links = JSON.parse(fs.readFileSync('links.json', 'utf8'));

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
	var messageData = {
		attachment: {
			type: "template",
			payload: {
				template_type: "generic",
				elements: [
					{
            "title":"Welcome to TradingValley!",
						"image_url": photo1,
            "subtitle":"Let\'s create the life you want, together.",
            "default_action": {
              "type": "web_url",
              // "url": "https://www.tradingvalley.com",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type": "web_url",
                "url": airticle1,
                "title":"Read this airticle",
								"webview_height_ratio": "full" //compact, tall, full
              }
            ]
					}
				]
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
			console.log("\n\n\n\n=== response body error ===");
			console.log(response.body.error);
		}
	})
}
app.listen(app.get('port'), function() {
	console.log("running: port",app.get('port')) //app,get('port')
})
