let votePoll = new VotePoll(["Qdoba","Pita Pit","Carusos","McDonalds","Chipoltle","Chick-Fil-A"])

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("loaded")
    
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