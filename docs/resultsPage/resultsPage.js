// let votePoll = new VotePoll(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"])
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))

// let votePoll = new VotePoll(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"])
// localStorage.setItem("plurality",votePoll.pluralityResult())
// localStorage.setItem("pluralityElim",votePoll.pluralityEliminationResult())
// localStorage.setItem("Borda",votePoll.boardaCountResult())
// localStorage.setItem("Comparison",votePoll.pairwiseComparisonResult())

//fills the results page with the content held in the local storage for each result type
document.addEventListener("DOMContentLoaded", ()=>{
    let contentIDs = ["pluralityContent","pluralityElimContent","pairwiseCompContent","bordaCountContent"]
    let resultNames = ["plurality","pluralityElim","Comparison","Borda"]
    //naming the header
    document.getElementById("windowLabel").innerHTML = "Result: " + localStorage.getItem("voteCount") + " Total Votes"
    //holds the result objects
    let resultObjects = []
    for (let i = 0; i < resultNames.length; ++i)
        resultObjects.push(JSON.parse(localStorage.getItem(resultNames[i])))
    // let pollResults = [votePoll.pluralityResult(),votePoll.pluralityEliminationResult(),votePoll.pairwiseComparisonResult(),votePoll.boardaCountResult()]
    for (let i = 0; i < contentIDs.length; ++i)
        fillContent(contentIDs[i],resultObjects[i])
    
})


function resultClicked(resultContainerID)
{
    console.log(resultContainerID)
}

function fillContent(id,resultObj)
{
    let contentEl = document.getElementById(id)
    //adding event listener for popup
    let parent = contentEl.parentElement
    parent.addEventListener("click", e => {
        open_pop_up(id,resultObj)
    })

    //adding ranking to result box
    const listContainer = document.createElement("div")
    listContainer.classList.add("basicContent")
    for (let i = 0; i < resultObj.ranking.length; ++i)
    {
        const divElement = document.createElement("div")

        divElement.innerHTML = resultObj.ranking[i]   
            
        listContainer.appendChild(divElement)
    }
    contentEl.appendChild(listContainer)

}