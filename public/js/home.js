const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
let links=document.querySelectorAll(".links a");
let bodyId =document.querySelector("body").id;

for(let link of links){
    if(dataset.actice==bodyId){
        link,classList.add("active");
    }
}