import React, { useState, useContext } from "react";
import "./Home.css";
import "../../App.css";

function Home() {

    const URL = "";
    
    const [input, setInput] = useState(null);
    const [response, setResponse] = useState(null);
    const [chatHistory, setChatHistory] = useState("");


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



    return (
        <div className="page home-page">
            <li className="header">Welcome to Chitti </li>
            <li className="tagline">Our handy dandy chat bot </li>

            <div className="chat-container">
                <div className="message-history-container"></div>
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
