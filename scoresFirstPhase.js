import {groups} from "./formingGroups.js"
import { scooring } from "./scooring.js"

const scrores = [
    [
        scooring(groups[0][0],groups[0][1]),
        scooring(groups[0][2],groups[0][3]),
        scooring(groups[0][0],groups[0][2]),
        scooring(groups[0][1],groups[0][3]),
        scooring(groups[0][0],groups[0][3]),
        scooring(groups[0][1],groups[0][2])
    ],
    [
        scooring(groups[1][0],groups[1][1]),
        scooring(groups[1][2],groups[1][3]),
        scooring(groups[1][0],groups[1][2]),
        scooring(groups[1][1],groups[1][3]),
        scooring(groups[1][0],groups[1][3]),
        scooring(groups[1][1],groups[1][2])
    ],

    [
        scooring(groups[2][0],groups[2][1]),
        scooring(groups[2][2],groups[2][3]),
        scooring(groups[2][0],groups[2][2]),
        scooring(groups[2][1],groups[2][3]),
        scooring(groups[2][0],groups[2][3]),
        scooring(groups[2][1],groups[2][2])
        
    ],
    [
        scooring(groups[3][0],groups[3][1]),
        scooring(groups[3][2],groups[3][3]),
        scooring(groups[3][0],groups[3][2]),
        scooring(groups[3][1],groups[3][3]),
        scooring(groups[3][0],groups[3][3]),
        scooring(groups[3][1],groups[3][2])
    ],
    [
        scooring(groups[4][0],groups[4][1]),
        scooring(groups[4][2],groups[4][3]),
        scooring(groups[4][0],groups[4][2]),
        scooring(groups[4][1],groups[4][3]),
        scooring(groups[4][0],groups[4][3]),
        scooring(groups[4][1],groups[4][2])
    ],

    [
        scooring(groups[5][0],groups[5][1]),
        scooring(groups[5][2],groups[5][3]),
        scooring(groups[5][0],groups[5][2]),
        scooring(groups[5][1],groups[5][3]),
        scooring(groups[5][0],groups[5][3]),
        scooring(groups[5][1],groups[5][2])
    ],

    [
        scooring(groups[6][0],groups[6][1]),
        scooring(groups[6][2],groups[6][3]),
        scooring(groups[6][0],groups[6][2]),
        scooring(groups[6][1],groups[6][3]),
        scooring(groups[6][0],groups[6][3]),
        scooring(groups[6][1],groups[6][2])
    ],

    [
        scooring(groups[7][0],groups[7][1]),
        scooring(groups[7][2],groups[7][3]),
        scooring(groups[7][0],groups[7][2]),
        scooring(groups[7][1],groups[7][3]),
        scooring(groups[7][0],groups[7][3]),
        scooring(groups[7][1],groups[7][2])
    ]
]

export {scrores}
