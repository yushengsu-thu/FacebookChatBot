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

var token = "EAAZAznrny0WQBAIuk7AIZAcvNlZBZCTN3HPx63TiMDXpOQEaDNMkmf6BZBhi3VXphamYiiQwTy4nkuGt4evH9I0TZBzjF82D9TIt1OQZBGFgcnDVFJrIQYO9XqK8LmsjUOJw9I81ATsEOBSAjtuF6vVVq8v5xjpAlJpjnHJ0nx5pQChGPywq2bD"

// Facebook

app.get('/webhook/', function(req, res) {
    //Callback URL:ngrok http 5000  token:FacebookChatBot
	if (req.query['hub.verify_token'] === "FacebookChatBot") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})
//!!!Rewrite
app.post('/webhook/', function(req, res) {
	var messaging_events = req.body.entry[0].messaging
	for (var i = 0; i < messaging_events.length; i++) {
		var event = messaging_events[i]
		var sender = event.sender.id
		if (event.message && event.message.text) {
			var text = event.message.text
			sendText(sender, "Text echo: " + text.substring(0, 100))
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
    var title = pickRandomProperty(parsedJSON)
    var link = parsedJSON[title]
    /////
    /////fix
    ////
    var messageData = {
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements: [{
                    title: "rift",
                    subtitle: "Next-generation virtual reality",
                    item_url: "https://www.oculus.com/en-us/rift/",               
                    image_url: "http://messengerdemo.parseapp.com/img/rift.png",
                    buttons: [{
                        type: "web_url",
                        url: "https://www.oculus.com/en-us/rift/",
                        title: "Open Web URL"
                    }, {
                        type: "postback",
                        title: "Call Postback1",
                        payload: "Payload_1",
                    }],
                }, {
                    title: "touch",
                    subtitle: "Your Hands, Now in VR",
                    item_url: "https://www.oculus.com/en-us/touch/",               
                    image_url: "http://messengerdemo.parseapp.com/img/touch.png",
                    buttons: [{
                        type: "web_url",
                        url: "https://www.oculus.com/en-us/touch/",
                        title: "Open Web URL"
                    }, {
                        type: "postback",
                        title: "Call Postback2",
                        payload: "Payload_2",
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
			console.log("response body error")
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
app.listen(app.get('port'), function() {
	console.log("running: port",app.get('port')) //app,get('port')
})
