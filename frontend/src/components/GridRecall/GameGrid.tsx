import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { findGridLevelProperties, type GridLevelProperties } from '../../utils/GridRecallProperties';

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
    const [currentGridSize, setCurrentGridSize] = useState<number>(3);
    const [level, setLevel] = useState<number>(1);

    const [levelCompleted, setLevelCompleted] = useState<boolean>(true);

    const [timeOfGuesses, setTimeOfGuesses] = useState<number[]>([]);

    const [correctLeft, setCorrectLeft] = useState<number>(0);

    const [timerRunning, setTimerRunning] = useState<boolean>(false);

    const [buttons, setButtons] = useState<GridButtonState[]>(generateLevelButtons(findGridLevelProperties(1)));

    function beginLevelTimer(){
        setLevelCompleted(false);
        //display the random button color changes for X amount of time
        const properties: GridLevelProperties = findGridLevelProperties(level);
        setButtons(generateLevelButtons(properties));
        setCorrectLeft(properties.buttonFlashCount);

        setTimerRunning(true);

        const timer = setTimeout(() => {
            setTimerRunning(false);
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
        console.log(flashedButtons);
        console.log(created);
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
            setTimeOfGuesses([...timeOfGuesses, timestamp]);
            if(correctLeft - 1 == 0){
                setLevel(level + 1);
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

    function toTimestamps(){
        const times = [...timeOfGuesses];
        const intitialGuess = times[0];
        const durations = [];
        for(let i = 0; i < times.length; i++){
            durations.push(times[i] - intitialGuess);
        }
        return durations;
    }

    if(levelCompleted){
        return (
            <>
                <Typography variant="h3">{level}</Typography>
                <Typography variant="body1">{toTimestamps().join("ms, ") + "ms"}</Typography>
                <Button onClick={beginLevelTimer}>Start</Button>
            </>
        )
    }

    return (
        <Box display="grid" gridTemplateColumns={`repeat(${currentGridSize}, 1fr)`} gap={2}>
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