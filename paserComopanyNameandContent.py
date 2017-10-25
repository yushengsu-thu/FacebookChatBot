import sys
import requests
from bs4 import BeautifulSoup
import fire
import csv
import os
import json

"""
[comapny:{
    name:"", 
    photoLink:"",
    companyNews:{[
        title:"",
        newsLink:"",
        airticlePhoto:"",
        brief:"",
        date:""
    ]}
}]
"""

class Pares:
    def parsephotoLink(self,url):
        res = requests.get(url)
        soup = BeautifulSoup(res.text,"html5lib")
        soup = soup.find_all('div', {'class': 'comlist-img'})
        soup = BeautifulSoup(str(soup),"html5lib")
        photoLink = [soup['src'] for soup in soup.find_all('img',src=True) if len(soup['src']) != 0]
        return(photoLink)
    
    def paresName(self,url):
       res = requests.get(url)
       soup = BeautifulSoup(res.text,"html5lib")
       soup = soup.find_all('div', {'class': 'comlist-name'})
       soup = BeautifulSoup(str(soup),"html5lib")
       name = [soup.text for soup in soup.find_all('span')]
       return(name)
    
    def parescompanyNewsUrl(self,url):
       res = requests.get(url)
       soup = BeautifulSoup(res.text,"html5lib")
       soup = soup.find_all('div', {'class': 'comlist-info'})
       soup = BeautifulSoup(str(soup),"html5lib")
       companyNews = [soup['href'] for soup in soup.find_all('a')]
       return(companyNews)
    
    def parsecompanyNews(self,url):
        

       res = requests.get(url)
       soup = BeautifulSoup(res.text,"html5lib")
       soup = soup.find_all('div', {'class': 'post-info'})
       soup = BeautifulSoup(str(soup),"html5lib")
       companyNews = [soup['href'] for soup in soup.find_all('a') if soup['href']!='']

       print(companyNews)   
       exit()
    #def parse(self,url):
    #def parse(self,url):
    #def parse(self,url):
    #def parse(self,url):

if __name__ == '__main__':
    mainPage = "https://www.stockfeel.com.tw/category/stock-usa/"

    parser1=Pares()
    comapny=dict()
    #photoLink=parser1.parsephotoLink(mainPage)
    #name=parser1.paresName(mainPage)
    companyNews=dict()
    companyNewsUrl=parser1.parescompanyNewsUrl(mainPage)
    for url in companyNewsUrl:
        parser1.parsecompanyNews(url)



    #name_and_photoLink=dict(zip(name,photoLink))
    #print(name_and_photoLink)


    #with open('name_and_photoLink.json', 'w') as f:
    #    json.dump(name_and_photoLink,f)
