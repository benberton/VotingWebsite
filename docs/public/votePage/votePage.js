//holds the session ID
let sessionID = null
//called when search for session button is clicked
function searchSession()
{
    let input = document.getElementById("inputForID")
    let inputVal = input.value
    // if the key is recognized, then data returns true
    fetch('http://localhost:3000/api/isValidID', {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"key": inputVal}),
    })
    .then((response) => response.json())
    .then((data) => {
        //data.ID result is true if key is valid
        if (data.ID)
        {
            sessionID = inputVal
            setPage()
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    input.value = ''
}

function setPage()
{
    //unhiding ballot
    document.getElementById("sessionIDContainer").classList.add('hidden')
    document.getElementById("voteContainer").classList.remove('hidden')
    //getting candidates
    fetch('http://localhost:3000/api/getCandidates', {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"key": sessionID}),
    })
    .then((response) => response.json())
    .then((data) => {
        //candidates added to page after getting result from backend
        addCandidatesToScreen(data)
        //creates javascript for the dragable object
        slist(document.getElementById("sortlist"));
        //adding numbers to page
        let numberContainer = document.getElementById("rankNumbers")
        for (let i = 0; i < data.length; ++i)
        {
            let numberElement = document.createElement("div")
            numberElement.innerHTML = String((i + 1) + ".")
            numberElement.classList.add("number")
            numberContainer.appendChild(numberElement)
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// //called when page loads
// document.addEventListener("DOMContentLoaded", ()=>{
   
// })

function addCandidatesToScreen(candidates)
{
    for (let i = 0; i < candidates.length; ++i)
    {
        const candidateEl = document.createElement("li")
        candidateEl.innerHTML = candidates[i]
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
    //getting candidates to be added back on screen
    fetch('http://localhost:3000/api/getCandidates', {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"key": sessionID}),
    })
    .then((response) => response.json())
    .then((data) => {
        //candidates added back to screen
        addCandidatesToScreen(data)
        //creates javascript for the dragable object
        slist(document.getElementById("sortlist"));
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    //hiding vote container and revealing the "New Vote" button
    document.getElementById("voteContainer").classList.add("hidden")
    document.getElementById("voteSubmittedContainer").classList.remove("hidden")
  

    //sends vote to backend to add to vote poll object
    fetch("http://localhost:3000/api/vote", {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"key" : sessionID, "candidates" : candidateOrder}),
    })

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
    localStorage.setItem("voteCount",votePoll.totalVotes)
    
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
