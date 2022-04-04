
//Create a listener function that gets the info for the current tab
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
      getCurrentTab()
    }
  })

  //injects the JS file into the frontend to implement functionality
  async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    await chrome.scripting.executeScript({
      //current tab
        target: {tabId: tab.id},
        //the file to inject
        files: ['changeContent.js']
    })
  }



