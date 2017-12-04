################
"""
line 15: stop_word dictionary
line 13: jieba dictionary
line 19: file
"""
###############

# 引入 Jieba
import jieba


# 載入繁體詞典
jieba.set_dictionary() #(dictionary)

#Step 1：中文斷詞，去掉停用字，集合成資料集
stop_words = [] #[stop_word dictionary]
dataset = []
with open('file') as fp: #file
    for line in fp:
        words = jieba.cut(line)
        seg_sentence = " / ".join(words)
        print(seg_sentence)
        words = seg_sentence.split(" / ")
        seg_remove_stop_words = []
        for word in words:
            if (word not in stop_words):
                if word != u'\n':
                    seg_remove_stop_words.append(word)
        dataset.append(seg_remove_stop_words)
print(dataset)


_dic = []
for seg_remove_stop_words in dataset:
    for word in seg_remove_stop_words:
        if word not in _dic:
            _dic.append(word)
print(_dic)

#for word in _dic:
#    print(word)

#Step 2：將篇文章轉成向量表示(doc2vec)
dataset_vec = []
for seg_remove_stop_words in dataset:
    seg_remove_stop_words_vec = []
    for word in _dic:
        count = 0
        for word2 in seg_remove_stop_words:
            if word == word2:
                count = count+1
        seg_remove_stop_words_vec.append(count)
    print(seg_remove_stop_words_vec)
    dataset_vec.append(seg_remove_stop_words_vec)
print(dataset_vec)

#Step 3：LSA 語意分析
import numpy as np
dataset_vec = np.array(dataset_vec)
print(dataset_vec)

from scipy import linalg, diag, dot
num_dimensions = 2
u, s, vt = linalg.svd(lyrics_dataset_vec)
u = u[:, :num_dimensions]
sigma = diag(s)[:num_dimensions, :num_dimensions]
vt = vt[:num_dimensions, :]
low_rank_document_term_matrix = dot(u, dot(sigma, vt))
print(low_rank_document_term_matrix)
print(u)
print(sigma)
print(vt)

#Step 4：使用降維後的向量計算 cosin similarity
low_rank_document_term_vec = low_rank_document_term_matrix[0]
print(low_rank_document_term_vec)

from scipy import spatial
for vec in low_rank_document_term_matrix:
    score = 1 - spatial.distance.cosine(low_rank_document_term_vec, vec)
    print(score)

low_rank_document_term_vec = low_rank_document_term_matrix[5]
for vec in low_rank_document_term_matrix:
    score = 1 - spatial.distance.cosine(low_rank_document_term_vec, vec)
    print(score)

query_vector = lyrics_dataset_vec[0, :]
low_dimensional_query = dot(linalg.inv(sigma), dot(vt, query_vector))
print(low_dimensional_query)

lsa_query = dot(vt.T, dot(sigma, low_dimensional_query.T))
print(lsa_query)

for vec in low_rank_document_term_matrix:
    score = 1 - spatial.distance.cosine(lsa_query, vec)
    print(score)
