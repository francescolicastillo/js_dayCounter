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
        setEvent(event);
    }
}

const isValid = () => {
    return eventInput.value.length && eventDate.value.length;
}

const setEvent = (event) => {
    const div = document.createElement("div");
    const node = document.createTextNode("New");
    div.appendChild(node);
    eventsList.appendChild(div);
}


form.addEventListener("submit", handlerSubmit);
eventInput.addEventListener("keydown", handlerInputSpace);