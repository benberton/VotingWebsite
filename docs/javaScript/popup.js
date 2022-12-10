function open_pop_up(titleID,resultObj)
{ 
    let title = document.getElementById(titleID).previousElementSibling.innerHTML
    document.getElementById("popUpTitle").innerHTML = title + " Explanation"
    const listContainer = document.createElement("div")
   
    //adding steps to pop up
    let contentEl = document.getElementById("popUpBody")
    contentEl.innerHTML = ""
    for (let i = 0; i < resultObj.steps.length; ++i)
    {
        const divElement = document.createElement("div")
        divElement.innerHTML = resultObj.steps[i]
            
        listContainer.appendChild(divElement)
    }
    contentEl.appendChild(listContainer)


    const popUp = document.getElementById("popUpWindow")
    if (popUp == null)
        return
    const overlay = document.getElementById("overlay")
    popUp.classList.add("active")
    overlay.classList.add("active")
}

function close_pop_up()
{
    const popUp = document.getElementById("popUpWindow")
    const overlay = document.getElementById("overlay")
    if (popUp == null)
        return
    popUp.classList.remove("active")
    overlay.classList.remove("active")
}

window.addEventListener("click", function(event){
    var popUp = this.document.getElementById("overlay")
    if (popUp.contains(event.target))
    {
        close_pop_up()
    }
  });