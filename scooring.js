import {team1,team2,team3,team4,team5,team6} from "./formingGroups.js"


function scooring(t1,t2)
{
    const numbersOfTries = [1,1,2,2,2,3,3,3,3,4,4,5,5,6,7]
    const staminaTeam1 = [0,0,1,1,1,1,1,1,1]
    const staminaTeam2 = [0,0,0,1,1,1,1,1,1]
    const staminaTeam3 = [0,0,0,0,1,1,1,1,1]
    const staminaTeam4 = [0,0,0,0,0,1,1,1,1]
    const staminaTeam5 = [0,0,0,0,0,0,1,1,1]
    const staminaTeam6 = [0,0,0,0,0,0,0,1,1]
    let goalTeam1 = 0
    let goalTeam2 = 0

    for(let i=0;i<numbersOfTries[Math.floor(Math.random()*numbersOfTries.length)];i++)
    {
        if(team1.includes(t1))
        {
            goalTeam1+=staminaTeam1[Math.floor(Math.random()*staminaTeam1.length)]
        }
        if(team1.includes(t2))
        {
            goalTeam2+=staminaTeam1[Math.floor(Math.random()*staminaTeam1.length)]
        }
        if(team2.includes(t1))
        {
            goalTeam1+=staminaTeam2[Math.floor(Math.random()*staminaTeam2.length)]
        }
        if(team2.includes(t2))
        {
            goalTeam2+=staminaTeam2[Math.floor(Math.random()*staminaTeam2.length)]
        }
        if(team3.includes(t1))
        {
            goalTeam1+=staminaTeam3[Math.floor(Math.random()*staminaTeam3.length)]
        }
        if(team3.includes(t2))
        {
            goalTeam2+=staminaTeam3[Math.floor(Math.random()*staminaTeam3.length)]
        }
        if(team4.includes(t1))
        {
            goalTeam1+=staminaTeam4[Math.floor(Math.random()*staminaTeam4.length)]
        }
        if(team4.includes(t2))
        {
            goalTeam2+=staminaTeam4[Math.floor(Math.random()*staminaTeam4.length)]
        }
        if(team5.includes(t1))
        {
            goalTeam1+=staminaTeam5[Math.floor(Math.random()*staminaTeam5.length)]
        }
        if(team5.includes(t2))
        {
            goalTeam2+=staminaTeam5[Math.floor(Math.random()*staminaTeam5.length)]
        }
        if(team6.includes(t1))
        {
            goalTeam1+=staminaTeam6[Math.floor(Math.random()*staminaTeam6.length)]
        }
        if(team6.includes(t2))
        {
            goalTeam2+=staminaTeam6[Math.floor(Math.random()*staminaTeam6.length)]
        }
    }
    return [goalTeam1,goalTeam2]
}


export {scooring}