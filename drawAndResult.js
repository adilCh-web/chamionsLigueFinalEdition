import {scooring} from "./scooring.js"




function drawAndResult(teams,numberOfTeams,btn)
{
    let qualifiedTeam = []
    if(teams.length == numberOfTeams)
    {
        btn.setAttribute('disabled', 'disabled')
        let decrease = Number(numberOfTeams-1)
        document.getElementById("nextRoundsTeam1Div").innerHTML= document.getElementById("nextRoundsTeam1Div").innerHTML + "<hr>" + "<hr>" +"<br>"

        document.getElementById("nextRoundsResultDiv").innerHTML= document.getElementById("nextRoundsResultDiv").innerHTML + "<hr>" + "<hr>" +"<br>"

        document.getElementById("nextRoundsTeam2Div").innerHTML= document.getElementById("nextRoundsTeam2Div").innerHTML + "<hr>" + "<hr>" + "<br>"


        for(let i =0;i<numberOfTeams/2;i++)
        {   
            document.getElementById("nextRoundsTeam1Div").innerHTML = document.getElementById("nextRoundsTeam1Div").innerHTML+ "<br>" + teams[i]

            document.getElementById("nextRoundsTeam2Div").innerHTML = document.getElementById("nextRoundsTeam2Div").innerHTML + "<br>" + teams[decrease] 
            console.log(teams[decrease])
 

            let id = Math.random()
            let button = document.createElement("button")
            button.id = id
            let result = resultThroughTime(scooring(teams[i],teams[decrease])[0],scooring(teams[i],teams[decrease])[1],button,id)
            

            if(result[0] > result[1])
            {
                qualifiedTeam.push(teams[i])

            }
            else if(result[0] < result[1])
            {
                qualifiedTeam.push(teams[decrease])
            }
            else
            {
                let index = Math.floor(Math.random()*2)
                qualifiedTeam.push([teams[i],teams[decrease]][index])
                let penalties = [[4,1],[3,0],[5,4],[4,2],[3,1],[6,5]][Math.floor(Math.random()*6)]

                if(index===0)
                {

                    result = `(${penalties[0]}) `+ result + ` (${penalties[1]})`
                }
                else
                {
                    result = `(${penalties[1]}) ` + result + ` (${penalties[0]})`
                }
            }

            document.getElementById("nextRoundsResultDiv").innerHTML =document.getElementById("nextRoundsResultDiv").innerHTML+ "<br>" + result.toString().replace(","," - ") 

            decrease-=1


        }
        console.log(qualifiedTeam)
        return qualifiedTeam
        
    }

}

export {drawAndResult}