################
"""
line 11: dataset
line 12: stop_word
line 19: input train data file
line 44: "" ==> string
line 56
line 62
"""
###############

import os
from gensim import corpora, models, similarities

input_train_data_file = 'data/dataset'
stop_word_file = 'data/stop_words.txt'

with open(stop_word_file) as f:
    stop_word_content = f.readlines()
stop_word_content = [x.strip() for x in stop_word_content]
stop_word_content = " ".join(stop_word_content)

dictionary = corpora.Dictionary(document.split() for document in open(input_train_data_file))
stoplist = set(stop_word_content.split())
stop_ids = [dictionary.token2id[stopword] for stopword in stoplist
            if stopword in dictionary.token2id]
dictionary.filter_tokens(stop_ids)
dictionary.compactify()

texts = [[word for word in document.split() if word not in stoplist]
         for document in open(input_train_data_file)]

# remove words that appear only once
from collections import defaultdict
frequency = defaultdict(int)
for text in texts:
    for token in text:
        frequency[token] += 1

texts = [[token for token in text if frequency[token] >= 1]
         for text in texts]

corpus = [dictionary.doc2bow(text) for text in texts]

lsi = models.LsiModel(corpus, id2word=dictionary, num_topics=28)

doc = "" 
vec_bow = dictionary.doc2bow(doc.lower().split())
vec_lsi = lsi[vec_bow]

index = similarities.MatrixSimilarity(lsi[corpus], num_features=100)
sims = index[vec_lsi]
sims = sorted(enumerate(sims), key=lambda item: -item[1])
print(sims[:5])


airticles = [];
fp = open("data/dataset")
for i, line in enumerate(fp):
    airticles.append(line)
fp.close()

url = [];
fp = open("data/url.dataset")
for i, line in enumerate(fp):
    url.append(line)
fp.close()

for lyric in sims[:5]:
    print "\n相似文章：",  airticles[airticle[0]]
    print "相似度：",  airticle[1]
    print "連結：",  url[airticle[0]]
