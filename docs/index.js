const express = require('express')
const fs = require('fs')

const port = 3000
const app = express()

let poll = null

app.use(express.static('public'))
//using json format
app.use(express.json());


app.get('/test', function(req,res){
    res.write("hello")
    res.end()
    console.log("test")
})

//when the vote is submitted (request body has candidate order)
app.post("/api/vote", function(req,res) {
    console.log(req.body)
    res.end()
})

//when the poll is created (request body has candidates)
app.post("/api/createPoll",function(req,res)
{
    poll = new VotePoll(req.body)
    console.log(poll)
    
})

app.listen(port,function(error) {
    if (error)
        console.log("Error: " + error)
    else
        console.log("Server started on port " + 3000)
})



class Result {
    constructor(ranking,steps)
    {
        this.ranking = ranking
        this.steps = steps
    }
}

class Vote{
    constructor(voteRanking)
    {
        this.voteRanking = voteRanking
        this.voteCount = 1
        this.key = this.generateKey()
    }

    generateKey()
    {
        let keyVal = ""
        for (let i = 0; i < this.voteRanking.length; ++i)
            keyVal += String(this.voteRanking[i][0])
        return keyVal
    }

    getKey()
    {
        return this.key
    }
}

class VotePoll{
    constructor(candidates) {
        this.candidates = candidates
        this.voteMap = new Map()
        this.totalVotes = 0
    }

    addVote(vote)
    {
        //making sure arrays have the same candidates
        if(vote.voteRanking.slice().sort().join(',') !== this.candidates.slice().sort().join(','))
            alert("Candidates do not match")
        else
        {
            this.totalVotes++
            //if an identical vote exists, the counter on that vote is iterated on
            if (this.voteMap.has(vote.getKey()))
                this.voteMap.get(vote.getKey()).voteCount++
            else
                this.voteMap.set(vote.getKey(),vote); 
        }
    }

    pluralityResult()
    {
        //creating 2d array to hold both the candidate name and their number of votes
        let voteCountArray = this.getEmptyVoteTally()

        //getting votes
        const values = Array.from(this.voteMap.values())

        //iterates the first place candidates number of votes by the number of votes in the vote object
        for (let i = 0; i < values.length; ++i) 
            voteCountArray[this.candidates.indexOf(values[i].voteRanking[0])][0] += values[i].voteCount
        
        //sorting array by the number of votes
        voteCountArray.sort(sortFunction)

               
               

        let ranking = this.addTiesToRanking(voteCountArray)  
        let steps = []
        for (let i = 0; i < voteCountArray.length; ++i)
        {
            // ranking.push(voteCountArray[i][1])
            if (voteCountArray[i][0] != 1)
                steps.push(voteCountArray[i][0] + " first place votes for " + voteCountArray[i][1])
            else
                steps.push(voteCountArray[i][0] + " first place vote for " + voteCountArray[i][1])
        }
        let result = new Result(ranking,steps)
        return result
    }

    boardaCountResult()
    {
        //creating 2d array to hold both the candidate name and their total "points"
        let voteCountArray = this.getEmptyVoteTally()

        //getting votes
        const values = Array.from(this.voteMap.values())

        //iterates the candidates' total scores based on their ranking in the vote
        let maxPoints = this.candidates.length
        for (let i = 0; i < values.length; ++i)
        {
            // console.log(values[i].voteCount + " votes have the ranking " + values[i].voteRanking)
            for (let j = 0; j < values[i].voteRanking.length; ++j)
            {
                // console.log(values[i].voteCount + " vote(s) have/has " + values[i].voteRanking[j] + " in " + (maxPoints - j) + " place. "
                // + values[i].voteRanking[j] + " total = " +  voteCountArray[this.candidates.indexOf(values[i].voteRanking[j])][0] + " + "  + (values[i].voteCount * (maxPoints - j)))
                voteCountArray[this.candidates.indexOf(values[i].voteRanking[j])][0] += (values[i].voteCount * (maxPoints - j))
            }
        }
         

        //sorting array by the number of "points"
        voteCountArray.sort(sortFunction)

        let ranking = this.addTiesToRanking(voteCountArray)         
        let steps = []
        for (let i = 0; i < voteCountArray.length; ++i)
            steps.push(voteCountArray[i][1] + " recieved " + voteCountArray[i][0] + " total points")
        
        let result = new Result(ranking,steps)
        return result
    }

