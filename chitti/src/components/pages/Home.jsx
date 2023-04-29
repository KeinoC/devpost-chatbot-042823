import React, { useState, useContext } from "react";
import "./Home.css";
import "../../App.css";

function Home() {
    const URL = "localhost:5000/chitti/message";

    const [input, setInput] = useState(null);
    const [response, setResponse] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [responseHistory, setResponseHistory] = useState([]);
    const [userName, setUserName] = useState("Katie");

    console.log("input:", input)
    console.log("input history:", chatHistory)

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send the input value to the backend
        sendInput(input);

        // Update the input history
        setChatHistory((prevHistory) => [...prevHistory, input]);

        // Clear the input value
        setInput('');
    };

    // need API endpoints established to request from backend

    const sendInput = async () => {
        await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        });
    };

    const getResponse = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setResponse(data);
    };

    ///////////////////////////////
    const greeting_inputs =
        ("hello",
        "hi",
        "hey",
        "what's up",
        "hey how's it going?",
        "what's poppin");
    const greeting_responses = [
        "hello",
        "hi",
        "hey",
        "Hi there",
        "Welcome",
        "Are you still here?",
    ];

    const [currUserMsg, setCurrUserMsg] = useState("")



    function greetingCheck(input) {
        const inputArray = input.split(" ");
        const respLength = parseInt(greeting_responses.length) + 1;
        const i = Math.floor(Math.random() * respLength);

        inputArray.forEach((word) => {
            if (greeting_inputs.includes(word)) {
                return greeting_responses[i];
            }
        });
    }

    function handleSend() {
        const timeStamp = "placeholder date"
        const newHistoryObj = {sender : userName, message : input}
        setChatHistory((prevHistory) => [...prevHistory, newHistoryObj ])
    }

    function renderChatHistory() {
        console.log(chatHistory)
        chatHistory.map((chatObj) => {
            // const time = chatObj.time
            const sender = chatObj.sender
            const message = chatObj.message

            console.log(sender, message)

            return (
                <div className = "chat-instance">
                    {sender}: {message}
                </div>
            )
        })
    }

    console.log(renderChatHistory())
    console.log(input)
    console.log(chatHistory)
    //////////////////////////////////

    return (
        <div className="page home-page">
            <div className="head">
            <div>
            <li className="header">Welcome to Chitti </li>
            <li className="tagline">The Ramen Expert</li>
            </div>
            <img className="panda" src="https://www.freepnglogos.com/uploads/panda-png/panda-clip-art-clkerm-vector-clip-art-online-27.png"></img>
            </div>
            
            <div class="section">
            <img className="ramen-img" src="https://img.freepik.com/premium-vector/hand-drawn-cute-ramen-noodle-illustration-design-vector_90573-539.jpg?w=2000"></img>
            <div className="chat-container">
                <div className="message-history-container">
                    <ul>
                        <li>Chatbot: Hi! Ask me anything about Ramen noodles</li>
                        {chatHistory.map((input, index) => (
                            <li key={index}>You: {input}</li>
                            ))}
                        
                        <li>{response}</li>

                        {/* commenting out the code below because i'm experimenting with a different data structure */}
                        {/* {renderChatHistory()} */}


                    </ul>
                </div>
                <form onSubmit={handleSubmit} >
                    <input
                        value={input}
                        className="new-message-window"
                        onChange={handleInputChange}
                    ></input>
                    <button type="submit" className="buttons">Send</button>
                </form>
            </div>

            </div>
        </div>
    );
}

export default Home;
