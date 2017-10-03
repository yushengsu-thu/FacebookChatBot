Facebook ChatBot:

Get a Facebook Messenger Bot up and running with Heroku

url: https://nameless-hamlet-50172.herokuapp.com/

Token: EAAZAznrny0WQBAGS2QyDpFqwxtuZBdQcr4ikXAfAXcZCbXFfuv6WMDdZApJa8OYNfpdxHb3C7ZCD7ZCY2CGZBCApLChUalh4z6zifVcNjtn0kE9K1DQ9kABZBZAZCy1ZCu2sFHjixbehr4lrQ4l9se8FfPfBqkWRwNHZCt3jwHHnhwKZAcGWwZBffHwgIR

curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=EAAZAznrny0WQBAEmB7LW5S5nZA688ZBJmOkPz6JTRo8pIFTG0d5O8nZAEZCHCPteLGf96dmPt1HQqfoHjWYouvNZArFQV32i2g9HhjrTJZA6vp4MkwhFrPndYFrm4HYRT8fBiRONuwOUdY3K7bW7mFYhzAXxW0PcZApTDgr4hx9CFR7nOyMiPjIf"

Master:
git push heroku master
Branch Develop:
git push heroku develop:master

1. Use Heroku: change(A.Heroku website turn on:Setting ==> Dyno formation 
B. <Facebook dev center> ==> Edit Page Subscription==> Callback URL) 
https://nameless-hamlet-50172.herokuapp.com/webhook/

2. Use ngrok: change (A.turn on: ngrok http 5000 B.npm start C.Reset webhooks <Facebook dev center> ==> Edit Page Subscription ==> 
Callback URL)
website add: /webhooks
token:FacebookChatBot

Verify Token: FacebookChatBot

