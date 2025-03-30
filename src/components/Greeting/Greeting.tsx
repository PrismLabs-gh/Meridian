import './Greeting.css'

import React, { useState, useEffect } from 'react';

export function Greeting({ username }: { username: string }) {
    const greetings = [
        `Hello, ${username}!`,
        `Hi ${username}, how are you?`,
        `Hey ${username}!`,
        `Welcome, ${username}!`,
        `Hey ${username}!`,
        `Howdy, ${username}!`,
        `Good to see you, ${username}!`,
        `What's up, ${username}?`,
        `Nice to see you, ${username}!`,
        `Ahoy, ${username}!`,
    ];

    const [greeting, setGreeting] = useState(() => {
        let storedGreeting = localStorage.getItem('greeting');
        if (storedGreeting) {
            return storedGreeting
        } else {
            const newGreeting = greetings[Math.floor(Math.random() * greetings.length)];
            localStorage.setItem('greeting', newGreeting);
            return newGreeting;
        }
    });

    useEffect(() => {
        const newGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        setGreeting(newGreeting);
        localStorage.setItem('greeting', newGreeting);
    }, [username]);

    return (
    <div className="greeting-container">
        <span className="greeting-top">{greeting}</span>
        <span className="greeting-bottom">How can I help you today?</span>
    </div>
    );
}