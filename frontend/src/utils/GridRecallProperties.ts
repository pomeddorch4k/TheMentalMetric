export interface GridLevelProperties {
    gridWidth: number,
    gridButtonCount: number,
    buttonFlashTime: number,
    buttonFlashCount: number
}

const GridRecallRules: Record<string | number, GridLevelProperties> = {
    1: {gridWidth: 3, gridButtonCount: 9, buttonFlashTime: 1250, buttonFlashCount: 3},
    2: {gridWidth: 3, gridButtonCount: 9, buttonFlashTime: 1250, buttonFlashCount: 3},
    3: {gridWidth: 3, gridButtonCount: 9, buttonFlashTime: 1250, buttonFlashCount: 4},
    4: {gridWidth: 3, gridButtonCount: 9, buttonFlashTime: 1250, buttonFlashCount: 4},
    5: {gridWidth: 3, gridButtonCount: 9, buttonFlashTime: 1250, buttonFlashCount: 4},
    6: {gridWidth: 4, gridButtonCount: 16, buttonFlashTime: 1250, buttonFlashCount: 5},
    7: {gridWidth: 4, gridButtonCount: 16, buttonFlashTime: 1250, buttonFlashCount: 6},
    8: {gridWidth: 4, gridButtonCount: 16, buttonFlashTime: 1000, buttonFlashCount: 8},
    9: {gridWidth: 4, gridButtonCount: 16, buttonFlashTime: 1000, buttonFlashCount: 8},
    10: {gridWidth: 4, gridButtonCount: 16, buttonFlashTime: 1000, buttonFlashCount: 9 },
    "MAX": {gridWidth: 5, gridButtonCount: 25, buttonFlashTime: 500, buttonFlashCount: 12}
}

export function findGridLevelProperties(level: number){
    return GridRecallRules[level] ?? GridRecallRules["MAX"];
}

export const GRID_RECALL_ALLOWED_MISSES = 10;