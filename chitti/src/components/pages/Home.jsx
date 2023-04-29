import React, { useState, useContext } from "react";
import "./Home.css";
import "../../App.css";

function Home() {
    const URL = "";

    const [input, setInput] = useState(null);
    const [response, setResponse] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [responseHistory, setResponseHistory] = useState([]);
    const [userName, setUserName] = useState("Katie");

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

    const handleInputChange = (newInput) => {
        setChatHistory((prevHistory) => [...prevHistory, newInput]);
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
            <li className="header">Welcome to Chitti </li>
            <li className="tagline">Our handy dandy chat bot </li>

            <div className="chat-container">
                <div className="message-history-container">
                    <ul>
                        {/* commenting out the code below because i'm experimenting with a different data structure */}
                        {/* {chatHistory.map((input, index) => (
                            <li key={index}>{input}</li>
                        ))} */}
                        {renderChatHistory()}
                        

                    </ul>
                </div>
                <form onSubmit={()=>handleSend()}>
                    <input
                        className="new-message-window"
                        onChange={(e) => setInput(e.target.value)}
                    ></input>
                    <button  type="submit" className="buttons">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
