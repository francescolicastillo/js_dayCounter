const form = document.querySelector("#form-newEvent");
const eventsList = document.querySelector("#events");
const eventInput = document.querySelector("#event-input");
const eventDate = document.querySelector("#dateInput");

const stateEvents = [];

const handlerSubmit = (e) => {
    e.preventDefault();
    addEvent();
}

const handlerInputSpace = (e) => {
    if(e.code === "Space" && eventInput.value.length <= 1)
        eventInput.value = "";
}

function addEvent() {
    if(isValid()){
        const event = {
            titleEvent: eventInput.value,
            dateEvent: eventDate.value,
            idEvent: Date.now(),
        }
        stateEvents.push(event);
        setEventHTML(event);
        cleanState();
    }
}

const isValid = () => {
    return eventInput.value.length && eventDate.value.length && (new Date(eventDate.value) > new Date(Date.now()));
}

const cleanState = () => {
    eventInput.value = "";
    eventDate.value = "";
}

const setEventHTML = (event) => {
    const divContainer = document.createElement("div");
    divContainer.setAttribute("id", event.idEvent);

    const divTimer = document.createElement("div");
    divTimer.setAttribute("class", "restTime");
    const nodeTimer = document.createTextNode(new Date(event.dateEvent) - new Date(Date.now()));
    divTimer.appendChild(nodeTimer);
    
    const divDate = document.createElement("div");
    divDate.setAttribute("class", "dateEvent");
    const nodeTime = document.createTextNode(event.dateEvent);
    divDate.appendChild(nodeTime);

    const para = document.createElement("p");
    para.setAttribute("class", "titleEvent");
    const node = document.createTextNode(event.titleEvent);
    para.appendChild(node);

    divContainer.appendChild(divTimer);
    divContainer.appendChild(divDate);
    divContainer.appendChild(para);

    eventsList.appendChild(divContainer);
    startInterval(event.idEvent);
}

const startInterval = (id) => {
    const htmlElement = document.getElementById(id);
    let restTime = htmlElement.querySelector(".restTime");
    console.log(restTime);
    const intervalId = setInterval(() => {
        restTime.innerHTML -= 1;
        console.log(restTime);

        // timer.innerHTML = (
        //     (Math.floor(counter/60) < 10 ? ("0" + Math.floor(counter/60)) : Math.floor(counter/60))
        //     + ":" 
        //     + ((counter%60) < 10 ? ("0"+(counter%60)) : (counter%60))
        // );
        if(restTime === 0) {
            // clearInterval(intervalId);
            // setFinishedTasks();
            console.log("finished");
        }
    }, 1000);
}


form.addEventListener("submit", handlerSubmit);
eventInput.addEventListener("keydown", handlerInputSpace);