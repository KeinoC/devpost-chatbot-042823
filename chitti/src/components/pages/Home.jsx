import React, { useState, useContext } from "react";
import "./Home.css";
import "../../App.css";

function Home() {
    return (
        <div className="page home-page">
            <li className="header">Welcome to Chitti </li>
            <li className="tagline">Our handy dandy chat bot </li>

            <div className="chat-container">
                <div className="message-history-container"></div>
                <input className="new-message-window"></input>
                <div className = "button-div">
                <button className = "buttons">Clear</button>
                <button className = "buttons">Send</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
