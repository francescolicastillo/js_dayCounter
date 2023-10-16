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
    
    const divDate = document.createElement("div");
    divDate.setAttribute("class", "dateEvent");
    const nodeTime = document.createTextNode(event.dateEvent);
    divDate.appendChild(nodeTime);

    const para = document.createElement("p");
    para.setAttribute("class", "titleEvent");
    const node = document.createTextNode(event.titleEvent);
    para.appendChild(node);

    const divTimer = document.createElement("div");
    divTimer.setAttribute("class", "restTime");
    const nodeTimer = document.createTextNode(formatTime(new Date(event.dateEvent) - new Date(Date.now())));
    divTimer.appendChild(nodeTimer);

    divContainer.appendChild(divDate);
    divContainer.appendChild(para);
    divContainer.appendChild(divTimer);

    eventsList.appendChild(divContainer);
    // startInterval(event.idEvent);
}

const formatTime = (time) => {
    console.log(time);
    let outPut = "";
    let copy = JSON.parse(JSON.stringify(time));
    if(copy >= 86400000) {
        const manyTimes = Math.floor(copy/86400000);
        outPut += (manyTimes < 10 ? ("0" + Math.floor(copy/86400000)) : Math.floor(copy/86400000)) + ":";
        copy -= (manyTimes*86400000);
    } else {
        console.log("days");
        outPut += "00:";
    }
    if(copy >= 3600000) {
        const manyTimes = Math.floor(copy/3600000);
        outPut += (manyTimes < 10 ? ("0" + Math.floor(copy/3600000)) : Math.floor(copy/3600000)) + ":";
        copy -= (manyTimes*3600000);
    } else {
        console.log("hours");
        outPut += "00:";
    }
    if(copy >= 60000) {
        const manyTimes = Math.floor(copy/60000);
        outPut += (manyTimes < 10 ? ("0" + Math.floor(copy/60000)) : Math.floor(copy/60000)) + ":";
        copy -= (manyTimes*60000);
    } else {
        console.log("minutes");
        outPut += "00:";
    }
    if(copy >= 600) {
        const manyTimes = Math.floor(copy/600);
        outPut += (manyTimes < 10 ? ("0" + Math.floor(copy/600)) : Math.floor(copy/600));
        copy -= (manyTimes*600);
    } else {
        console.log("seconds");
        outPut += "00";
    }
    let timeFormated = (
            (Math.floor(time/86400000) < 10 ? ("0" + Math.floor(time/86400000)) : Math.floor(time/86400000))
            + ":"
            + (Math.floor(time/3600000) < 10 ? ("0" + Math.floor(time/3600000)) : Math.floor(time%3600000))
            + ":" 
            + (Math.floor(time/60000) < 10 ? ("0" + Math.floor(time/60000)) : Math.floor(time%60000))
            + ":" 
            + ((time%60) < 10 ? ("0"+(time%60)) : (time%60))
        );
    console.log(timeFormated);
    console.log(outPut);
    return timeFormated;
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