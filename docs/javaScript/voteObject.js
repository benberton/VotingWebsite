class Vote{
    constructor(voteRanking)
    {
        this.voteRanking = voteRanking
        this.identicalVoteCount = 0
        this.key = this.getKey()
        console.log(this.key)
    }

    getKey()
    {
        let keyVal = ""
        for (let i = 0; i < this.voteRanking.length; ++i)
            keyVal += String(this.voteRanking[i][0])
        return keyVal
    }
}

let newVote = new Vote(["Mike","Bibby","James"]);