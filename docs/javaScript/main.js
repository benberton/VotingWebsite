
let votePoll = new VotePoll(["Mike","Bibby","James"])


document.addEventListener("DOMContentLoaded", ()=>{
    addCandidatesToScreen()
    //creates javascript for the dragable object
    slist(document.getElementById("sortlist"));

})

function addCandidatesToScreen()
{
    for (let i = 0; i < votePoll.candidates.length; ++i)
    {
        const candidateEl = document.createElement("li")
        candidateEl.innerHTML = votePoll.candidates[i]
        document.getElementById("sortlist").appendChild(candidateEl)
    }
}

//returns the users vote and resets the poll
function clearCandidates()
{
    let vote = []
    let options = document.getElementById("sortlist"); 
    var child = options.lastChild
    while (child) 
    {
        vote.unshift(child.innerHTML)
        options.removeChild(child);
        child = options.lastElementChild;
    }
    return vote
}


function submitVote()
{
    let candidateOrder = clearCandidates()
    let vote = new Vote(candidateOrder)
    votePoll.addVote(vote)
    addCandidatesToScreen()
    slist(document.getElementById("sortlist"));
}

function generateResults()
{
    console.log("Plurality",votePoll.pluralityResult())
    console.log("Comparison",votePoll.pairwiseComparisonReult())
    // votePoll.printVotes()
}
// let firstVote = new Vote(["Mike","Bibby","James"])
// let secondVote = new Vote(["Mike","Bibby","James"])
// let thirdVote = new Vote(["Bibby","Mike","James"])
// let fourthVote = new Vote(["Bibby","James","Mike"])


// votePoll.addVote(firstVote)
// votePoll.addVote(secondVote)
// votePoll.addVote(thirdVote)
// votePoll.addVote(fourthVote)

// // console.log(newPoll.getPluralityResult())
// // console.log(newPoll.getBoardaCountResult())
// // console.log(newPoll.getPairwiseComparison())
// console.log(votePoll.pluralityEliminationResult())
// votePoll.printVotes()