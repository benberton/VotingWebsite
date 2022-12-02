class Vote{
    constructor(voteRanking, name)
    {
        this.name = name
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
