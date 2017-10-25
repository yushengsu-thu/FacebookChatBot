import sys
import requests
from bs4 import BeautifulSoup
import fire
import csv
import os
import json

class Parser:
    def parserPhoto(self,url):
        res = requests.get(url)
        soup = BeautifulSoup(res.text,"html5lib")
        soup = soup.find_all('div', {'class': 'comlist-img'})
        soup = BeautifulSoup(str(soup),"html5lib")
        photos = [soup['src'] for soup in soup.find_all('img',src=True) if len(soup['src']) != 0]
        return(photos)
    
    def parserBrand(self,url):
       res = requests.get(url)
       soup = BeautifulSoup(res.text,"html5lib")
       soup = soup.find_all('div', {'class': 'comlist-name'})
       soup = BeautifulSoup(str(soup),"html5lib")
       brands = [soup.text for soup in soup.find_all('span')]
       #brands = 
       return(brands)

if __name__ == '__main__':
    mainPage = "https://www.stockfeel.com.tw/category/stock-usa/"

    parser1=Parser()
    photos=parser1.parserPhoto(mainPage)
    brands=parser1.parserBrand(mainPage)
    brands_and_photos=dict(zip(brands,photos))
    #print(brands_and_photos)

    with open('brands_and_photos.json', 'w') as f:
        json.dump(brands_and_photos,f)
