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
    const event = {
        eventTitle: newEvent.value,
        dateE: dateEvent.value,
        idEvent: Date.now(),
    }
    stateEvents.push(event);
    console.log(stateEvents);
}

form.addEventListener("submit", handlerSubmit);