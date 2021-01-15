import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
    return <h1> You're in {props.course} </h1>;
};

const Part = (props) => (
    <div>
        {" "}
        <p>
            {" "}
            {props.part} {props.exercises}{" "}
        </p>
    </div>
);

const Content = (props) => {
    return (
        <div>
            <Part
                part={props.parts[0].name}
                exercises={props.parts[0].exercises}
            />
            <Part
                part={props.parts[1].name}
                exercises={props.parts[1].exercises}
            />
            <Part
                part={props.parts[2].name}
                exercises={props.parts[2].exercises}
            />
        </div>
    );
};

const Footer = (props) => {
    var data = props.parts; // array
    var result = 0;
    for (var i of data) {
        result += i.exercises;
    }
    return (
        <div>
            <p> Number of Exercises: {result}</p>
        </div>
    );
};

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Footer parts={course.parts} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
