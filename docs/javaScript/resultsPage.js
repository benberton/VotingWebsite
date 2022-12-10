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

document.addEventListener("DOMContentLoaded", ()=>{
    let contentIDs = ["pluralityContent","pluralityElimContent","pairwiseCompContent","bordaCountContent"]
    let resultNames = ["plurality","pluralityElim","Comparison","Borda"]
    let resultObjects = []
    for (let i = 0; i < resultNames.length; ++i)
        resultObjects.push(JSON.parse(localStorage.getItem(resultNames[i])))
   console.log(resultObjects)
    // let pollResults = [votePoll.pluralityResult(),votePoll.pluralityEliminationResult(),votePoll.pairwiseComparisonResult(),votePoll.boardaCountResult()]
    for (let i = 0; i < contentIDs.length; ++i)
    {
        fillContent(contentIDs[i],resultObjects[i])
    }
    console.log("loaded")
})


function resultClicked(resultContainerID)
{
    console.log(resultContainerID)
}

function fillContent(id,result)
{
    console.log(id,result)
    let contentEl = document.getElementById(id)
    //adding event listener for popup
    let parent = contentEl.parentElement
    parent.addEventListener("click", e => {
        open_pop_up(id,result)
    })
    const listContainer = document.createElement("div")
    listContainer.classList.add("basicContent")
    for (let i = 0; i < result.ranking.length; ++i)
    {
        const divElement = document.createElement("div")
        divElement.innerHTML = (i+1) + ". " + result.ranking[i]
            
        listContainer.appendChild(divElement)
    }
    contentEl.appendChild(listContainer)

}