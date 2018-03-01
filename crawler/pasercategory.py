import sys
import requests
from bs4 import BeautifulSoup
import fire
import csv
import os
#from itertools import zip_longest

class Parse: #python can accept a class with a initial(constructure)
    ########Do syn##########
    def __init__(self):
        self.__version = 1.0

    @property #this function see as a property   
    def Version(self):
        return self.__version
    #########################
    def parseAirticleLink(self,url):
        res = requests.get(url)
        soup = BeautifulSoup(res.text,"html5lib")

    

    def parsePage(self,url):
        res = requests.get(url)
        #soup = BeautifulSoup(res.text,"lxml")
        soup = BeautifulSoup(res.text,"html5lib")
        soup = soup.find_all('div', {'class': 'wapper'})
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'container category-wapper'}) 
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'row'})  
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'col-block category-new-wrapper prefix-post-category'})  
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'row'})   
        #print(soup)
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'col-xs-6 col-lg-4'})   
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'post-wrapper'})   
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'post-info'})
        soup = BeautifulSoup(str(soup),"html5lib")
        links = soup 
        #links = links.find_all('a')
        links = [link['href'] for link in links.find_all('a',href=True) if len(link['href']) != 0]  
        
        photos = soup
        photos = soup.find_all('a')
        photos= BeautifulSoup(str(photos),"html5lib")
        photos = soup.find_all('div', {'class': 'post-img'})
        photos = BeautifulSoup(str(photos),"html5lib")
        photos = soup.find_all('img', {'class': 'post-index-banner'})
        photos = [photo['src'] for photo in photos]
        
        topics = soup
        topics = soup.find_all('a')
        topics = soup.find_all('div', {'class': 'post-title'})
        topics = [topic.text for topic in topics]  
        
        airticles = dict()
        airticles=dict(zip(topics,zip(links,photos)))###
        print(airticles)
        return airticles

    def judgePageexist(self,url):
        res = requests.get(url)
        soup_exist = BeautifulSoup(res.text,"html5lib")
        soup_exist = soup_exist.find_all('div', {'class': 'wapper'})
        soup_exist = BeautifulSoup(str(soup_exist),"html5lib")
        soup_exist = soup_exist.find_all('div', {'class': 'container category-wapper'})
        soup_exist = BeautifulSoup(str(soup_exist),"html5lib")
        soup_exist = soup_exist.find_all('div', {'class': 'row'})
        soup_exist = BeautifulSoup(str(soup_exist ),"html5lib")
        soup_exist = soup_exist.find_all('div', {'class': 'col-block category-new-wrapper prefix-post-category'})
        soup_exist = BeautifulSoup(str(soup_exist),"html5lib")
        soup_exist = soup_exist.p
        #print(soup_exist)
        if soup_exist == None:
            return True
        else:
            return False

    def parseArticle_and_Write(self,title,link):
        res = requests.get(link)
        soup = BeautifulSoup(res.text,"html5lib")
        article = soup.find_all('div', {'class': 'sin-content'})
        #print(article[0].text)
        #export txt file
        #print(type(article[0].text))
        #Correct: Use database
        ######If there is "/", just pass it.#####
        if "/" in title:
            print(title+"Not included")
        else:
            with open("/Users/sheng_mac/Downloads/parse_stockfeel"+title+".txt", "w") as text_file:
            #text_file = open(title+".txt", "w")
                text_file.write(article[0].text)
                text_file.close()

    def storeArticleLink(self,airticles,allAirticlesLink):
        allAirticlesLink.update(airticles)

    def parseCategorySubject(self,url):
        #Featch the level_1 link: 

        #Fetch level_1 topic:
        res = requests.get(url)
        soup = BeautifulSoup(res.text,"html5lib")
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('li', {'class': 'dropdown'})
        
        #Featch the level_1 link: 
        #soup = BeautifulSoup(str(soup),"html5lib")
        #link_level_1 = soup.find_all('a')
        link_level_1 = ["https://www.stockfeel.com.tw/category/living-opportunity/","https://www.stockfeel.com.tw/category/introduction-stock/","https://www.stockfeel.com.tw/category/enterprise-evaluation/","https://www.stockfeel.com.tw/category/expert-share/","https://www.stockfeel.com.tw/graphics/","https://www.stockfeel.com.tw/robot/","https://www.stockfeel.com.tw/category/stock-tw/","https://www.stockfeel.com.tw/category/allpost/"]
        #print(link_level_1)
        #print(link_level_1[0].text.strip()) 
        #print(link_level_1[0]) 
        

        #Fetch level_1 topic:
        soup = BeautifulSoup(str(soup),"html5lib")
        soup = soup.find_all('div', {'class': 'col-md-6 nav-list'})
        soup = BeautifulSoup(str(soup),"html5lib")
        level_1 = soup.find_all('h5', {'class': 'primary strong'})



        level_1_link_no = 0
        subject = dict()
        #all_dict = list()
        menu_no = 1
        for category_level_1 in level_1:#level_1[:]:
            all_dict = list()##
            print("===")
            #print(category_level_1.text)
            #print(link_level_1[level_1_link_no].get('href'))
            link=dict()
            #print(level_1_link_no)
            #print(link_level_1[level_1_link_no])
            link["link"]=link_level_1[level_1_link_no]#.get('href') 
            #print(type(link))
            #print(link)
            all_dict.append(link)
            #print(type("menu-icon-"+str(menu_no)))
            #print(("menu-icon-"+str(menu_no)))
            #soup = soup.find_all('ul', {'class': "menu-icon-1"})
            soup = soup.find_all('ul', {'class': "menu-icon-"+str(menu_no)})
            menu_no = menu_no+1
            soup = BeautifulSoup(str(soup),"html5lib")
            link_level_2 = soup.find_all('a')
            soup = BeautifulSoup(str(soup),"html5lib")
            level_2 = soup.find_all('span')
            #print(level_2)##
            level_2_link_no=0
            chapter=dict()
           
            for category_level_2 in level_2[0:int(len(level_2)/2)]:    
                if (category_level_2.text.strip()):
                    #print(category_level_2.text.strip())
                    #print(link_level_2[level_2_link_no].get('href'))
                    chapter[category_level_2.text.rstrip()]=link_level_2[level_2_link_no].get('href')  
                    level_2_link_no=level_2_link_no+1
                else:
                    continue
            
            #Problem!!Problem!!Problem!!Problem!!
            #print(chapter)
            if len(chapter) == 0:
                print(category_level_1.text+" :chapter has nothing")
            else:
                #print(chapter)
                all_dict.append(chapter)
                #print(all_dict)
                #print(category_level_1.text)
                subject[category_level_1.text]=all_dict
            
            #print(subject)
            level_1_link_no=level_1_link_no+1 
            ################################
            res = requests.get(url)
            soup = BeautifulSoup(res.text,"html5lib")
            soup = BeautifulSoup(str(soup),"html5lib")
            soup = soup.find_all('li', {'class': 'dropdown'})
            soup = BeautifulSoup(str(soup),"html5lib")
            soup = soup.find_all('div', {'class': 'col-md-6 nav-list'})
            soup = BeautifulSoup(str(soup),"html5lib")
            level_1 = soup.find_all('h5', {'class': 'primary strong'})
            ###############################
            #print(subject)
        #print(subject)
        #exit()#########
        return subject
            
      
