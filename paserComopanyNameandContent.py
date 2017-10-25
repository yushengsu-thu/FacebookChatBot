import sys
import requests
from bs4 import BeautifulSoup
import fire
import csv
import os
import json

"""
company:[{
    name:"", 
    photoLink:"",
    companyNews:[{
        title:"",
        newsLink:"",
        airticlePhoto:"",
        brief:"xx相關報導",
        date:""
    }]
}]
"""

def parsePage(url):
    res = requests.get(url)
    soup = BeautifulSoup(res.text,"html5lib")
    pageLinks = soup.find_all('div', {'class': 'wp-pagenavi'})
    return pageLinks 

class Pares:
    def parsephotoLink(self,url):
        res = requests.get(url)
        soup = BeautifulSoup(res.text,"html5lib")
        soup = soup.find_all('div', {'class': 'comlist-img'})
        soup = BeautifulSoup(str(soup),"html5lib")
        photoLink = [soup['src'] for soup in soup.find_all('img',src=True) if len(soup['src']) != 0]
        return photoLink 

    def paresName(self,url):
        res = requests.get(url)
        soup = BeautifulSoup(res.text,"html5lib")
        soup = soup.find_all('div', {'class': 'comlist-name'})
        soup = BeautifulSoup(str(soup),"html5lib")
        name = [soup.text for soup in soup.find_all('span')]
        return name

    def parescompanyUrl(self,url):
        res = requests.get(url)
        soup = BeautifulSoup(res.text,"html5lib")
        soup = soup.find_all('div', {'class': 'comlist-info'})
        soup = BeautifulSoup(str(soup),"html5lib")
        companyNews = [soup['href'] for soup in soup.find_all('a') if soup['href']!='']
        return companyNews 

    def parsecompanyNews(self,name,url):
        #detect how many web pages and fetch url //if 有好幾頁
        pagelinks = list()
        pagelinks.append(url)
        pagelinks = pagelinks + parsePage(url)
        
        #parse Pages content
        for pagelink in pagelinks:
            #print(pagelink)
            res = requests.get(pagelink)
            soup = BeautifulSoup(res.text,"html5lib")
            soup = soup.find_all('div', {'class': 'col-xs-6 col-md-4'})
            soup = BeautifulSoup(str(soup),"html5lib")
            soup = soup.find_all('div', {'class': 'post-info'})
            soup = BeautifulSoup(str(soup),"html5lib")

            titles = [soup.text for soup in soup.find_all('div', {'class': 'post-title'})]
            #print(titles)
            newsLinks = [soup['href'] for soup in soup.find_all('a') if soup['href']!='']
            #print(newsLinks)
            airticlePhotos = soup.find_all('img', {'class': 'post-index-banner'})
            airticlePhotos = BeautifulSoup(str(airticlePhotos),"html5lib")
            airticlePhotos = [airticlePhotos['src'] for airticlePhotos in airticlePhotos.find_all('img',src=True) if len(airticlePhotos['src']) != 0]
            #print(airticlePhotos)
            dates = soup.find_all('div', {'class': 'post-date'})
            dates = [date.text.replace(u'\xa0','') for date in dates[:]]
            #print(dates)

            companyNews=list()
            for i in range(len(titles)):
                companyNews.append({
                    "title":titles[i],
                    "newsLink":newsLinks[i],
                    "airticlePhoto":airticlePhotos[i],
                    "brief":str(name+("相關報導")),
                    "date":dates[i]
                }) 
            #print(companyNews)
            return companyNews 


   #def parse(self,url):
   #def parse(self,url):


if __name__ == '__main__':
    mainPage = "https://www.stockfeel.com.tw/category/stock-usa/"
    parser1=Pares()
    
    photoLinks=parser1.parsephotoLink(mainPage)
    names=parser1.paresName(mainPage)
    companyUrls=parser1.parescompanyUrl(mainPage)
    
    company=list()
    #for url in companyUrl:
    for i in range(len(companyUrls)):
        print(str("fetch : "+names[i]))
        companyNews=parser1.parsecompanyNews(names[i],companyUrls[i])
        company.append({
            "name":names[i],
            "photoLink":photoLinks[i],
            "companyNews":companyNews
        })

    print(company)


    with open('brandandcCompanyNews.json', 'w') as f:
        json.dump(company,f)
