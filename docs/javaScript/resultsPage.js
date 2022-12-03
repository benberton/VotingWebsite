let votePoll = new VotePoll(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"])

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("loaded")
    
})


function resultClicked(labelID,contentID)
{
    console.log(labelID)
    let container = document.getElementById(labelID)
    let content = document.getElementById(contentID)
    if (container.classList.contains("resultLabelClicked"))
    {
        container.classList.remove("resultLabelClicked")
        content.classList.add("hidden")
    }else
    {
        container.classList.add("resultLabelClicked")
        content.classList.remove("hidden")
    }
        

    console.log(labelID)
}