#####################################
#####################################
if __name__ == '__main__': 
    allAirticlesLink=dict()
    
    mainPage = "https://www.stockfeel.com.tw/"
    parse2=Parse()
    #Subject (Jason Document)
    subject=parse2.parseCategorySubject(mainPage)
    #print(subject.items())

    for key,value in subject.items():
        #print(key)
        #print(value[:].pop(0))
        os.system("mkdir ./Documents/"+key)
        
        for topic,link in value.pop().items():
            id = 1 ##
            print(topic)
            if topic == "概念股": ##Deal with it specifly #美股P.37
                continue

            if topic == "美股": ##Deal with it specifly #美股P.37
                continue
            
            if topic == "新創/IPO": ##Deal with it specifly #美股P.37
                continue
            
            if topic == "社群達人": ##Deal with it specifly #美股P.37
                continue
            
            if topic == "投資大師": ##Deal with it specifly #美股P.37
                continue
            
            if topic == "專業機構": ##Deal with it specifly #美股P.37
                continue
            
            if topic == "財經媒體": ##Deal with it specifly #美股P.37
                continue

            os.system("mkdir ./Documents/"+key+"/"+topic)
            #print(link)

            ###give a url to paser
            url = link

            while(True): ##Add
                ###give a url to paser
                url = link
                url = url + "page" + "/" + str(id) + "/" 
                print(url)
                parse_1 = Parse()
                if parse_1.judgePageexist(url) == True: #while condition
                    #####
                    ##parser content###
                    #####
                    #airticles=parse_1.parseAirticleLink(url)
                    airticles=parse_1.parsePage(url)
                    #print(airticles)
                    parse_1.storeArticleLink(airticles,allAirticlesLink)
                    #print(airticles)
                    #print(allAirticlesLink)
                    #for title, link in airticles.items(): 
                    #    parse_1.parseArticle_and_Write(title,link) 
                else:
                    print("Page End")
                    break;
                id = id + 1

            ##Output Link and photo into jason:
            import json
            with open('links.json','w') as outputfile:
                json.dump(allAirticlesLink,outputfile,ensure_ascii=False)

            #Do sny
            #fire.Fire(parse())
            #Fire.parseArticle_and_Write(link)
        
            #Ecxute
            #parse_1 = Parse()
            #parse_1.parseArticle_and_Write(link)
