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
    const nodeTime = document.createTextNode(new Date(event.dateEvent).toLocaleString());
    divDate.appendChild(nodeTime);

    const para = document.createElement("p");
    para.setAttribute("class", "titleEvent");
    const node = document.createTextNode(event.titleEvent);
    para.appendChild(node);

    divContainerDescription.appendChild(divDate);
    divContainerDescription.appendChild(para);

    const divTimer = document.createElement("div");
    divTimer.setAttribute("class", "restTime");
    const nodeTimer = (formatScreenRemainingTime(new Date(event.dateEvent) - new Date(Date.now())));
    divTimer.appendChild(nodeTimer);

    const deletebtn = document.createElement("button");
    deletebtn.setAttribute("id", "delete-"+event.idEvent);
    deletebtn.setAttribute("class", "btn-delete");
    deletebtn.setAttribute("title", "Delete");
    const deleteIcon = document.createElement("img");
    deleteIcon.setAttribute("src", "image/delete_forever_FILL0_wght400_GRAD0_opsz24.svg");
    deleteIcon.setAttribute("id", "delImg-"+event.idEvent);
    deletebtn.appendChild(deleteIcon);

    divContainer.appendChild(divContainerDescription);
    divContainer.appendChild(divTimer);
    divContainer.appendChild(deletebtn);

    eventsList.appendChild(divContainer);
    startInterval(event);
    setEventToDelete(event);
}

const formatScreenRemainingTime = (time) => {
    let fTime = formatTime(time);
    let arrayTime = fTime.split(":");

    const dayDiv = document.createElement("div");
    const dayNumberDiv = document.createElement("div");
    const dayNumberTxt = document.createTextNode(arrayTime[0]);
    dayNumberDiv.appendChild(dayNumberTxt);
    const dayTxtDiv = document.createElement("div");
    dayTxtDiv.setAttribute("class", "label-txt");
    const dayText = document.createTextNode("Days");
    dayTxtDiv.appendChild(dayText);
    dayDiv.appendChild(dayNumberDiv);
    dayDiv.appendChild(dayTxtDiv);

    const hourDiv = document.createElement("div");
    const hourNumberDiv = document.createElement("div");
    const hourNumberTxt = document.createTextNode(arrayTime[1]);
    hourNumberDiv.appendChild(hourNumberTxt);
    const hourTxtDiv = document.createElement("div");
    hourTxtDiv.setAttribute("class", "label-txt");
    const hourText = document.createTextNode("Hours");
    hourTxtDiv.appendChild(hourText);
    hourDiv.appendChild(hourNumberDiv);
    hourDiv.appendChild(hourTxtDiv);

    const minuteDiv = document.createElement("div");
    const minuteNumberDiv = document.createElement("div");
    const minuteNumberTxt = document.createTextNode(arrayTime[2]);
    minuteNumberDiv.appendChild(minuteNumberTxt);
    const minuteTxtDiv = document.createElement("div");
    minuteTxtDiv.setAttribute("class", "label-txt");
    const minuteText = document.createTextNode("Minutes");
    minuteTxtDiv.appendChild(minuteText);
    minuteDiv.appendChild(minuteNumberDiv);
    minuteDiv.appendChild(minuteTxtDiv);

    const secondDiv = document.createElement("div");
    const secondNumberDiv = document.createElement("div");
    const secondNumberTxt = document.createTextNode(arrayTime[3]);
    secondNumberDiv.appendChild(secondNumberTxt);
    const secondTxtDiv = document.createElement("div");
    secondTxtDiv.setAttribute("class", "label-txt");
    const secondText = document.createTextNode("Seconds");
    secondTxtDiv.appendChild(secondText);
    secondDiv.appendChild(secondNumberDiv);
    secondDiv.appendChild(secondTxtDiv);

    const contDiv = document.createElement("div");
    contDiv.appendChild(dayDiv);
    contDiv.appendChild(hourDiv);
    contDiv.appendChild(minuteDiv);
    contDiv.appendChild(secondDiv);
    return contDiv;
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
        let a = restTime.querySelector("div");
        restTime.removeChild(a);
        restTime.appendChild(formatScreenRemainingTime(new Date(event.dateEvent) - new Date(Date.now())));
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