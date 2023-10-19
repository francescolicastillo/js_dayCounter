const form = document.querySelector("#form-newEvent");
const eventsList = document.querySelector("#events");
const eventInput = document.querySelector("#event-input");
const eventDate = document.querySelector("#dateInput");

let stateEvents = [];

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
            intervalEvent: 0,
        }
        stateEvents.push(event);
        setEventHTML(event);
        cleanState();
    } else{
        alert("Not valid input!")
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

    const divContainerDescription = document.createElement("div");
    divContainerDescription.setAttribute("class", "description");

    const divDate = document.createElement("div");
    divDate.setAttribute("class", "dateEvent");
    const nodeTime = document.createTextNode(event.dateEvent);
    divDate.appendChild(nodeTime);

    const para = document.createElement("p");
    para.setAttribute("class", "titleEvent");
    const node = document.createTextNode(event.titleEvent);
    para.appendChild(node);

    divContainerDescription.appendChild(divDate);
    divContainerDescription.appendChild(para);

    const divTimer = document.createElement("div");
    divTimer.setAttribute("class", "restTime");
    const nodeTimer = document.createTextNode(formatTime(new Date(event.dateEvent) - new Date(Date.now())));
    divTimer.appendChild(nodeTimer);

    const deletebtn = document.createElement("button");
    deletebtn.setAttribute("id", "delete-"+event.idEvent);
    deletebtn.setAttribute("class", "btn-delete");
    const deleteIcon = document.createTextNode("Delete");
    deletebtn.appendChild(deleteIcon);

    divContainer.appendChild(divContainerDescription);
    divContainer.appendChild(divTimer);
    divContainer.appendChild(deletebtn);

    eventsList.appendChild(divContainer);
    startInterval(event);
    setEventToDelete(event);
}

const formatTime = (time) => {
    let outPut = "";
    if(time >= 86400000) {
        const manyTimes = Math.floor(time/86400000);
        outPut += (manyTimes < 10 ? ("0" + Math.floor(time/86400000)) : Math.floor(time/86400000)) + ":";
        time -= (manyTimes*86400000);
    } else {
        outPut += "00:";
    }
    if(time >= 3600000) {
        const manyTimes = Math.floor(time/3600000);
        outPut += (manyTimes < 10 ? ("0" + Math.floor(time/3600000)) : Math.floor(time/3600000)) + ":";
        time -= (manyTimes*3600000);
    } else {
        outPut += "00:";
    }
    if(time >= 60000) {
        const manyTimes = Math.floor(time/60000);
        outPut += (manyTimes < 10 ? ("0" + Math.floor(time/60000)) : Math.floor(time/60000)) + ":";
        time -= (manyTimes*60000);
    } else {
        outPut += "00:";
    }
    if(time >= 1000) {
        outPut += (time < 10000 ? ("0" + Math.floor(time/1000)) : Math.floor(time/1000));
    } else {
        outPut += "00";
    }
    return outPut;
}

const startInterval = (event) => {
    const htmlElement = document.getElementById(event.idEvent);
    let restTime = htmlElement.querySelector(".restTime");
    event.intervalEvent = setInterval(() => {
        restTime.innerHTML = formatTime(new Date(event.dateEvent) - new Date(Date.now()));
        if((new Date(event.dateEvent) - new Date(Date.now())) <= 0) {
            restTime.innerHTML = "Finished";
            clearInterval(event.intervalEvent);
        }
    }, 1000);
}

const setEventToDelete = (event) => {
    const deletebtn = document.getElementById("delete-"+event.idEvent);
    deletebtn.addEventListener("click", handlerDelete);
}

const handlerDelete = (e) => {
    const deleteEvent = e.target.id.split("-")[1];
    document.getElementById(deleteEvent).remove();
    stateEvents = stateEvents.filter((event) => event.idEvent != deleteEvent);
}

form.addEventListener("submit", handlerSubmit);
eventInput.addEventListener("keydown", handlerInputSpace);