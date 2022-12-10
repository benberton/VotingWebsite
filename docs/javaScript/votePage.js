
// let votePoll = new VotePoll(["Bernie Sander", "Joe Biden", "Ron Desantes","Donald Trump"])
let votePoll = new VotePoll(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"])

//called when page loads
document.addEventListener("DOMContentLoaded", ()=>{
    addCandidatesToScreen()
    //adding numbers to page
    let numberContainer = document.getElementById("rankNumbers")
    for (let i = 0; i < votePoll.candidates.length; ++i)
    {
        let numberElement = document.createElement("div")
        numberElement.innerHTML = String((i + 1) + ".")
        numberElement.classList.add("number")
        numberContainer.appendChild(numberElement)
    }
    //creates javascript for the dragable object
    slist(document.getElementById("sortlist"));

})

function addCandidatesToScreen()
{
    for (let i = 0; i < votePoll.candidates.length; ++i)
    {
        const candidateEl = document.createElement("li")
        candidateEl.innerHTML = votePoll.candidates[i]
        let dotIcon = document.createElement("i")
        //adding three dot icon
        dotIcon.classList.add("bi")
        dotIcon.classList.add("bi-three-dots-vertical")
        dotIcon.classList.add("dotIcon")
        candidateEl.appendChild(dotIcon)
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
        vote.unshift(child.firstChild.textContent)
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
    localStorage.setItem("plurality",JSON.stringify(votePoll.pluralityResult()))
    localStorage.setItem("pluralityElim",JSON.stringify(votePoll.pluralityEliminationResult()))
    localStorage.setItem("Borda",JSON.stringify(votePoll.boardaCountResult()))
    localStorage.setItem("Comparison",JSON.stringify(votePoll.pairwiseComparisonResult()))
    
    console.log("Plurality",votePoll.pluralityResult())
    console.log("Comparison",votePoll.pairwiseComparisonResult())
    console.log("Plurality W Elim",votePoll.pluralityEliminationResult())
    console.log("Borda Count",votePoll.boardaCountResult())

}

// localStorage.setItem("pluralityRanking",votePoll.pluralityResult().ranking)
// localStorage.setItem("pluralitySteps",votePoll.pluralityResult().steps)

// localStorage.setItem("pluralityElimRanking",votePoll.pluralityEliminationResult().ranking)
// localStorage.setItem("pluralityElimSteps",votePoll.pluralityEliminationResult().steps)

// localStorage.setItem("BordaRanking",votePoll.boardaCountResult().ranking)
// localStorage.setItem("BordaSteps",votePoll.boardaCountResult().steps)

// localStorage.setItem("ComparisonRanking",votePoll.pairwiseComparisonResult().ranking)
// localStorage.setItem("ComparisonSteps",votePoll.pairwiseComparisonResult().steps)
