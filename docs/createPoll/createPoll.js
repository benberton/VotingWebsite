
//adds item to array of pollItems and refreshes the page with updated items
function addItem()
{
    //getting item from input
    let input = document.getElementById("pollInput").value
    //clearing input
    document.getElementById("pollInput").value = ""
    displayItem(input)
}

//displays a string as an element in a container
function displayItem(input)
{
    const container = document.getElementById("pollContainer")
    const item = document.createElement("div")
    item.innerHTML = input
    item.classList.add("item")
    //if item is clicked, then it is removed from the list
    item.addEventListener("click", e=> {
        item.remove()
    })
    //adding hidden x
    const xLetter = document.createElement("div")
    xLetter.innerHTML = "&times;"  
    xLetter.classList.add("hiddenX")
    item.appendChild(xLetter)

    container.appendChild(item)
}

//collects the current desired poll items and saves them in local storage
function generatePoll()
{
    const container = document.getElementById("pollContainer")
    let list = []
    //items start at index 1, index 0 holds emty space of some sort
    for (let i = 1; i < container.childNodes.length; ++i)
        list.push(container.childNodes[i].firstChild.nodeValue)
    return list
}

document.addEventListener("DOMContentLoaded", ()=>{
    var input = document.getElementById("pollInput");
    //when 'Enter' is clicked, addItem() called
    input.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter")
          addItem()
    });
})
