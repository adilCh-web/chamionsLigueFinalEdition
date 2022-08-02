import { scooring } from "./scooring.js"
import {groups,totalTeams} from "./formingGroups.js"
import {scrores} from "./scoresFirstPhase.js"


let db = new Localbase("db")

console.log(totalTeams.length)
document.getElementById("delete").addEventListener("click",()=>
{
    db.collection('winners').delete()
    for(let i=0;i<totalTeams.length;i++)
    {
        db.collection("winners").add({team:totalTeams[i],point:0})
    }
})
var winner
let teams16 = []
var scooring16 = []
var teams8 = []
var scooring8 = []
let teams4 = []
var scooring4 = []
let finalTeams = []
var scooringFinal = []

let playedGame=[[],[],[],[],[],[],[],[]]

let groupNr = 1

let startGameAudio = new Audio("./audio/Soccer_Whistle_Sound_Effect.mp3")
let goalAudio = new Audio("./audio/football-cheer-fan-applause-go.m4a")
let championsLigueSong = new Audio("./audio/UEFA_Champions_League_Theme_Song.mp3")




function printDatainTable()
{
    
    var element = document.getElementById("tableGroup"+groupNr)


    if( typeof(element) != 'undefined' && element != null)
    {
        element.style.display = "block"

    }
    else
    {
        let indicesTeam1 = [0,2,0,1,0,1]
        let indicesTeam2 = [1,3,3,2,2,3]
        let table = document.createElement("table")
        table.className ="firstRound"
        table.id = "tableGroup"+groupNr
        for(let i=1;i<7;i++)
        {
            
            let row = document.createElement("tr")
            let cellData1 = document.createElement("td")
            cellData1.id = "team"+ i+ "group"+groupNr
            cellData1.innerHTML =  groups[groupNr-1][indicesTeam1[i-1]] 
 
            let cellData2 = document.createElement("td")
            let btn =document.createElement("button")
            let lbl =document.createElement("label")
            btn.innerHTML="Result";
            lbl.innerHTML = "0 Mins"
            btn.id="r"+ i+"group"+groupNr
            if(i===1)
            {
                btn.disabled=false
            }
            else
            {
                btn.disabled=true
            }
            btn.className = "buttonsClass"
            lbl.className="span"
            lbl.id = "timer"+i+"group"+groupNr
            cellData2.appendChild(btn)
            cellData2.appendChild(lbl)

            let cellData3 = document.createElement("td")
            cellData3.id = "teamAgainst"+ i+ "group"+groupNr
            cellData3.innerHTML = groups[groupNr-1][indicesTeam2[i-1]] 

            row.appendChild(cellData1)
            row.appendChild(cellData2)
            row.appendChild(cellData3)
            table.appendChild(row)

    
   
            // console.log(scrores[groupNr-1][i-1].toString().replace(",", " - "))
        
            btn.addEventListener("click",
            function(){
                console.log(playedGame)
                startGameAudio.play()
                resultThroughTime(scrores[groupNr-1][i-1][0],scrores[groupNr-1][i-1][1],btn,lbl.id);
                if(i<6)
                {
                    document.getElementById("r"+ Number(i+1)+"group"+groupNr).disabled=false
                }
                if(i==5)
                {
                    document.getElementById("previous").disabled=true;
                    document.getElementById("next").disabled=true;
                    setTimeout(() => {
                        document.getElementById("previous").disabled=false;
                        document.getElementById("next").disabled=false;
                    }, 45000);

                }
                
                setTimeout(() => {
                    playedGame[groupNr-1].push("played")
                    getGoalsAndQualification()
                }, 45000);
                
    
            /*scrores[groupNr-1][i-1].toString().replace(",", " - ");*/ })

        }

        document.getElementById("tables").appendChild(table)

        

    }
    var element2 = document.getElementById("tableRank"+groupNr)


    if( typeof(element2) != 'undefined' && element2 != null)
    {
        element2.style.display = "block"

    }
    else
    {
        element2=document.createElement("table")
        element2.className = "rank"
        element2.id ="tableRank"+groupNr
        let rowHeading = document.createElement("tr")
        let th1 = document.createElement("th")
        th1.innerHTML ="Teams"
        let th2 = document.createElement("th")
        th2.innerHTML = "Points"
        let th3 = document.createElement("th")
        th3.innerHTML="Goals"
        rowHeading.appendChild(th1);rowHeading.appendChild(th2);rowHeading.appendChild(th3)
        element2.appendChild(rowHeading)

        for(let i=1;i<5;i++)
        {
            let rowHeading = document.createElement("tr")
            element2.appendChild(rowHeading)
            let team = document.createElement("td")
            team.innerHTML = groups[groupNr-1][i-1]
            team.id ="team"+i+ "Rank"+groupNr
            let point = document.createElement("td")
            point.innerHTML=0
            point.id ="point" +i+ "Rank"+groupNr
            let goal = document.createElement("td")
            goal.innerHTML=0
            goal.id ="goal"+ i+ "Rank"+groupNr
            rowHeading.appendChild(team);rowHeading.appendChild(point);rowHeading.appendChild(goal)
            
        }
        document.getElementById("ranks").appendChild(element2)
    }


    
}


