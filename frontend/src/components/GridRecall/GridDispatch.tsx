import { GRID_RECALL_ALLOWED_MISSES } from "../../utils/GridRecallProperties"


interface GridRecallState {
    level: number,
    state: number,
    timesBetweenPresses: number[],
    missesLeft: number
}

const inititalGridRecallState = {
    level: 0,
    state: 0,
    timesBetweenPresses: [],
    missesLeft: GRID_RECALL_ALLOWED_MISSES
}

type GridRecallAction = 
    | { type: "NextLevel" }
    | { type: "IncrementScore", payload: number }