# -*- coding: utf-8 -*-
from collections import defaultdict
from gensim import corpora
import pandas as pd
import numpy as np
import re
def buscar(querry,documents):
    # remove common words and tokenize
    stoplist = set('for a of the and to in'.split())
    texts = [
        [word for word in document.lower().split() if word not in stoplist]
        for document in documents
    ]

    # remove words that appear only once
    frequency = defaultdict(int)
    for text in texts:
        for token in text:
            frequency[token] += 1

    texts = [
        [token for token in text if frequency[token] > 1]
        for text in texts
    ]

    dictionary = corpora.Dictionary(texts)
    corpus = [dictionary.doc2bow(text) for text in texts]

    from gensim import models
    lsi = models.LsiModel(corpus, id2word=dictionary, num_topics=2)

    doc = querry
    vec_bow = dictionary.doc2bow(doc.lower().split())
    vec_lsi = lsi[vec_bow]  # convert the query to LSI space


    from gensim import similarities
    index = similarities.MatrixSimilarity(lsi[corpus])  # transform corpus to LSI space and index it


    sims = index[vec_lsi]  # perform a similarity query against the corpus

    sims = sorted(enumerate(sims), key=lambda item: -item[1])
    results = []
    for i, s in enumerate(sims):
        if (s[1] > 0.999):
            results.append({'id': str(s[0]),
                    'similarida': str(s[1]),
                    'documento': documents[i] })
            
    return results


document = []
f = open("teste_not.txt", "r")
for line in f:
    document.append(line)

result = buscar("Abraham Lincoln's assassination",document)
print(result)