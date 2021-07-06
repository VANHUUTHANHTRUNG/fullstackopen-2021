import React, { useState } from "react";

const Button = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ text, value, postfix = "" }) => {
    return (
        <p>
            {text} {value} {postfix}
        </p>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleClick = (stateValue, setFunction) => {
        return () => {
            setFunction(stateValue + 1);
        };
    };
    return (
        <div>
            <h1>Give feedback</h1>
            <Button text="Good" handleClick={handleClick(good, setGood)} />
            <Button
                text="Neutral"
                handleClick={handleClick(neutral, setNeutral)}
            />
            <Button text="Bad" handleClick={handleClick(bad, setBad)} />
            <br />
            <h1>Statisics</h1>
            <Statistics text="Good" value={good} />
            <Statistics text="Neutral" value={neutral} />
            <Statistics text="Bad" value={bad} />
            <Statistics text="All" value={good + bad + neutral} />
            <Statistics
                text="Average"
                value={(good - bad) / (good + bad + neutral)}
            />
            <Statistics
                text="All"
                value={good / (good + bad + neutral)}
                postfix="%"
            />
        </div>
    );
};

export default App;
