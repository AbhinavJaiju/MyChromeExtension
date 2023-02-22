import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
    let push = useNavigate();
    return (
        <div className="App">
            <header className="App-header">
                <p>About</p>
                <button onClick={() => {
                    push('/')
                }}>Home page
                </button>
            </header>
        </div>
    )
}

export default About
