//copy logic 

let copy = document.querySelector(".copy_btn");
let input = document.querySelector(".url_input")
copy.addEventListener("click", function(){
    let text = input.value.trim()
    if(text === ""){
        return;
    }

    else{
        navigator.clipboard.writeText(text);
    }
})


//send request logic
let sendRequestButton = document.querySelector(".send_req")
let output = document.querySelector(".response_output")
let statusOutput = document.querySelector(".status_output");

async function sendRequest(){
    statusOutput.textContent = "";
    output.textContent = "Sending Request..."

    let startTime;
    let endTime;
    try{
        startTime = performance.now()

        let response = await fetch(input.value)

        endTime = performance.now();
        
        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }

        statusOutput.textContent = `Status: ${response.status}`;


        let data = await response.json()

        output.textContent = JSON.stringify(data, null, 2);

    }

    catch(error){
        output.textContent = error.message
    }

    finally{
        let responseTimeElement = document.querySelector(".response_time");

        if (endTime !== undefined) {
            let responseTime = endTime - startTime;
            responseTimeElement.textContent =
            `Response time: ${responseTime.toFixed(2)} ms`;
        }
        
        let responseTime = endTime - startTime;

        responseTimeElement.textContent = `Response time: ${responseTime.toFixed(2)} ms`;
    }
}


sendRequestButton.addEventListener("click", function(){
    sendRequest();
})
