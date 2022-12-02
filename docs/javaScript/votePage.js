
// let votePoll = new VotePoll(["Bernie Sander", "Joe Biden", "Ron Desantes","Donald Trump"])
let votePoll = new VotePoll(["Qdoba","Pita Pit","Sushi","Carusos","Hand-Crafted"])

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
    //hiding vote container and revealing the "New Vote" button
    document.getElementById("voteContainer").classList.add("hidden")
    document.getElementById("voteSubmittedContainer").classList.remove("hidden")
}

function revealBallot()
{
    document.getElementById("voteSubmittedContainer").classList.add("hidden")
    document.getElementById("voteContainer").classList.remove("hidden")
}


function generateResults()
{
    console.log("Plurality",votePoll.pluralityResult())
    console.log("Comparison",votePoll.pairwiseComparisonReult())
    console.log("Plurality W Elim",votePoll.pluralityEliminationResult())
    console.log("Borda Count",votePoll.boardaCountResult())
    votePoll.printVotes()
}
