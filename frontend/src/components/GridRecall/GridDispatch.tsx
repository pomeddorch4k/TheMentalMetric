import { GRID_RECALL_ALLOWED_MISSES } from "../../utils/GridRecallProperties"


export interface GridRecallState {
    level: number,
    score: number,
    timesBetweenPresses: Map<number, number[]>,
    missesLeft: number
}

export const inititalGridRecallState = {
    level: 0,
    score: 0,
    timesBetweenPresses: new Map<number, number[]>(),
    missesLeft: GRID_RECALL_ALLOWED_MISSES
}

type GridRecallAction = 
    | { type: "NextLevel", payload: number[]}
    | { type: "IncrementScore", payload: number }

function addTimesToMap(map: Map<number, number[]>, timestamps: number[], level: number){
    const newMap = new Map(map);
    newMap.set(level, [...timestamps]);
    return newMap;
}

export const GridRecallReducer = (state: GridRecallState, action: GridRecallAction) => {
    switch(action.type){
        case "NextLevel": return { 
            ...state, 
            level: state.level + 1,
            timesBetweenPresses: addTimesToMap(state.timesBetweenPresses, action.payload, state.level)
        }
        case "IncrementScore": return { ...state, score: state.score + 1 }
    }
}