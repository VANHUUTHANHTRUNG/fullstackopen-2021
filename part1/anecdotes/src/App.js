import React, { useState } from "react";

const Button = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
    ];

    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
    const [selected, setSelected] = useState(0);
    const [mostVoted, setMostVoted] = useState(0);
    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    };
    const handleClickVote = () => {
        const vote_copy = [...votes];
        vote_copy[selected] += 1;
        setVotes(vote_copy);
        setMostVoted(vote_copy.indexOf(Math.max(...vote_copy)));
    };
    return (
        <div>
            <h1> Anecdote of the day </h1>
            <p> {anecdotes[selected]} </p>
            <p> has {votes[selected]} votes</p>
            <Button handleClick={handleClickVote} text="vote" />
            <Button
                handleClick={() =>
                    setSelected(getRandomIntInclusive(0, anecdotes.length - 1))
                }
                text="next anecdote"
            />
            <br />

            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[mostVoted]}</p>
            <p>has {votes[mostVoted]} votes</p>
        </div>
    );
};

export default App;
