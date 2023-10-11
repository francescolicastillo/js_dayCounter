const form = document.querySelector("#form-newEvent");
const eventsList = document.querySelector("#events");
const newEvent = document.querySelector("#event-input");
const dateEvent = document.querySelector("#dateInput");

const stateEvents = [];

const handlerSubmit = (e) => {
    e.preventDefault();
    addEvent();
}

function addEvent() {
    if(isValid()){
        const event = {
            eventTitle: newEvent.value,
            dateE: dateEvent.value,
            idEvent: Date.now(),
        }
        stateEvents.push(event);
        console.log(stateEvents);
    }
}

const isValid = () => {
    return newEvent.value.length && dateEvent.value.length;
}

form.addEventListener("submit", handlerSubmit);