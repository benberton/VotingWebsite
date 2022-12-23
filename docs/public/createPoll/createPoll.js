let numOfItems = 0;


//adds item to array of pollItems and refreshes the page with updated items
function addItem()
{
    //getting item from input
    let input = document.getElementById("pollInput").value

    if (numOfItems >= 10)
        alert("Max items reached (10)")
    else if (input === "")
        alert("Input cannot be empty")
    else
    {
        //if input does not already exist as an item, then it is added
        if (!isItem(input))
        {
            numOfItems++
            displayItem(input)
        }
        //clearing input
        document.getElementById("pollInput").value = ""  
    }
}

//checks if a item already exists, takes in a string
function isItem(text)
{
    const container = document.getElementById("pollContainer")
    for (let i = 1; i < container.childNodes.length; ++i)
        if(container.childNodes[i].firstChild.nodeValue === text)
        {
            alert("'" + text + "'" + " already added")
            return true;
        }   
    return false
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
        numOfItems--;
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
    if (numOfItems < 2)
        alert("Need to add at least 2 items before starting poll")
    else
    {
        const container = document.getElementById("pollContainer")
        let list = []
        //items start at index 1, index 0 holds emty space of some sort
        for (let i = 1; i < container.childNodes.length; ++i)
            list.push(container.childNodes[i].firstChild.nodeValue)
        
        alert("Poll started with " + numOfItems + " items")
        numOfItems = 0

        //clearing the container
        while (container.firstChild)
            container.firstChild.remove()

        //sending the array of candidates to backend
        fetch("http://localhost:3000/api/createPoll", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(list),
        })
        
        //setting the poll items in local storage
        localStorage.setItem("pollItems",JSON.stringify(list))
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
