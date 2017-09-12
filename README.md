 Facebook ChatBot
Get a Facebook Messenger Bot up and running with Heroku

url: https://nameless-hamlet-50172.herokuapp.com/

Token: EAAZAznrny0WQBAEmB7LW5S5nZA688ZBJmOkPz6JTRo8pIFTG0d5O8nZAEZCHCPteLGf96dmPt1HQqfoHjWYouvNZArFQV32i2g9HhjrTJZA6vp4MkwhFrPndYFrm4HYRT8fBiRONuwOUdY3K7bW7mFYhzAXxW0PcZApTDgr4hx9CFR7nOyMiPjIf

curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=EAAZAznrny0WQBAEmB7LW5S5nZA688ZBJmOkPz6JTRo8pIFTG0d5O8nZAEZCHCPteLGf96dmPt1HQqfoHjWYouvNZArFQV32i2g9HhjrTJZA6vp4MkwhFrPndYFrm4HYRT8fBiRONuwOUdY3K7bW7mFYhzAXxW0PcZApTDgr4hx9CFR7nOyMiPjIf"

git push heroku master

1. Use Heroku: change(A.callback url to heroku B.turn on:Dyno formation) : https://developers.facebook.com/apps/1815975421989220/webhooks/ 
Herku: https://nameless-hamlet-50172.herokuapp.com/webhook/
2. Use ngrok: cahge (A.call back url  B.turn on: ngrok http 5000)
token:FacebookChatBot
