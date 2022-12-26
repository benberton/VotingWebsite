//fills the results page with the content held in the local storage for each result type
document.addEventListener("DOMContentLoaded", ()=>{
    //gets the url items
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let sessionID = urlParams.get('sessionID')
    console.log(sessionID)
    // if the key is recognized, then the results are returned
    fetch('http://localhost:3000/api/getResults', {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"key": sessionID}),
    })
    .then((response) => response.json())
    .then((data) => {
        let contentIDs = ["pluralityContent","pluralityElimContent","pairwiseCompContent","bordaCountContent"]
        //naming the header
        document.getElementById("windowLabel").innerHTML = "Result: " + data.totalVotes + " Total Votes"
        console.log(data.results.length)
        for (let i = 0; i < contentIDs.length; ++i)
            fillContent(contentIDs[i],data.results[i])
    })
    .catch((error) => {
        console.error('Error:', error);
    });
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