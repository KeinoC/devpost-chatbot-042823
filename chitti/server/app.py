from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from datetime import datetime
import json
# from chatbotcorpus import generate_bot_response


app = Flask(__name__)
CORS(app)

## Storage for messages in routes
user_msg = [ "testing, testing", "testing again"]
bot_msg = [ "t t testing"]
msg_history = [""]

# creating a message model
class Message:
    def __init__(self, content, timestamp):
        self.content = content
        self.timestamp = timestamp
    
    def to_dict(self):
        return {
            'content' : self.content,
            'timestamp' : self.timestamp
        }

# functions to add message to storage
def add_user_msg(content):
    timestamp = datetime.now()
    message = Message(content, timestamp)
    user_msg.append(message.to_dict())

def generate_response(user_input):
    return "the chicken is in the coup!"




# home route
@app.route("/", methods=["GET"])
def index():
    return jsonify({"Welcome to chitti!" : "flask is running"})


# user route
@app.route("/user_messages", methods=["GET"])
def get_user_message():
    # message = "Hi, I'm Chitti. Ask me anything about ramen"
    return jsonify({"message": user_msg})

@app.route('/user_messages', methods=['POST'])
@cross_origin(origin="*", headers=["Content-Type"])  
def chat():
    # Retrieve the user input from the request payload

    request_dict = ""

    if isinstance(request.json, str):
        request_dict = json.loads(request.json)
    else:
        request_dict = request.json

    
    user_input = request_dict.get('input') #close its' request.json.get not just request.json


    add_user_msg(user_input)
    # Process the user input and generate a response using your chatbot logic
    # temporarily just sending a greeting
    response = generate_bot_response(user_input)

    # Return the response as JSO
    return jsonify({'response': response})
    response_json = jsonify({'response': response})
    response_json.headers.add('Access-Control-Allow-Origin', '*')
    response_json.headers.add('Access-Control-Allow-Headers', '*')

    return response_json

# bot route
@app.route("/bot_messages", methods=["GET"])
def get_bot_message():
    return jsonify(bot_msg)
    


if __name__ == '__main__':
    app.run(debug=True, port=5000)