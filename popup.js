
//executes when it receives a response from the toggle
function swapButtons(swap) {
    //if true then convert to kilograms
    if (swap) {
        document.getElementById('toggle').classList.remove('btn-danger')
        document.getElementById('toggle').classList.add('btn-success')
    //if false then convert to pounds
    } else {
        document.getElementById('toggle').classList.remove('btn-success')
        document.getElementById('toggle').classList.add('btn-danger')
    }
}


//sends a message to the frontend script to toggle the conversion
function convertBack() {
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
   chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {
    console.log(response.status);
    swapButtons(response.status)
  });
});

}

//adds a listener to the button in the popup
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("toggle").addEventListener("click", convertBack)

})

