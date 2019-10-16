import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// STAR MATCH - V3

const StarsDisplay = props => (
    <>
        {utils.range(1, props.count).map(starId =>
            <div key={starId} className="star" />
        )}
    </>
);

const PlayNumber = props => (
    <button
        className="number"
        style={{backgroundColor:colors[props.status]}}
        onClick={() => props.onClick(props.number,props.status)}>
        {props.number}
    </button>
);

const PlayAgain = props => (
    <div className="game-done">
        <div
            className="message"
            style={{color: props.gameStatus === 'lost' ? 'red' : 'green'}}>
            {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
        </div>
        <button onClick={props.onClick}>Play Again</button>
    </div>
);

//Custom Hook
const useGameState = () => {
    //web hooks
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNumbs, setAvailableNumbs] = useState(utils.range(1, 9));
    const [candidateNumbs, setCandidateNumbs] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);
    //sideEffect, setTimeout,setInterval
    useEffect(() => {
        if(secondsLeft > 0 && availableNumbs.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            },1000);
            return () => clearTimeout(timerId);
        }
    });

    const setGameState = (newCandidateNumbs) => {
        if (utils.sum(newCandidateNumbs) !== stars) {
            setCandidateNumbs(newCandidateNumbs);
        } else {
            //redraw stars (from whats available)
            const newAvailableNumbs = availableNumbs.filter(
                n => !newCandidateNumbs.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNumbs, 9));
            setAvailableNumbs(newAvailableNumbs);
            setCandidateNumbs([]);
        }
    };

    return { stars, availableNumbs, candidateNumbs, secondsLeft, setGameState };
};

const Game = (props) => {
    const {
        stars,
        availableNumbs,
        candidateNumbs,
        secondsLeft,
        setGameState,
    } = useGameState();

    //computation logic
    const candidateAreWrong = utils.sum(candidateNumbs) > stars;
    const gameStatus = availableNumbs.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'active';

    //umount n remount better using game component
    // const resetGame = () => {
    //     setStars(utils.random(1,9));
    //     setAvailableNumbs(utils.range(1,9));
    //     setCandidateNumbs([]);
    // };

    const numberStatus = (number) => {
        if(!availableNumbs.includes(number)) {
            return 'used';
        }
        if(candidateNumbs.includes(number)) {
            return candidateAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    const onNumberClick = (number,currentStatus) => {
        if (currentStatus === 'used' || gameStatus !== 'active' ) {
            return;
        }

        //candidateNumbs & setting values
        const newCandidateNumbs =
            currentStatus ==='available'
                ? candidateNumbs.concat(number)
                : candidateNumbs.filter(cn => cn !== number);

        setGameState(newCandidateNumbs);
    };

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="bodyGame">
                <div className="left">
                    {gameStatus !== 'active' ? (
                        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
                    ) : (
                        <StarsDisplay count={stars} />
                    )}
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        <PlayNumber
                            key={number}
                            number={number}
                            status={numberStatus(number)}
                            onClick={onNumberClick}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

const StarMatch = () => {
    const [gameId, setGameId] = useState(1);
    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>;
};

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

// Math science
const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
        const sets = [[]];
        const sums = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0, len = sets.length; j < len; j++) {
                const candidateSet = sets[j].concat(arr[i]);
                const candidateSum = utils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length - 1)];
    },
};

ReactDOM.render(<StarMatch />, document.getElementById('game'));
