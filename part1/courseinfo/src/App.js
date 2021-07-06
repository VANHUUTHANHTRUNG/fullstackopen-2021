import React from "react";
// user define components

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercise}
        </p>
    );
};

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    );
};

const Content = (props) => {
    return (
        <>
            {props.parts.map((part) => (
                <Part name={part.name} exercise={part.exercise} />
            ))}
        </>
    );
};

const Total = (props) => {
    return (
        <>
            <p>
                Number of exercises{" "}
                {props.parts.reduce(
                    (result, part) => result + part.exercise,
                    0
                )}
            </p>
        </>
    );
};

const App = () => {
    const course = "Half Stack application development";
    const parts = [
        { name: "Fundamentals of React", exercise: 10 },
        { name: "Using props to pass data", exercise: 7 },
        { name: "State of a component", exercise: 14 },
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

export default App;
