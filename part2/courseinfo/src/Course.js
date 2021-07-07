const Header = (props) => {
    return <h1>{props.name}</h1>;
};

const Total = (props) => {
    //    const sum =
    //props.parts[0].exercises +
    //props.parts[1].exercises +
    //props.parts[2].exercises;
    const sum = props.parts.reduce(
        (result, currentValue) => result + currentValue.exercises,
        0
    );
    return <p><b>Total of {sum} exercises </b></p>;
};

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    );
};

const Content = (props) => {
    return (
        <div>
            {props.parts.map((part) => (
                <Part part={part} />
            ))}
        </div>
    );
};

const Course = (props) => {
    return (
        <div>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    );
};

export {Course, Header};
