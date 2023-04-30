import numpy as np
import nltk
import string
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

# this block of code will open the chatbot and allow it to read from any file input. Each word from the file is converted into tokens so that every string can be read
#i dumped random data in the chatbot.txt as of 10:40pm 4/28, feel free to delete!

# tracking changes. commenting out lines below to add logic for importing multiple .txt files
# a = open('chatbot.txt','r',errors = 'ignore')
# raw_doc = a.read()
# raw_doc = raw_doc.lower() # converts the text to lowercase

# Define a list of file names to read from
file_names = ['wiki.txt', 'nutrition.txt', 'faq.txt', 'reviews.txt', 'custom.txt']

# Concatenate the contents of all the files into a single string
raw_doc = ""
for file_name in file_names:
    with open(file_name, 'r', errors='ignore') as f:
        raw_doc += f.read().lower()



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
def generate_bot_response(user_response):
    robo1_response = ' '
    TfidfVec = TfidfVectorizer(tokenizer = LemNormalize, stop_words ='english')
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

# this block of code will define the start or end of a conversation between the chatbot and the user
flag = True
print("Bot: My name is RamenBot. Let's have a conversation. Also if you want to finish the conversation, simply type 'Bye' ")
while(flag == True):
    user_response = input()
    user_response = user_response.lower()
    if(user_response != 'Bye'):
        if (user_response == 'thanks' or user_response == 'thank you'):
            flag = False
            print("Bot: You're welcome")
        else:
            if(greet(user_response) != None):
                print("Bot: " + greet(user_response))
            else:
                sent_tokens.append(user_response)
                word_tokens = word_tokens + nltk.word_tokenize(user_response)
                final_words = list(set(word_tokens))
                print("Bot: ", end = "")
                print(generate_bot_response(user_response))
                sent_tokens.remove(user_response)

else:
    flag = False
    print("Goodbye and take care!")
    
    