    pairwiseComparisonResult()
    {
        //creating 2d array to hold both the candidate name and their total "points"
        let voteCountArray = this.getEmptyVoteTally()

        //getting votes
        const values = Array.from(this.voteMap.values())
        for (let i = 0; i < this.candidates.length - 1; ++i)
        {
            for (let j = i + 1; j < this.candidates.length; ++j)
            {
                let totalA = 0
                let totalB = 0
                for (let k = 0; k < values.length; ++k)
                {
                    let voteCandidates = values[k].voteRanking
                    if(voteCandidates.indexOf(this.candidates[i]) < voteCandidates.indexOf(this.candidates[j]))
                    {
                        totalA += values[k].voteCount
                    }else
                        totalB += values[k].voteCount
                }

                //if the total votes won for candidate A is greater than candidate B, then candidate A wins
                if (totalA == totalB)
                {
                    voteCountArray[i][0] += 0.5
                    voteCountArray[j][0] += 0.5
                }else if (totalA > totalB)
                    voteCountArray[i][0]++
                else
                    voteCountArray[j][0]++
            }
        }

        //sorting array by the number of "points"
        voteCountArray.sort(sortFunction)
        
   

        let ranking = this.addTiesToRanking(voteCountArray)       
        let steps = []
        for (let i = 0; i < voteCountArray.length; ++i)
        {
            if (voteCountArray[i][0] != 1)
                steps.push(voteCountArray[i][1] + " wins " + voteCountArray[i][0] + " times head to head")
            else
                steps.push(voteCountArray[i][1] + " wins " + voteCountArray[i][0] + " time head to head")     
        }
        let result = new Result(ranking,steps)
        return result
    }
    

    pluralityEliminationResult()
    {
        //getting votes
        const values = Array.from(this.voteMap.values())
        
        //holds the non-elimated/current Candidates
        let currentCand = new Array(this.candidates.length)
        for (let i = 0 ; i < this.candidates.length; ++i)
            currentCand[i] = String(this.candidates[i])

        //creating 2d array to hold both the candidate name and their total "points"
        let voteCountArray = this.generateEmptyVoteTally(currentCand)

        //holds eliminated candidates
        let eliminatedCand = []

        let steps = []
        for (let i = 0; i < this.candidates.length; ++i) 
        {
            // iterates the first place candidates number of votes by the number of votes in the vote object
            for (let j = 0; j < values.length; ++j)
            {
                let topVoteInd = 0
                while (!currentCand.includes(values[j].voteRanking[topVoteInd]))
                    topVoteInd++
                voteCountArray[currentCand.indexOf(values[j].voteRanking[topVoteInd])][0] += values[j].voteCount           
            }  

            //holds an array with the eliminated party's name and the number of votes they recieved
            let eliminated = this.eliminateMinVote(voteCountArray,currentCand)

            //adds the name of the eliminated candidate to the list of eliminated candidates
            eliminatedCand.unshift(eliminated[0])

            //resetting vote count array without eliminated candidate
            voteCountArray = this.generateEmptyVoteTally(currentCand) 

            //only last candidate left is not marked as elimated
            if (i < this.candidates.length - 1)
                steps.push("Round " + (i + 1) + ": " + eliminatedCand[0] + " eliminated")   // "(Recieved " + eliminated[1] + "/" + this.totalVotes + " first place votes)"
           
        }

        steps.push("Result: " + eliminatedCand[0] + " wins")
        let ranking = []
        for (let i = 0; i < eliminatedCand.length; ++i)
            ranking.push((i + 1) + ". " + eliminatedCand[i])
        let result = new Result(ranking,steps)
        return result
    }

    eliminateMinVote(voteCountArray,currentCand)
    {
        let minInd = 0
        for (let i = 1; i < voteCountArray.length; ++i) 
        {
            if (voteCountArray[i][0] < voteCountArray[minInd][0] && currentCand.includes(voteCountArray[i][1]))
                minInd = i
        }

        let minName = voteCountArray[minInd][1]
        currentCand.splice(currentCand.indexOf(minName),1)
        return [minName,minInd]
    }

    generateEmptyVoteTally(names)
    {
        //creating 2d array to hold both the candidate name and their total "points"
        let voteCountArray = new Array(names.length)
        for (let i = 0; i < voteCountArray.length; ++i)
        { 
            voteCountArray[i] = new Array(2)
            voteCountArray[i][0] = 0
            voteCountArray[i][1] = names[i]
        }
        return voteCountArray
    }

    getEmptyVoteTally()
    {
        //creating 2d array to hold both the candidate name and their total "points"
        let voteCountArray = new Array(this.candidates.length)
        for (let i = 0; i < voteCountArray.length; ++i)
        { 
            voteCountArray[i] = new Array(2)
            voteCountArray[i][0] = 0
            voteCountArray[i][1] = this.candidates[i]
        }
        return voteCountArray
    }

    //adds ties to rankings
    addTiesToRanking(voteCountArray)
    {
        let ranking = []
        for (let i = 0; i < voteCountArray.length; ++i)
        {
            //if the ranking isn't the first item in the list, then the item above it parsed for the next available place
            if (i > 0)
            {
                //if it ties with the value above it, the same place is used, otherwise the place is iterated by one
                if (voteCountArray[i][0] == voteCountArray[i - 1][0])
                    ranking.push(ranking[i - 1][0] + ". " + voteCountArray[i][1])
                else
                    ranking.push((parseInt(ranking[i - 1][0]) + 1) + ". " + voteCountArray[i][1])
            }else
                ranking.push((i + 1) + ". " + voteCountArray[i][1])
        }
        return ranking
    }

    printVotes()
    {
        const values = Array.from(this.voteMap.values())
        console.log(values)
    }
}

//sorts 2d array
function sortFunction(a, b)
{
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}