printDatainTable()

function resultThroughTime(nr1,nr2,buttonClicked,id,penalties)
{
    buttonClicked.disabled =true
    let goal1=0;let goal2 =0;
    buttonClicked.innerHTML = goal1 + "-" + goal2 ;

     
    for(let g=0;g<nr1;g++)
        {
            setTimeout(()=>
            {
                goal1+=1;
                goalAudio.play();
                buttonClicked.innerHTML = goal1 + "-" + goal2 ;
                console.log(goal1)
            },
            Math.floor(Math.random()*45000))
            
        }

    for(let g=0;g<nr2;g++)
        {
            setTimeout(()=>
            {
                goal2+=1;
                goalAudio.play()
                buttonClicked.innerHTML = goal1 + "-" + goal2
            },
            Math.floor(Math.random()*45000))
        }
    var timer=0
    var thisInterval = 
    setInterval(()=>{
        timer+=1
        document.getElementById(id).innerHTML = timer + " mins"
        if(timer==90)
          {clearInterval(thisInterval);
        }},500)
 

}



document.getElementById("button16").addEventListener("click",display16Teams)
document.getElementById("button8").addEventListener("click",quarterFinal)
document.getElementById("button4").addEventListener("click",semiFinal)
document.getElementById("buttonF").addEventListener("click",final)



displayGroups()


function nextGroupShowing()
{

    if(groupNr!==8)
    {
        document.getElementById("tableGroup"+groupNr).style.display="none"
        document.getElementById("tableRank"+groupNr).style.display="none"
        groupNr+=1;
    }
    printDatainTable()
    displayGroups()
    document.getElementById("groupLabel").innerHTML = "Group " + groupNr


    // console.log("important=   "+ timeouts.length)
    // console.log( timeouts)
}


function previousGroupShowing()
{
    
    if(groupNr!==1)
    {
        document.getElementById("tableGroup"+groupNr).style.display="none"
        document.getElementById("tableRank"+groupNr).style.display="none"
        groupNr-=1
    }
    printDatainTable()
    displayGroups()
    document.getElementById("groupLabel").innerHTML = "Group " + groupNr


}

//let object = document.getElementById("groups")

function displayGroups()
{



    document.getElementById("info").innerHTML =  groups[groupNr-1][0]+  "<br>" + 
    groups[groupNr-1][1] +  "<br>" + groups[groupNr-1][2]  + "<br>" + groups[groupNr-1][3] + "<br>" 




        
}
let next =document.getElementById("next")
let previous =document.getElementById("previous")
previous.addEventListener("click",previousGroupShowing)
next.addEventListener("click",nextGroupShowing)







//display Games Phase A

