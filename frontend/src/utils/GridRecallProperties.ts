export interface GridLevelProperties {
    gridWidth: number,
    buttonFlashTime: number,
    buttonFlashCount: number
}

const GridRecallRules: Record<string | number, GridLevelProperties> = {
    1: {gridWidth: 3, buttonFlashTime: 1500, buttonFlashCount: 4},
    2: {gridWidth: 3, buttonFlashTime: 1500, buttonFlashCount: 4},
    3: {gridWidth: 3, buttonFlashTime: 1500, buttonFlashCount: 4},
    4: {gridWidth: 3, buttonFlashTime: 1500, buttonFlashCount: 4},
    5: {gridWidth: 3, buttonFlashTime: 1500, buttonFlashCount: 4},
    "MAX": {gridWidth: 5, buttonFlashTime: 1000, buttonFlashCount: 12}
}

export function findGridLevelProperties(level: number){
    return GridRecallRules[level] ?? GridRecallRules["MAX"];
}

export const GRID_RECALL_ALLOWED_MISSES = 10;