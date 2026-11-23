//clear all logic
let clearButton = document.querySelector(".clear_btn");
let input = document.querySelector(".url_input");

let output = document.querySelector(".response_output");
let statusOutput = document.querySelector(".status_output");
let responseTimeElement = document.querySelector(".response_time");

clearButton.addEventListener("click", function () {

    input.value = "";
    output.textContent = "";
    statusOutput.textContent = "";
    responseTimeElement.textContent = "";
    reqBody.value = "";

    // Clear custom headers from the UI
    headerList.textContent = "";

    // Clear stored header data and DOM references
    customHeaders = {};
    headerElements = {};

});

// clickto copy url

input.addEventListener("click", function () {

    let text = input.value.trim();

    if (text === "") {
        return;
    }

    input.select();
    navigator.clipboard.writeText(text);

});


// request Builder

let dropdown = document.querySelector(".req_dropdown");
let reqBody = document.querySelector(".request_body");

let sendRequestButton = document.querySelector(".send_req");


//send request Logic

async function sendRequest() {

    statusOutput.textContent = "";
    output.textContent = "Sending Request...";
    responseTimeElement.textContent = "";

    let startTime;
    let endTime;

    try {

        // Validate URL before processing the body
        if (input.value.trim() === "") {
            output.textContent = "Please enter a URL";
            return;
        }

        startTime = performance.now();

        let data;

        // Parse request body for POST and PUT
        if (dropdown.value === "POST" || dropdown.value === "PUT") {
            data = JSON.parse(reqBody.value);
        }

        // Prepare request headers
        let requestHeaders = { ...customHeaders };

        // Check whether the user already added Content-Type
        let hasContentType = Object.keys(requestHeaders).some(function (name) {
            return name.toLowerCase() === "content-type";
        });

        // Add default JSON content type if needed
        if (data !== undefined && !hasContentType) {
            requestHeaders["Content-Type"] = "application/json";
        }

        // Send HTTP request
        let response = await fetch(input.value, {
            method: dropdown.value,
            headers: requestHeaders,
            body: data !== undefined
                ? JSON.stringify(data)
                : undefined
        });

        endTime = performance.now();

        statusOutput.textContent = `Status: ${response.status}`;
        // Detect response content type
        let contentType = response.headers.get("content-type") || "";
        contentType = contentType.toLowerCase();

        if (response.status === 204) {
            output.textContent = "No Content";
        }

        else if (contentType.includes("application/json")) {
            // JSON handling
            let responseData = await response.json();
            output.textContent = JSON.stringify(responseData, null, 2);
        }

        else if (contentType.startsWith("text/")) {
            // Text handling
            let responseData = await response.text();
            output.textContent = responseData;
        }

        else if(contentType.startsWith("application/xml")){
            // xml 
            let responseData = await response.text();
            output.textContent = responseData;
        }

        else if(contentType.startsWith("application/pdf")){
            output.textContent = "PDF format is not supported yet!";
        }

        else if (contentType.startsWith("image/")) {
            output.textContent = "Image preview is not supported yet!";
        }

        else if (contentType.startsWith("audio/")) {
            output.textContent = "Audio preview is not supported yet!";
        }

        else if (contentType.startsWith("video/")) {
            output.textContent = "Video preview is not supported yet!";
        }

        else{
            output.textContent = "Unsupported Format"
        }
        
    }

    catch (error) {
        output.textContent = error.message;
    }

    finally {

        if (endTime !== undefined) {

            let responseTime = endTime - startTime;

            responseTimeElement.textContent =
                `Response time: ${responseTime.toFixed(2)} ms`;

        }

    }

}


//customheaders logic
let addHeader = document.querySelector(".add_header");
let headerName = document.querySelector(".header_name");
let headerValue = document.querySelector(".header_value");
let headerList = document.querySelector(".header_list");

// Stores actual header data
let customHeaders = {};

// Stores references to the corresponding UI elements
let headerElements = {};


addHeader.addEventListener("click", function () {

    let text = headerName.value.trim();
    let value = headerValue.value.trim();

    // Prevent empty header names and values
    if (text === "" || value === "") {
        return;
    }

    // Find an existing header, ignoring capitalization
    let originalName = Object.keys(customHeaders).find(function (existingName) {

        return existingName.toLowerCase() === text.toLowerCase();

    });


    //Header already exists
    if (originalName !== undefined) {

        // Preserve the original spelling
        text = originalName;

        // Update stored header value
        customHeaders[text] = value;

        // Update existing UI label
        headerElements[text].label.textContent = text + " : " + value;

    }


    //Header is new
    else {

        // Store header data
        customHeaders[text] = value;

        // Create HTML elements
        let hloutput = document.createElement("div");
        let headerLabel = document.createElement("span");
        let removeButton = document.createElement("button");

        headerLabel.textContent = text + " : " + value;
        removeButton.textContent = "Remove";

        // Save the current header name for the remove button
        let currentHeaderName = text;

        removeButton.addEventListener("click", function () {

            // Remove row from UI
            hloutput.remove();

            // Remove header data
            delete customHeaders[currentHeaderName];

            // Remove stored DOM references
            delete headerElements[currentHeaderName];

        });

        // Put label and button inside the row
        hloutput.appendChild(headerLabel);
        hloutput.appendChild(removeButton);

        // Display row in the header list
        headerList.appendChild(hloutput);

        // Store references for future updates
        headerElements[text] = {
            row: hloutput,
            label: headerLabel
        };

    }

    // Clear input fields
    headerName.value = "";
    headerValue.value = "";

});

//send button event
sendRequestButton.addEventListener("click", function () {

    sendRequest();

});
