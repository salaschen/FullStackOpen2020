import {React, useState} from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
    const text = props.text;
    const handler = props.handler ;

    return (
        <button onClick={handler}> {text} </button>
    )
} ;

const Header = (props) => {
    const text = props.text ; 
    return (
        <div> 
            <h1> {text} </h1>
        </div>
    )
} ;

const AnecdoteDisplay = (props) => {
    const { text, numVotes } = props ; 
    return (
        <div>        
            <div>{text}</div>
            <div>has {numVotes} votes</div>
        </div>
    ) ;
} ;

const App = (props) => {
    const anecdotes = props.anecdotes ; 
    const [selected, setSelected] = useState(0) ;
    const [votes, setVotes] = useState((new Array(anecdotes.length).fill(0))) ;
    // let mostVoteId = 0 ; // failed
    const [mostVoteId, setMostVoteId] = useState(0) ;

    const nextHandler = () => {
        let nextAnecdotes = Math.floor(Math.random() * anecdotes.length) ; 
        while (nextAnecdotes === selected) {
            nextAnecdotes = Math.floor(Math.random() * anecdotes.length) ;
        }
        setSelected(nextAnecdotes) ;
    } ;

    const voteHanlder = () => {
        let nextVotes = { ...votes} ; 
        nextVotes[selected] += 1 ;
        setVotes(nextVotes) ; 
        if (nextVotes[selected] > nextVotes[mostVoteId]) {
            setMostVoteId(selected) ; 
        }
    } ;

    return (
        <div>
            <Header text="Anecdotes of the day" />
            <AnecdoteDisplay text={props.anecdotes[selected]} numVotes={votes[selected]} />
            <Button text="vote" handler={voteHanlder} />
            <Button text="next anecdotes" handler={nextHandler} />
            <Header text="Anecdotes with most votes" />
            <AnecdoteDisplay text={anecdotes[mostVoteId]} numVotes={votes[mostVoteId]} />
        </div>
    )
};

const anecdotes = [
    'If it hurts, do it more often', 
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
