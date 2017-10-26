import sys
import requests
from bs4 import BeautifulSoup
import fire
import csv
import os
import json

class Pares:
    def parselastestNews(self,url):
        res = requests.get(url)
        soup = BeautifulSoup(res.text,"html5lib")
        #soup = soup.find_all('body', {'data-gr-c-s-loaded': 'true'})
        #soup = BeautifulSoup(str(soup),"html5lib")
        #soup = soup.find_all('div', {'class': 'wapper'})
        #soup = BeautifulSoup(str(soup),"html5lib")
        #soup = soup.find_all('div', {'class': 'container category-wapper'})
        #soup = BeautifulSoup(str(soup),"html5lib")
        #soup = soup.find_all('div', {'class': 'row'})
        #soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'col-block'})
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'row prefix-post-category'})
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'col-xs-6 col-md-4'})
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'post-wrapper'})
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'post-info'})
        soup = BeautifulSoup(str(soup),"html5lib")
        

        newsLinks = [soup['href'] for soup in soup.find_all('a') if soup['href']!='']
        #print(newsLinks)
        
        airticlePhotos = soup.find_all('img', {'class': 'post-index-banner'})
        airticlePhotos = BeautifulSoup(str(airticlePhotos),"html5lib")
        airticlePhotos = [airticlePhotos['src'] for airticlePhotos in airticlePhotos.find_all('img',src=True) if len(airticlePhotos['src']) != 0]
        #print(airticlePhotos)
       
        titles = soup.find_all('a')
        titles = BeautifulSoup(str(titles),"html5lib")
        titles = soup.find_all('div', {'class': 'post-title'})
        titles = [title.text for title in titles]
        #print(titles)

        dates = soup.find_all('div', {'class': 'post-date'}) 
        dates = [date.text.replace("\xa0","") for date in dates]
        #print(dates)
        
        lastestNews=list()
        for i in range(len(titles)):
            lastestNews.append({
                "title":titles[i],
                "newsLink":newsLinks[i],
                "airticlePhoto":airticlePhotos[i],
                "brief":"相關報導",
                "date":dates[i]
            })

        #print(lastestNews)
        return lastestNews

if __name__ == '__main__':
    mainPage = "https://www.stockfeel.com.tw/category/stock-usa/"
    parser1=Pares()
    lastestNews = parser1.parselastestNews(mainPage)
    with open('lastestNews.json', 'w') as f:
        json.dump(lastestNews,f,ensure_ascii=False)
