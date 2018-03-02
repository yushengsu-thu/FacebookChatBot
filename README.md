# Auto-push airticle chatbot (Facebook) 

Chatbot will auto-push airticles to every user every week though Facebook Messanger. According to users' history of reading and behaviors, we recommend airticles to them.
We use LSM modle and mlmodle to recommend airticles. (LSM and mlmldle File)

* Recomend Framework:

<img src="https://github.com/CoolSheng/FacebookChatBot/blob/master/introduce/Screen%20Shot%202018-03-02%20at%2012.41.16%20AM.png" width="560">

* User Interface:

<img src="https://github.com/CoolSheng/FacebookChatBot/blob/master/introduce/Screen%20Shot%202018-03-02%20at%2012.40.55%20AM.png" width="480">
=================================

<img src="https://github.com/CoolSheng/FacebookChatBot/blob/master/introduce/Screen%20Shot%202018-03-02%20at%2012.41.01%20AM.png" width="240">
=================================

<img src="https://github.com/CoolSheng/FacebookChatBot/blob/master/introduce/Screen%20Shot%202018-03-02%20at%2012.41.08%20AM.png" width="480">


## Getting Started
Refer to : https://developers.facebook.com/docs/messenger-platform
You need to get Token and Verify Token first.: 

Start running
```
node index.js
```
You need to turn on your server. You can choose Heroku or ngrok: 
* Use Heroku: 

Heroku website
```
Go to Heroku website and turn on Setting ==> Dyno formation 

```

Facebook dev center 
```
Edit Page Subscription ==> Callback URL 
```

* Use ngrok: 

Turn on: ngrok http 5000 
```
ngrok http 5000
```

Facebook dev center
```
Edit Page Subscription ==> Callback URL (website add: /webhooks)
```

### Prerequisites

Nodejs, python3(crawler, mlmodle, and LSM)

### Installing

If you want to use ngrok as your local server, you need to install ngrok first.

Linux
```
apt-get install ngrok
```
mac
```
brew install ngrok
```
After you install python3, you can use pip to install packge. Excute this bash file:
```
bash pythonPackageInstall.sh
```
Install npm package:
```
bash nodejsPackageInstall.sh
```

## Versioning

version 0.0.1

## Authors

* **Yu-Sheng Su** - *Initial work* 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* ML model is from kaggle context (Have cited authour in code)


