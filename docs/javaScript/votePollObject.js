class votePoll{
    constructor(candidates) {
        this.candidates = candidates
        this.voteMap = new Map()
    }

    addVote(vote)
    {
        //making sure arrays have the same candidates
        if(vote.voteRanking.slice().sort().join(',') !== this.candidates.slice().sort().join(','))
            alert("Candidates do not match")
        else
        {
            //if an identical vote exists, the counter on that vote is iterated on
            if (this.voteMap.has(vote.getKey()))
                this.voteMap.get(vote.getKey()).voteCount++
            else
                this.voteMap.set(vote.getKey(),vote);
        }
    }

    getPluralityResult()
    {
        //creating 2d array to hold both the candidate name and their number of votes
        let voteCountArray = new Array(this.candidates.length)
        for (let i = 0; i < voteCountArray.length; ++i)
        { 
            voteCountArray[i] = new Array(2)
            voteCountArray[i][0] = 0
            voteCountArray[i][1] = this.candidates[i]
        }

        //getting votes
        const values = Array.from(this.voteMap.values())

        //iterates the first place candidates number of votes by the number of votes in the vote object
        for (let i = 0; i < values.length; ++i) 
            voteCountArray[this.candidates.indexOf(values[i].voteRanking[0])][0] += values[i].voteCount
        
        //sorting array by the number of votes
        voteCountArray.sort(sortFunction)
        return voteCountArray
    }

    getBoardaCountResult()
    {
        //creating 2d array to hold both the candidate name and their total "points"
        let voteCountArray = new Array(this.candidates.length)
        for (let i = 0; i < voteCountArray.length; ++i)
        { 
            voteCountArray[i] = new Array(2)
            voteCountArray[i][0] = 0
            voteCountArray[i][1] = this.candidates[i]
        }

        //getting votes
        const values = Array.from(this.voteMap.values())

        //iterates the candidates' total scores based on their ranking in the vote
        let maxPoints = this.candidates.length
        for (let i = 0; i < values.length; ++i)
            for (let j = 0; j < values[i].voteRanking.length; ++j)
                voteCountArray[this.candidates.indexOf(values[i].voteRanking[j])][0] += (values[i].voteCount * (maxPoints - j))

        //sorting array by the number of "points"
        voteCountArray.sort(sortFunction)
        return voteCountArray
    }

    getPairwiseComparison()
    {
        //creating 2d array to hold both the candidate name and their total "points"
        let voteCountArray = new Array(this.candidates.length)
        for (let i = 0; i < voteCountArray.length; ++i)
        { 
            voteCountArray[i] = new Array(2)
            voteCountArray[i][0] = 0
            voteCountArray[i][1] = this.candidates[i]
        }

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

        return voteCountArray
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
let newPoll = new votePoll(["Mike","Bibby","James"])

let firstVote = new Vote(["Mike","Bibby","James"])
let secondVote = new Vote(["Mike","Bibby","James"])
let thirdVote = new Vote(["Bibby","Mike","James"])
let fourthVote = new Vote(["Bibby","James","Mike"])


newPoll.addVote(firstVote)
newPoll.addVote(secondVote)
newPoll.addVote(thirdVote)
newPoll.addVote(fourthVote)

console.log(newPoll.getPluralityResult())
console.log(newPoll.getBoardaCountResult())
console.log(newPoll.getPairwiseComparison())
newPoll.printVotes()