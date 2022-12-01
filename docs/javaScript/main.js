
let newPoll = new votePoll(["Mike","Bibby","James"])


document.addEventListener("DOMContentLoaded", ()=>{
    addCandidatesToScreen()
    //creates javascript for the dragable object
    slist(document.getElementById("sortlist"));

})

function addCandidatesToScreen()
{
    for (let i = 0; i < newPoll.candidates.length; ++i)
    {
        const candidateEl = document.createElement("li")
        candidateEl.innerHTML = newPoll.candidates[i]
        document.getElementById("sortlist").appendChild(candidateEl)
    }
}


let firstVote = new Vote(["Mike","Bibby","James"])
let secondVote = new Vote(["Mike","Bibby","James"])
let thirdVote = new Vote(["Bibby","Mike","James"])
let fourthVote = new Vote(["Bibby","James","Mike"])


newPoll.addVote(firstVote)
newPoll.addVote(secondVote)
newPoll.addVote(thirdVote)
newPoll.addVote(fourthVote)

// console.log(newPoll.getPluralityResult())
// console.log(newPoll.getBoardaCountResult())
// console.log(newPoll.getPairwiseComparison())
console.log(newPoll.pluralityEliminationResult())
newPoll.printVotes()