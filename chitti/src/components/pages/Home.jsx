import React, { useState, useContext } from "react";
import "./Home.css";
import "../../App.css";

function Home() {

    const URL = "";
    
    const [input, setInput] = useState(null);
    const [response, setResponse] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [responseHistory, setResponseHistory] = useState([]);


    const sendInput = async () => {
        await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        });
    }

    const getResponse = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setResponse(data);
    };

    const handleInputChange = (newInput) => {
        setChatHistory(prevHistory => [...prevHistory, newInput])
    }

///////////////////////////////
const greeting_inputs = ("hello", "hi", "hey", "what's up", "hey how's it going?", "what's poppin")
const greeting_responses = ["hello", "hi", "hey", "Hi there", "Welcome","Are you still here?"]


function greetingCheck(input) {
    const inputArray = input.split(" ")
    const respLength = parseInt(greeting_responses.length) + 1
    const i = Math.floor(Math.random() * respLength)
    
    inputArray.forEach((word) => {
        if (greeting_inputs.includes(word)) {
            return greeting_responses[i]
        } 
    }) 
}

// function handleSend()
//////////////////////////////////



    return (
        <div className="page home-page">
            <li className="header">Welcome to Chitti </li>
            <li className="tagline">Our handy dandy chat bot </li>

            <div className="chat-container">
                <div className="message-history-container">
                <ul>
                    {chatHistory.map((input, index) => (
                        <li key={index}>{input}</li>
                    ))}
                    </ul>
                </div>
                <input className="new-message-window" onChange={e => setInput(e.target.value)}></input>
                <div className = "button-div">
                <button className = "buttons">Clear</button>
                <button className = "buttons">Send</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
