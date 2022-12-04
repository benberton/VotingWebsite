// let votePoll = new VotePoll(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"])
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
// votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))

let votePoll = new VotePoll(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A","A","B","c"])

document.addEventListener("DOMContentLoaded", ()=>{
    let contentIDs = ["pluralityContent","pluralityElimContent","pairwiseCompContent","bordaCountContent"]
    let pollResults = [votePoll.pluralityResult(),votePoll.pluralityEliminationResult(),votePoll.pairwiseComparisonResult(),votePoll.boardaCountResult()]
    for (let i = 0; i < contentIDs.length; ++i)
    {
        fillContent(contentIDs[i],pollResults[i])
    }
    console.log("loaded")
    console.log(votePoll.pairwiseComparisonResult())
})


function resultClicked(resultContainerID)
{
    console.log(resultContainerID)
}

function fillContent(id,result)
{
    let contentEl = document.getElementById(id)
    //adding event listener for popup
    let parent = contentEl.parentElement
    parent.addEventListener("click", e => {
        open_pop_up(result)
    })
    const listContainer = document.createElement("div")
    listContainer.classList.add("basicContent")
    for (let i = 0; i < result.length; ++i)
    {
        const divElement = document.createElement("div")
        if (result[i].length == 2)
            divElement.innerHTML = (i+1) + ". " + result[i][1]
        else
            divElement.innerHTML = (i+1) + ". " + result[i]
        
        listContainer.appendChild(divElement)
    }
    contentEl.appendChild(listContainer)

}