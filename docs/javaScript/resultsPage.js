document.addEventListener("DOMContentLoaded", ()=>{
    console.log("loaded")
    const myObjectString = localStorage.getItem('votePoll');
    const votePoll = JSON.parse(myObjectString);
    console.log(votePoll.candidates)
})