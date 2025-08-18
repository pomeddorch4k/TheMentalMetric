import { Box, Button, Typography } from '@mui/material';
import { useReducer, useState } from 'react';
import { findGridLevelProperties, type GridLevelProperties } from '../../utils/GridRecallProperties';
import { GridRecallReducer, inititalGridRecallState, type GridLevelStats } from './GridDispatch';
import React from 'react';

/*
Stats to gather:
    - time between correct guesses
        starts after the first correct guess of round
    - time until first correct guess (count at each level)
    - recall speed (total time from end of time to completed level)
    - error rate (per level: wrong / total flashed buttons)
    - grid performance
        * count the error rate by the exact location of the button
        * count each time a button was chosen, and when each button was guessed
*/

enum ButtonState {
    NONE = 0,
    FLASHED = 1,
    GUESSED_CORRECT = 2,
    GUESSES_INCORRECT = 3,
}

interface GridButtonState {
    index: number,
    state: ButtonState
}

const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

function getBackgroundColor(state: ButtonState, isTimerRunning: boolean){
    if(state == 1 && isTimerRunning) return "#ffffffff";
    if(state == 2) return "#285523ff";
    if(state == 3) return "#d34a4aff";
    return "#4559cbff";
}

/*
IMPORTANT NOTE: this is just testing, the actual approach has to be cleaner
*/
const GameGrid: React.FC = () => {
    const [gameState, gameDispatch] = useReducer(GridRecallReducer, inititalGridRecallState);

    const [levelCompleted, setLevelCompleted] = useState<boolean>(true);

    const [correctLeft, setCorrectLeft] = useState<number>(0);

    const [timerRunning, setTimerRunning] = useState<boolean>(false);

    const [buttons, setButtons] = useState<GridButtonState[]>(generateLevelButtons(findGridLevelProperties(1)));

    function beginLevelTimer(){
        setLevelCompleted(false);
        //display the random button color changes for X amount of time
        const properties: GridLevelProperties = findGridLevelProperties(gameState.level);
        setButtons(generateLevelButtons(properties));
        setCorrectLeft(properties.buttonFlashCount);

        setTimerRunning(true);

        const timer = setTimeout(() => {
            setTimerRunning(false);
            gameDispatch({ type: "StartLevel" })
        }, properties.buttonFlashTime);

        return () => clearTimeout(timer);
    }

    function generateLevelButtons(properties: GridLevelProperties){
        const flashesLeft = properties.buttonFlashCount;
        let flashedButtons: number[] = [];
        for(let i = 0; i < flashesLeft; i++){
            let rand = getRandomNumber(0, properties.gridWidth * properties.gridWidth);
            if(flashedButtons.includes(rand)){
                i--;
                continue;
            }
            flashedButtons.push(rand);
        }

        let created: GridButtonState[] = [];
        for(let i = 0; i < properties.gridWidth * properties.gridWidth; i++){
            created.push({index: i, state: flashedButtons.includes(i) 
                ? ButtonState.FLASHED : ButtonState.NONE});
        }
        return created;
    }

    function handleGridButtonClick(index: number){
        const timestamp = Date.now();
        if(timerRunning) return;
        let array = [...buttons];
        const buttonIndex = array.map(b => b.index).indexOf(index);
        if(buttonIndex == -1) return;

        if(array[buttonIndex].state == ButtonState.GUESSED_CORRECT) return;

        if(array[buttonIndex].state == ButtonState.FLASHED){
            array[buttonIndex].state = ButtonState.GUESSED_CORRECT;
            gameDispatch({ type: "CorrectGuess", payload: { timestamp: timestamp, index: index }})

            if(correctLeft - 1 == 0){
                gameDispatch({type: "IncrementLevel"})
                setLevelCompleted(true);
                setCorrectLeft(0);
            }else{
                setCorrectLeft(correctLeft - 1);
            }
        }else{
            array[buttonIndex].state = ButtonState.GUESSES_INCORRECT;
        }
        setButtons(array);
    }

    function toTimestamps(times: number[]){
        let intitialGuess = times[0];
        const durations = [];
        for(let i = 1; i < times.length; i++){
            durations.push(times[i] - intitialGuess);
            intitialGuess = times[i];
        }
        return durations;
    }

    function average(times: number[]){
        return times.reduce((acc, curr) => acc + curr, 0) / times.length;
    }

    if(levelCompleted){
        return (
            <>
                <Typography variant="h3">Next Level: {gameState.level}</Typography>
                <br/>
                {Array.from(gameState.levelStats.values()).map((stats: GridLevelStats) => {
                    return (
                        <React.Fragment key={stats.level}>
                            <Typography variant="h5">Level {stats.level} Stats</Typography>
                            <Typography variant="body1">Time Until First Guess: {stats.timeOfGuesses[0] - stats.startTime}ms</Typography>
                            <Typography variant="body1">Time Between Guesses: {toTimestamps(stats.timeOfGuesses).join("ms, ")}ms</Typography>
                            <Typography variant="body1">Avg. Guess Time: {average(toTimestamps(stats.timeOfGuesses))}ms</Typography>
                            <Typography variant="body1">Total Time: {stats.timeOfGuesses[stats.timeOfGuesses.length - 1] - stats.startTime}ms</Typography>
                            <br/>
                        </React.Fragment>
                    )
                })}
                <Button onClick={beginLevelTimer}>Start</Button>
            </>
        )
    }

    return (
        <Box display="grid" gridTemplateColumns={`repeat(${findGridLevelProperties(gameState.level).gridWidth}, 1fr)`} gap={2}>
                {buttons.map((b: GridButtonState) => {
                    return (
                        <Button key={b.index} onClick={() => handleGridButtonClick(b.index)}
                            sx={{height: "35px", width: "35px", border: "1px solid black", background: 
                            getBackgroundColor(b.state, timerRunning), color: "white"}}>
                        </Button>
                    )
                })}
            </Box>
    )
}

export default GameGrid;