import numpy as np
import nltk
import string
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# this block of code will open the chatbot and allow it to read from any file input. Each word from the file is converted into tokens so that every string can be read
#i dumped random data in the chatbot.txt as of 10:40pm 4/28, feel free to delete!

a = open('chatbot.txt','r',errors = 'ignore')
raw_doc = a.read()
raw_doc = raw_doc.lower() # converts the text to lowercase
nltk.download('punkt') # uses the Punkt tokenizer to tokenize each sentence
nltk.download('wordnet') # using a word dictionary (WordNet in this case)
sent_tokens = nltk.sent_tokenize(raw_doc) # reads doc and converts into list of sentences
word_tokens = nltk.word_tokenize(raw_doc) # reads and converts doc into list of words


# Lemma and the lemmatizer is used to preprocess the text
lemmer = nltk.stem.WordNetLemmatizer()

def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]
remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

# this block of code is for the greeting function
greeting_inputs = ("hello", "hi", "hey", "what's up", "hey how's it going?", "what's poppin")
greeting_responses = ["hello", "hi", "hey", "Hi there", "Welcome","Are you still here?"]
def greet(sentence):
    
    for word in sentence.split():
        if word.lower() in greeting_inputs:
            return random.choice(greeting_responses)
        
# this block of code is for the response that the chatbot can give if the user enters a phrase that the chatbot does not recognize
def response(user_response):
    robo1_repsonse = ' '
    TfidfVec = TfidfVectorizer(tokenizer = LemNormailize, stop_words ='english')
    tfidf = TfidfVec.fit_transform(sent_tokens)
    values = cosine_similarity(tfidf[-1], tfidf)
    idx = values.argsort()[0][-2]
    flat = values.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if(req_tfidf == 0):
        robo1_response = robo1_response + "Sorry, I don't understand what you are saying."
        return robo1_response
    else:
        robo1_response = robo1_response + sent_tokens[idx]
        return robo1_response

    