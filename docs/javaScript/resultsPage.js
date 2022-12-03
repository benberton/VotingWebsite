let votePoll = new VotePoll(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"])
votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))
votePoll.addVote(new Vote(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"]))

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
    let container = document.getElementById(resultContainerID)
    if (container.classList.contains("resultClicked"))
    {
        // content.classList.add("hidden")
        container.classList.remove("resultClicked")
        container.classList.add("activeHover")
    }else
    {
        // content.classList.remove("hidden")
        container.classList.add("resultClicked")
        container.classList.remove("activeHover")
    }
}

function fillContent(id,result)
{
    let contentEl = document.getElementById(id)
    contentEl.innerHTML = result
}