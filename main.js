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
        const temo = new Date(eventDate.value);
        const tt = new Date(Date.now());
        console.log(temo);
        console.log(tt);
        console.log(temo - tt);
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
    const div = document.createElement("div");
    const divTimer = document.createElement("div");
    const nodeTime = document.createTextNode(event.dateEvent);
    divTimer.appendChild(nodeTime);

    const para = document.createElement("p");
    const node = document.createTextNode(event.titleEvent);
    para.appendChild(node);
    div.appendChild(divTimer);
    div.appendChild(para);

    eventsList.appendChild(div);
}


form.addEventListener("submit", handlerSubmit);
eventInput.addEventListener("keydown", handlerInputSpace);