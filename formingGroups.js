const team1 = ["Fc Barcelona","Fc Liverpool", "Real Madrid","Bayern Munich","Manchester City"]

const team2 = ["Manchester Utd","Paris S-G","Ac Milan","Juventus","Chelsea"]
const team3 = ["Fc Valencia","Borussia Dortmund","Inter Milan","Fc Arsenal","Ajax Amsterdam","Atlético Madrid"]
const team4 = ["Fc Porto","Tottenham","Fc Sevilla","Red Bull Salzburg","SSC Napoli","Bayer Leverkusen"]
const team5 = ["Fc Lyon","As Roma","Villarreal","Benifica","PSV Eindhoven"]
const team6 = ["Slavia Prague","Shakhtar Donetsk","Olympiakos","Zenit St. Petersburg","Dinamo Zagreb"]
let teams = team2.concat(team3,team4,team5,team6)
let totalTeams = team1.concat(team2,team3,team4,team5,team6)


//lets separate the stronger teams --team1
let groups = [[],[],[],[],[],[],[],[]]
let n=0;

let indexSelected = []
while(n !== team1.length )
{
    let index = Math.floor(Math.random()*team1.length)
    if(indexSelected.includes(index) === false)
    {
        indexSelected.push(index)
        groups[n].push(team1[index])
        n+=1
    }
}
// console.log(groups)
let alreadyChoised = []

// adding the rest of the teams 
for(let i=0;i<groups.length;i++)
{
    while(groups[i].length != 4)
    {
        let index = Math.floor(Math.random()*teams.length)
        let team = teams[index]
        if(alreadyChoised.includes(team) == false)
            {
                groups[i].push(team)
                alreadyChoised.push(team)
            }
        
    }
}

export {groups,totalTeams,team1,team2,team3,team4,team5,team6}

