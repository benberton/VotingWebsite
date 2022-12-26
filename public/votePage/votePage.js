// const contentDisposition = require("content-disposition");
document.addEventListener("DOMContentLoaded", ()=>{
    slist(document.getElementById("sortlist"));
})
//holds the session ID
let sessionID = null
//called when search for session button is clicked
function searchSession()
{
    let input = document.getElementById("inputForID")
    let inputVal = input.value
    // if the key is recognized, then data returns true
    fetch('/api/isValidID', {
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
        }else
            alert("Session '" + inputVal + "' does not exist")
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    input.value = ''
}

//enter key calls searchSession()
document.addEventListener("DOMContentLoaded", ()=>{
    var input = document.getElementById("inputForID");
    input.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter")
            searchSession()
    });
})


function setPage()
{
    //unhiding ballot
    document.getElementById("sessionIDContainer").classList.add('hidden')
    document.getElementById("voteContainer").classList.remove('hidden')
    //getting candidates
    fetch('/api/getCandidates', {
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
    fetch('/api/getCandidates', {
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
    fetch("/api/vote", {
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