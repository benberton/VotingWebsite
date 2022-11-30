class votePoll{
    constructor(candidates) {
        this.candidates = candidates
        this.voteMap = new Map()
    }

    addVote(vote)
    {
        if (this.voteMap.has(vote.getKey()))
            this.voteMap.get(vote.getKey()).voteCount++
        else
            this.voteMap.set(vote.getKey(),vote);
        console.log(vote.voteCount)
    }

    printVotes()
    {
        const values = Array.from(this.voteMap.values());
        console.log(values)
    }
}

let newPoll = new votePoll(["Mike","Bibby","James"])
let firstVote = new Vote(["Mike","Bibby","James"])
let secondVote = new Vote(["Mike","Bibby","James"])

newPoll.addVote(firstVote)
newPoll.addVote(secondVote)

newPoll.printVotes()