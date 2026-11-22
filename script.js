
// clear Logic
let clearButton = document.querySelector(".clear_btn")
let input = document.querySelector(".url_input")

let output = document.querySelector(".response_output")
let statusOutput = document.querySelector(".status_output")
let responseTimeElement = document.querySelector(".response_time")

clearButton.addEventListener("click", function(){
    input.value = ""
    output.textContent = ""
    statusOutput.textContent = ""
    responseTimeElement.textContent = ""
    reqBody.value = ""
})

//click to copy logic
input.addEventListener("click", function(){
    let text = input.value.trim()

    if(text === ""){
        return;
    }
    else{
        input.select()
        navigator.clipboard.writeText(text);
    }
})

//Dropdown 
let dropdown = document.querySelector(".req_dropdown")

//request builder
let reqBody = document.querySelector(".request_body")

//send request logic
let sendRequestButton = document.querySelector(".send_req")

async function sendRequest(){
    statusOutput.textContent = "";
    output.textContent = "Sending Request..."

    let startTime;
    let endTime;

    try{
        startTime = performance.now()

        let data;

        if(dropdown.value === "POST" || dropdown.value === "PUT"){
            data = JSON.parse(reqBody.value);
        }

        if (input.value.trim() === "") {
            output.textContent = "Please enter a URL";
            return;
        }

        let response = await fetch(input.value, {
            method: dropdown.value,
            headers: {
                "Content-Type": "application/json"
            },
            body: data !== undefined
                ? JSON.stringify(data)
                : undefined
        })

        endTime = performance.now();

        statusOutput.textContent = `Status: ${response.status}`;

        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }

        let responseData = await response.json();

        output.textContent = JSON.stringify(responseData, null, 2);

    }

    catch(error){
        output.textContent = error.message
    }

    finally{
        if (endTime !== undefined) {
            let responseTime = endTime - startTime;

            responseTimeElement.textContent =
                `Response time: ${responseTime.toFixed(2)} ms`;
        }
    }
}

//headers logic
let addHeader = document.querySelector(".add_header");
let headerName = document.querySelector(".header_name")
let headerValue = document.querySelector(".header_value")
let headerList = document.querySelector(".header_list");

let headers = {};

addHeader.addEventListener("click", function(){
    let text = headerName.value.trim()
    let value = headerValue.value.trim()

    if(text === "" || value === ""){
        return;
    }
    headers[text] = value;

    let hloutput = document.createElement("div")
    let removeButton = document.createElement("button")
    let currentHeaderName = headerName.value;
    removeButton.textContent = "Remove"
    removeButton.addEventListener("click", function(){
        hloutput.remove()
        delete headers[currentHeaderName]
    })
    hloutput.textContent = headerName.value +  ": "  +headerValue.value 
    hloutput.appendChild(removeButton)
    headerList.appendChild(hloutput)
    

    headerName.value = "";
    headerValue.value = "";
})

sendRequestButton.addEventListener("click", function(){
    sendRequest();
})
