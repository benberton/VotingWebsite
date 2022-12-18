let pollItems = []

//adds item to array of pollItems and refreshes the page with updated items
function addItem()
{
    //getting item from input
    let input = document.getElementById("pollInput").value
    //clearing input
    document.getElementById("pollInput").value = ""
    pollItems.push(input)
    displayPollItems(pollItems)
}

//adds the current poll items to the page for the user to see
function displayPollItems(items)
{
    const container = document.getElementById("pollContainer")
    //clears container
    while (container.childElementCount > 0)
        container.firstChild.remove()

    //adding poll elements to container
    for (let i = 0; i < items.length; ++i)
    {
        const item = document.createElement("div")
        item.innerHTML = items[i]
        //if item is clicked, then it is removed from the list
        item.addEventListener("click", e=> {
            items.splice(i,1)
            item.remove()
        })
        container.appendChild(item)
        console.log(item)
    }
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
