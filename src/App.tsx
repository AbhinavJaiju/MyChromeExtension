import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { ChromeMessage, Sender } from "./types";

import './App.css';

const App = () => {
    const [url, setUrl] = useState<string>('');
    const [responseFromContent, setResponseFromContent] = useState<string>('');

    /**
     * Get current URL
     */
    useEffect(() => {
        const queryInfo = { active: true, currentWindow: true };

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const url: any = tabs[0].url;
            setUrl(url);
        });
    }, []);

    const sendConnection = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "send connection",
        }

        const queryInfo: chrome.tabs.QueryInfo = {
            active: true,
            currentWindow: true
        };

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const currentTabId: any = tabs[0].id;
            chrome.tabs.sendMessage(
                currentTabId,
                message,
                (response) => {
                    setResponseFromContent(response);
                });
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button onClick={sendConnection}>Send Connection</button>
                <p>Connection Sent : </p>
                <p>
                    {responseFromContent}
                </p>
            </header>
        </div>
    );
};

export default App