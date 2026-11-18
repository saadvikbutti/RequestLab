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
