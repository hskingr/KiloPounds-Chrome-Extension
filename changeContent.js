
//Looks for variations of currency in £
const reg = /£(([0-9]+(,\d{3})*(\.\d{2})?)|(0\.[0-9]\d)|(0\.0[0-9]))m?/gmi
itemsToChange = []
toggle = true

//executes the script's main function
findMoney(document);


//recursive function to list every dom node element and run a regex check on its textcontent
function findMoney(node) {
    //checks if there is any content and if there is a regex match
    if (node.textContent != null && node.textContent.match(reg) != null) {
        //looks for certain DOM elements
        if (node.nodeName === "SPAN" || node.nodeName === "P" || node.nodeName === "A" ||
            node.nodeName === "H1" || node.nodeName === "H2" || node.nodeName === "H3" || node.nodeName === "H4" ||
            node.nodeName === "TD") {
            const value = node.textContent.match(reg)
            //if multiple currency values exist, this will loop through the single element and change those instances
            value.forEach(originalValue => {
                const replacedValue = `${convertToKilograms(originalValue)}kg`
                //creates an array of values so they can be toggled with a button in the popup menu
                itemsToChange.push({
                    node,
                    originalValue,
                    replacedValue
                })
                //replaces the instance
                node.textContent = node.textContent.replace(originalValue, replacedValue)
                console.log(node.textContent)
            })
        }
    }
    //recursively looping through each node
    var nodes = node.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        //if there are no nodes
        if (!nodes[i]) {
            continue;
        }
        //if there are nodes, recurse into
        if (nodes[i].childNodes.length > 0) {
            findMoney(nodes[i]);
        }
    }
}

//formats the value and converts the £ into Kilograms
function convertToKilograms(input) {
    input = input.slice(1)
    input = input.replace(',', '')
    console.log(parseInt(input))
    return ((input / 2.2046).toFixed(2))
}

//Responds to a button click in the popup menu, this toggles inbetween converting and reverting the values without reloading the page
function convertBack() {
    if (!toggle) {
        itemsToChange.forEach(({
            node,
            originalValue,
            replacedValue
        }) => {
            node.textContent = node.textContent.replace(originalValue, replacedValue)
        })
    } else {
        itemsToChange.forEach(({
            node,
            originalValue,
            replacedValue
        }) => {
            node.textContent = node.textContent.replace(replacedValue, originalValue)
        })
    }
    toggle = !toggle
    return toggle
}

//listens to the button in the popup menu
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //the response is sent back as a boolean to differentiate what state the button should be in.
       const res = convertBack()
            sendResponse({
                status: res
            });

    }
);