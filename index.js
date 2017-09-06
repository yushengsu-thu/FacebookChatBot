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

var token = "EAAZAznrny0WQBAEmB7LW5S5nZA688ZBJmOkPz6JTRo8pIFTG0d5O8nZAEZCHCPteLGf96dmPt1HQqfoHjWYouvNZArFQV32i2g9HhjrTJZA6vp4MkwhFrPndYFrm4HYRT8fBiRONuwOUdY3K7bW7mFYhzAXxW0PcZApTDgr4hx9CFR7nOyMiPjIf"

// Facebook

app.get('/webhook/', function(req, res) {
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
    var name_of_airticle = "迪士尼財報分析"
    var messageData = {
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements: [{
                    title: "rift",
                    subtitle: "Next-generation virtual reality",
                    item_url: links[name_of_airticle],//"https://www.oculus.com/en-us/rift/",               
                    image_url: "http://messengerdemo.parseapp.com/img/rift.png",
                    buttons: [{
                        type: "web_url",
                        url: links[name_of_airticle],//"https://www.oculus.com/en-us/rift/",
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
		console.log(1)
        console.log(body)
        if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})

    
    //Collect the user's data'
    request({
     
		url: "https://graph.facebook.com/v2.6/"+sender+"?fields=first_name,last_name,profile_pic&access_token="+token,
        
		//qs : {access_token: token},
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
	})


}


app.listen(app.get('port'), function() {
	console.log("running: port",app.get('port')) //app,get('port')
})
