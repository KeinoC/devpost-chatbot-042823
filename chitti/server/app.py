from flask import Flask, jsonify, request

app = Flask(__name__)

# @app.route("/chitti/message", method=["GET"])
# def get_message():
#     message = "Hi, I'm Chitti. Ask me anything about ramen"
#     return jsonify({"message": message})

@app.route('/chitti/message', methods=['POST'])
def chat():
    # Retrieve the user input from the request payload
    user_input = request.json['input']

    # Process the user input and generate a response using your chatbot logic
    # temporarily just sending a greeting
    response = "Hello there!"

    # Return the response as JSON
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run()