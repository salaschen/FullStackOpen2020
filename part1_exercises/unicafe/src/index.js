import { React, useState } from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
    return (
        <div>
            <h2> {props.text} </h2>
        </div>
    );
};

const Button = (props) => {
    const { text, handler } = props;

    return <button onClick={handler}>{text}</button>;
};

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.count}</td>
        </tr>
    );
};

const Statistics = (props) => {
    const { good, bad, neutral, score, total } = props.state;

    const calculate_average = () => (total === 0 ? 0 : score / total);

    const calculate_positive = () => (total === 0 ? 0 : (100.0 * good) / total);

    if (total === 0) {
        return <div> No feedback given </div>;
    } else {
        return (
            <div>
                <table>
                    <tbody>
                        <Statistic name="good" count={good} />
                        <Statistic name="neutral" count={neutral} />
                        <Statistic name="bad" count={bad} />
                        <Statistic name="all" count={total} />
                        <Statistic name="average" count={calculate_average()} />
                        <Statistic
                            name="positive"
                            count={`${calculate_positive()}%`}
                        />
                    </tbody>
                </table>
            </div>
        );
    }
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);

    // return a function that updates the specific hook
    const addCount = (counter, modFunc, scoreContribution) => {
        return () => {
            setTotal(total + 1);
            setScore(score + scoreContribution);
            modFunc(counter + 1);
        };
    };

    const state = {
        good: good,
        neutral: neutral,
        bad: bad,
        score: score,
        total: total,
    };

    return (
        <div>
            <Header text="give feedback" />
            <Button text="good" handler={addCount(good, setGood, 1)} />
            <Button text="neutral" handler={addCount(neutral, setNeutral, 0)} />
            <Button text="bad" handler={addCount(bad, setBad, -1)} />
            <Header text="statistics" />
            <Statistics state={state} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