function getGoalsAndQualification()
{

    
    //console.log("ckicked")
    //console.log(object.value)
        var p1=0, p2=0, p3 =0, p4 = 0 
        var g1 =0, g2=0 ,g3=0, g4=0
  

        //console.log("group"+ Number(i+1))
            

            //points Game1
            if(playedGame[groupNr-1].length==1)
            {
                console.log(playedGame[[groupNr-1]].length + "  is one")
                g1+= scrores[groupNr-1][0][0]
                g2+= scrores[groupNr-1][0][1]
                if(scrores[groupNr-1][0][0] > scrores[groupNr-1][0][1])
                {
                    p1+=3
                }
                else if(scrores[groupNr-1][0][0] < scrores[groupNr-1][0][1])
                {
                    p2+=3
                }
                else{
                    p1+=1
                    p2+=1
                }
                let teamAndPoint = [[p1,g1,groups[groupNr-1][0]],[p2,g2,groups[groupNr-1][1]],[p3,g3,groups[groupNr-1][2]],[p4,g4,groups[groupNr-1][3]]]
                //console.log(teamAndPoint)
                document.getElementById("team1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][2]
                document.getElementById("team2Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[1][2]
                document.getElementById("team3Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[2][2]
                document.getElementById("team4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][2]
                document.getElementById("point1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][0]
                document.getElementById("point2Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[1][0]
                document.getElementById("point3Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[2][0]
                document.getElementById("point4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][0]
                document.getElementById("goal1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][1]
                document.getElementById("goal2Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[1][1]
                document.getElementById("goal3Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[2][1]
                document.getElementById("goal4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][1]
            }
            //points & goals Game2
            if(playedGame[groupNr-1].length==2)
            {
                g1+= scrores[groupNr-1][0][0]
                g2+= scrores[groupNr-1][0][1]
                if(scrores[groupNr-1][0][0] > scrores[groupNr-1][0][1])
                {
                    p1+=3
                }
                else if(scrores[groupNr-1][0][0] < scrores[groupNr-1][0][1])
                {
                    p2+=3
                }
                else{
                    p1+=1
                    p2+=1
                }
                g3+= scrores[groupNr-1][1][0]
                g4+= scrores[groupNr-1][1][1]
                if(scrores[groupNr-1][1][0] > scrores[groupNr-1][1][1])
                {
                    p3+=3
                }
                else if(scrores[groupNr-1][1][0] < scrores[groupNr-1][1][1])
                {
                    p4+=3
                }
                else{
                    p3+=1
                    p4+=1
                }
                let teamAndPoint = [[p1,g1,groups[groupNr-1][0]],[p2,g2,groups[groupNr-1][1]],[p3,g3,groups[groupNr-1][2]],[p4,g4,groups[groupNr-1][3]]]
                //console.log(teamAndPoint)
                document.getElementById("team1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][2]
                document.getElementById("team2Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[1][2]
                document.getElementById("team3Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[2][2]
                document.getElementById("team4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][2]
                document.getElementById("point1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][0]
                document.getElementById("point2Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[1][0]
                document.getElementById("point3Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[2][0]
                document.getElementById("point4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][0]
                document.getElementById("goal1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][1]
                document.getElementById("goal2Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[1][1]
                document.getElementById("goal3Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[2][1]
                document.getElementById("goal4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][1]
            }
            

            //points & goals Game3
            if(playedGame[groupNr-1].length==3)
            {
                g1+= scrores[groupNr-1][0][0]
                g2+= scrores[groupNr-1][0][1]
                if(scrores[groupNr-1][0][0] > scrores[groupNr-1][0][1])
                {
                    p1+=3
                }
                else if(scrores[groupNr-1][0][0] < scrores[groupNr-1][0][1])
                {
                    p2+=3
                }
                else{
                    p1+=1
                    p2+=1
                }
                g3+= scrores[groupNr-1][1][0]
                g4+= scrores[groupNr-1][1][1]
                if(scrores[groupNr-1][1][0] > scrores[groupNr-1][1][1])
                {
                    p3+=3
                }
                else if(scrores[groupNr-1][1][0] < scrores[groupNr-1][1][1])
                {
                    p4+=3
                }
                else{
                    p3+=1
                    p4+=1
                }
                g1+=scrores[groupNr-1][2][0]
                g4+=scrores[groupNr-1][2][1]
                if(scrores[groupNr-1][2][0] > scrores[groupNr-1][2][1])
                {
                    p1+=3
                }
                else if(scrores[groupNr-1][2][0] < scrores[groupNr-1][2][1])
                {
                    p4+=3
                }
                else{
                    p1+=1
                    p4+=1
                }
                let teamAndPoint = [[p1,g1,groups[groupNr-1][0]],[p2,g2,groups[groupNr-1][1]],[p3,g3,groups[groupNr-1][2]],[p4,g4,groups[groupNr-1][3]]]
                //console.log(teamAndPoint)
                document.getElementById("team1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][2]
                document.getElementById("team2Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[1][2]
                document.getElementById("team3Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[2][2]
                document.getElementById("team4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][2]
                document.getElementById("point1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][0]
                document.getElementById("point2Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[1][0]
                document.getElementById("point3Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[2][0]
                document.getElementById("point4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][0]
                document.getElementById("goal1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][1]
                document.getElementById("goal2Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[1][1]
                document.getElementById("goal3Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[2][1]
                document.getElementById("goal4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][1]
            }

            //points & goals Game4
            if(playedGame[groupNr-1].length==4)
            {
                console.log(playedGame[[groupNr-1]].length + "  is four")
                g1+= scrores[groupNr-1][0][0]
                g2+= scrores[groupNr-1][0][1]
                if(scrores[groupNr-1][0][0] > scrores[groupNr-1][0][1])
                {
                    p1+=3
                }
                else if(scrores[groupNr-1][0][0] < scrores[groupNr-1][0][1])
                {
                    p2+=3
                }
                else{
                    p1+=1
                    p2+=1
                }
                g3+= scrores[groupNr-1][1][0]
                g4+= scrores[groupNr-1][1][1]
                if(scrores[groupNr-1][1][0] > scrores[groupNr-1][1][1])
                {
                    p3+=3
                }
                else if(scrores[groupNr-1][1][0] < scrores[groupNr-1][1][1])
                {
                    p4+=3
                }
                else{
                    p3+=1
                    p4+=1
                }
                g1+=scrores[groupNr-1][2][0]
                g4+=scrores[groupNr-1][2][1]
                if(scrores[groupNr-1][2][0] > scrores[groupNr-1][2][1])
                {
                    p1+=3
                }
                else if(scrores[groupNr-1][2][0] < scrores[groupNr-1][2][1])
                {
                    p4+=3
                }
                else{
                    p1+=1
                    p4+=1
                }

                g2+=scrores[groupNr-1][3][0]
                g3+=scrores[groupNr-1][3][1]
                if(scrores[groupNr-1][3][0] > scrores[groupNr-1][3][1])
                {
                    p2+=3
                }
                else if(scrores[groupNr-1][3][0] < scrores[groupNr-1][3][1])
                {
                    p3+=3
                }
                else{
                    p2+=1
                    p3+=1
                }
                let teamAndPoint = [[p1,g1,groups[groupNr-1][0]],[p2,g2,groups[groupNr-1][1]],[p3,g3,groups[groupNr-1][2]],[p4,g4,groups[groupNr-1][3]]]
               
                document.getElementById("team1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][2]
                document.getElementById("team2Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[1][2]
                document.getElementById("team3Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[2][2]
                document.getElementById("team4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][2]
                document.getElementById("point1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][0]
                document.getElementById("point2Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[1][0]
                document.getElementById("point3Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[2][0]
                document.getElementById("point4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][0]
                document.getElementById("goal1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][1]
                document.getElementById("goal2Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[1][1]
                document.getElementById("goal3Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[2][1]
                document.getElementById("goal4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][1]
            }

            //points & goals Game5
            if(playedGame[groupNr-1].length==5)
            {
                g1+= scrores[groupNr-1][0][0]
                g2+= scrores[groupNr-1][0][1]
                if(scrores[groupNr-1][0][0] > scrores[groupNr-1][0][1])
                {
                    p1+=3
                }
                else if(scrores[groupNr-1][0][0] < scrores[groupNr-1][0][1])
                {
                    p2+=3
                }
                else{
                    p1+=1
                    p2+=1
                }
                g3+= scrores[groupNr-1][1][0]
                g4+= scrores[groupNr-1][1][1]
                if(scrores[groupNr-1][1][0] > scrores[groupNr-1][1][1])
                {
                    p3+=3
                }
                else if(scrores[groupNr-1][1][0] < scrores[groupNr-1][1][1])
                {
                    p4+=3
                }
                else{
                    p3+=1
                    p4+=1
                }
                g1+=scrores[groupNr-1][2][0]
                g4+=scrores[groupNr-1][2][1]
                if(scrores[groupNr-1][2][0] > scrores[groupNr-1][2][1])
                {
                    p1+=3
                }
                else if(scrores[groupNr-1][2][0] < scrores[groupNr-1][2][1])
                {
                    p4+=3
                }
                else{
                    p1+=1
                    p4+=1
                }
                
                g2+=scrores[groupNr-1][3][0]
                g3+=scrores[groupNr-1][3][1]
                if(scrores[groupNr-1][3][0] > scrores[groupNr-1][3][1])
                {
                    p2+=3
                }
                else if(scrores[groupNr-1][3][0] < scrores[groupNr-1][3][1])
                {
                    p3+=3
                }
                else{
                    p2+=1
                    p3+=1
                }
                g1+=scrores[groupNr-1][4][0] 
                g3+=scrores[groupNr-1][4][1]
                if(scrores[groupNr-1][4][0] > scrores[groupNr-1][4][1])
                {
                    p1+=3
                }
                else if(scrores[groupNr-1][4][0] < scrores[groupNr-1][4][1])
                {
                    p3+=3
                }
                else{
                    p3+=1
                    p1+=1
                }
                let teamAndPoint = [[p1,g1,groups[groupNr-1][0]],[p2,g2,groups[groupNr-1][1]],[p3,g3,groups[groupNr-1][2]],[p4,g4,groups[groupNr-1][3]]]

                document.getElementById("team1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][2]
                document.getElementById("team2Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[1][2]
                document.getElementById("team3Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[2][2]
                document.getElementById("team4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][2]
                document.getElementById("point1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][0]
                document.getElementById("point2Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[1][0]
                document.getElementById("point3Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[2][0]
                document.getElementById("point4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][0]
                document.getElementById("goal1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][1]
                document.getElementById("goal2Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[1][1]
                document.getElementById("goal3Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[2][1]
                document.getElementById("goal4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][1]
            }

            //points & goals Game6
            if(playedGame[groupNr-1].length==6)
            {
                g1+= scrores[groupNr-1][0][0]
                g2+= scrores[groupNr-1][0][1]
                if(scrores[groupNr-1][0][0] > scrores[groupNr-1][0][1])
                {
                    p1+=3
                }
                else if(scrores[groupNr-1][0][0] < scrores[groupNr-1][0][1])
                {
                    p2+=3
                }
                else{
                    p1+=1
                    p2+=1
                }
                g3+= scrores[groupNr-1][1][0]
                g4+= scrores[groupNr-1][1][1]
                if(scrores[groupNr-1][1][0] > scrores[groupNr-1][1][1])
                {
                    p3+=3
                }
                else if(scrores[groupNr-1][1][0] < scrores[groupNr-1][1][1])
                {
                    p4+=3
                }
                else{
                    p3+=1
                    p4+=1
                }
                g1+=scrores[groupNr-1][2][0]
                g4+=scrores[groupNr-1][2][1]
                if(scrores[groupNr-1][2][0] > scrores[groupNr-1][2][1])
                {
                    p1+=3
                }
                else if(scrores[groupNr-1][2][0] < scrores[groupNr-1][2][1])
                {
                    p4+=3
                }
                else{
                    p1+=1
                    p4+=1
                }
                
                g2+=scrores[groupNr-1][3][0]
                g3+=scrores[groupNr-1][3][1]
                if(scrores[groupNr-1][3][0] > scrores[groupNr-1][3][1])
                {
                    p2+=3
                }
                else if(scrores[groupNr-1][3][0] < scrores[groupNr-1][3][1])
                {
                    p3+=3
                }
                else{
                    p2+=1
                    p3+=1
                }
                g1+=scrores[groupNr-1][4][0] 
                g3+=scrores[groupNr-1][4][1]
                if(scrores[groupNr-1][4][0] > scrores[groupNr-1][4][1])
                {
                    p1+=3
                }
                else if(scrores[groupNr-1][4][0] < scrores[groupNr-1][4][1])
                {
                    p3+=3
                }
                else{
                    p3+=1
                    p1+=1
                }
                g2+=scrores[groupNr-1][5][0]
                g4+=scrores[groupNr-1][5][1]
                if(scrores[groupNr-1][5][0] > scrores[groupNr-1][5][1])
                {
                    p2+=3
                }
                else if(scrores[groupNr-1][5][0] < scrores[groupNr-1][5][1])
                {
                    p4+=3
                }
                else{
                    p4+=1
                    p2+=1
                }
                // table classifications 
                let teamAndPoint = [[p1,g1,groups[groupNr-1][0]],[p2,g2,groups[groupNr-1][1]],[p3,g3,groups[groupNr-1][2]],[p4,g4,groups[groupNr-1][3]]]
                //console.log(teamAndPoint)
                document.getElementById("team1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][2]
                document.getElementById("team2Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[1][2]
                document.getElementById("team3Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[2][2]
                document.getElementById("team4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][2]
                document.getElementById("point1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][0]
                document.getElementById("point2Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[1][0]
                document.getElementById("point3Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[2][0]
                document.getElementById("point4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][0]
                document.getElementById("goal1Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[0][1]
                document.getElementById("goal2Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[1][1]
                document.getElementById("goal3Rank"+groupNr).innerHTML =teamAndPoint.sort().reverse()[2][1]
                document.getElementById("goal4Rank"+groupNr).innerHTML = teamAndPoint.sort().reverse()[3][1]
    
                //passing the qualifying team to the teams16 array
    
                console.log(teamAndPoint.sort().reverse())
                if (teams16.includes(teamAndPoint.sort().reverse()[0][2]) == false)
                {
                    teams16.push(teamAndPoint.sort().reverse()[0][2])
                }
                if (teams16.includes(teamAndPoint.sort().reverse()[1][2]) == false)
                {
                    teams16.push(teamAndPoint.sort().reverse()[1][2])
                }
                console.log(teams16)
            }
            


        
        
    }
    






// phase 16 teams
function display16Teams()
{
    if(teams16.length == 16)
    {
        championsLigueSong.play()
        let decrease = teams16.length
        for(let i=0;i<teams16.length;i++)
        {
            scooring16.push(scooring(teams16[i],teams16[decrease]))
            decrease -=1
        }
        console.log("hallooooooooo" + scooring16)
        teams8 = drawAndResult(teams16,16, scooring16,document.getElementById("button16"))
        

    }
}

/*function deleteFirstPhase()
{
    document.getElementById("firstPhase").style.display="none"
}  */

function quarterFinal()
{
    championsLigueSong.play()
    console.log(teams8.length)
    if (teams8.length == 8)
    {
        let decrease = teams8.length
        for(let i=0;i<teams8.length;i++)
        {
            scooring8.push(scooring(teams8[i],teams8[decrease]))
            decrease -=1
        }
        teams4 = drawAndResult(teams8,8, scooring8, document.getElementById("button8")) 

    }  
}


function semiFinal()
{
    console.log("hallooooo")

    if (teams4.length == 4)
    {
        championsLigueSong.play()
        let decrease = teams4.length
        for(let i=0;i<teams4.length;i++)
        {
            scooring4.push(scooring(teams4[i],teams4[decrease]))
            decrease -=1
        }
        finalTeams = drawAndResult(teams4,4, scooring4, document.getElementById("button4"))
    }

}

function final()

    {

        if (finalTeams.length == 2)
        {
            championsLigueSong.play()
            let decrease = finalTeams.length
            for(let i=0;i<finalTeams.length;i++)
            {
                scooringFinal.push(scooring(finalTeams[i],finalTeams[decrease]))
            }
            winner = drawAndResult(finalTeams,2, scooringFinal, document.getElementById("buttonF"))
            //console.log(winner)

            
            db.collection("winners").get().then(winners=>
                {
                    for(let i=0;i<winners.length;i++)
                        {
                            //console.log(winners[i].team)
                            if(winners[i].team == winner)
                            {
                                //console.log("---updated---")
                                db.collection('winners').doc({ team: winners[i].team }).update
                                    ({
                                        point: winners[i].point + 1
                                    })
                            }
                        }
                }
                )
            
        }
    }

    function drawAndResult(teams,numberOfTeams,scooringArray,btn)
    {
        let qualifiedTeam = []
        if(teams.length == numberOfTeams)
        {
            btn.setAttribute('disabled', 'disabled')
            let decrease = Number(numberOfTeams-1)
            document.getElementById("nextRoundsTeam1Div").innerHTML +=  "<br>" + "<hr>" + "<hr>" + "<hr>"  +"<hr>" +"<br>"
    
            document.getElementById("nextRoundsResultDiv").innerHTML += "<br>" + "<hr>" + "<hr>" + "<hr>"  +"<hr>" +"<br>"
            document.getElementById("nextRoundsTeam2Div").innerHTML += "<br>" + "<hr>" + "<hr>" + "<hr>"  +"<hr>" +"<br>"
    
    
            for(let i =0;i<numberOfTeams/2;i++)
            {   let lblTeam1 = document.createElement("label")
                lblTeam1.className="row"
                document.getElementById("nextRoundsTeam1Div").appendChild(lblTeam1)  
                lblTeam1.innerHTML = teams[i]

                let lblTeam2 = document.createElement("label")
                lblTeam2.className="row"
                document.getElementById("nextRoundsTeam2Div").appendChild(lblTeam2)  
                lblTeam2.innerHTML = teams[decrease]

     
    
                let id = Math.random()
                let id_ = Math.random()
                let div = document.createElement("div")
                div.className="row"
                let button = document.createElement("button")
                let lbl = document.createElement("label")
                button.id = id
                lbl.id=id_
                button.innerHTML= "Result"
                button.className = "buttonsClass"
                lbl.className = "span"
                lbl.innerHTML = "00 Mins"
                div.appendChild(button)
                div.appendChild(lbl)
                document.getElementById("nextRoundsResultDiv").appendChild(div)
                button.addEventListener("click",()=> {button.setAttribute('disabled', 'disabled');
                     resultThroughTime(scooringArray[i][0],scooringArray[i][1],button,id_)})
                let result = scooringArray[i]
                console.log(result)

                
    
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

    
                decrease-=1
    
    
            }
            //console.log(qualifiedTeam)
            return qualifiedTeam
            
        }
    
    }

const ctx = document.getElementById("chart").getContext('2d');
let labels_ = []
let data_ = []
db.collection("winners").get().then(winners=>
    {
        for(let i=0;i<winners.length;i++)
            {
                labels_.push(winners[i].team)
                //console.log(winners[i].team)
                data_.push(winners[i].point)
            }
    })
    

new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels_,
            datasets: [
                {
                    label: 'Number of Titles',
                    data: data_,
                    borderWidth: 1,
                    fill: true,
                    backgroundColor: "orange",
                    borderColor: "transparent",
                },
            ],
        },
    });


document.getElementById("displayLigue").addEventListener("click",()=>
{
    document.getElementById("container1").style.display = "none"
    document.getElementById("container2").style.display = "block"
    championsLigueSong.play()
})


const logos = ["fcb.png","psg.png","bym.png","jvn.png","acm.png","bvb.png","chl.png","fcl.png","mnu.png","mnc.png","real.png","atm.png","zsp.png","vlr.png","inm.png","ars.png","tth.png","olm.png","oll.png","fcv.png","byl.png","ajx.png","psv.png","npl.png","dzg.png","bnf.png"]

let imgLogo = document.getElementById("imgLogo")
setInterval(() => {
        imgLogo.src = "img/"+logos[Math.floor(Math.random()*logos.length)]
 
    
}, 2000);