//  Decleration of variables
let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
let ring = new Audio("audio/calendar-alarm.mp3");


// Time setting 
function updateClock() {
    var now = new Date();
    hour = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

    if (hour == 0) {
        hour = 12;
    }

    if (hour > 12) {
        hour -= 12;
        pe = "PM";
    }

    Number.prototype.pad = function (digits) {
        for (var n = this.toString(); n.length < digits; n = 0 + n);
        return n;
    }

    var ids = ["hour", "minutes", "seconds", "period"];
    var values = [hour.pad(2), min.pad(2), sec.pad(2), pe];

    for (var i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
    }

    for (let i = 0; i < alarmListArr.length; i++) {
        if (alarmListArr[i] == `${hour.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${pe}`) {
            console.log("Alarm ringing...");
            ring.load();
            ring.play();
            document.querySelector("#stopAlarm").style.visibility = "visible";
        }
    }
}

// Time udation 
function initClock() {
    updateClock();
    window.setInterval("updateClock()", 1000);
}


//Setting the alarm
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//  Alarm add section

function setAlarm() {
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if (time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")) {
        alert("You have not set all indexs, Check out once 🫣");
    } else {
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
    }

}

setAlarmBtn.addEventListener("click", setAlarm);


//Deleting alarm

function deleteAlarm(click_id) {
    var element = document.getElementById("alarm" + click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span" + click_id).innerText);
    alarmListArr.splice(deleteIndex, 1);
    element.remove();
}

function stopAlarm() {
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility = "hidden";
}



