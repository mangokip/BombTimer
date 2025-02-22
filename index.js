// User settings
var initialMinutes = 60;
var initialSeconds = 0;
var todayIsChristmas = true;

// Global variables
var minutes = initialMinutes;
var seconds = initialSeconds;
var refreshIntervalId = 0;
var refreshIntervalId2 = 0;
var showTimer = true;
var flashCount = 0;

function PlayAudio(filename) {
    var audio = new Audio(filename);
    audio.play().catch(error => console.log("Audio playback blocked:", error));
}

function Init() { 
    var bombDiv = document.getElementById("THEBOMB");
    if (todayIsChristmas) {
        bombDiv.innerHTML = '<img src="bomb_christmas.png" id="bomb" onclick="StartTimer()">';
    } else {
        bombDiv.innerHTML = '<img src="bomb.png" id="bomb" onclick="StartTimer()">';    
    }
    bombDiv.innerHTML += '<div id="timerBG" class="lcdfont">00:20</div>';
    bombDiv.innerHTML += '<div id="timer" class="lcdfont">00:20</div>';
    document.getElementById("THEEXPLOSION").innerHTML = '';
}

function TerroristsWin() { 
    let explosionDiv = document.getElementById("THEEXPLOSION");

    // Force reload the explosion GIF by appending a timestamp
    explosionDiv.innerHTML = `<img src="explosion2.gif?${new Date().getTime()}" id="explosion">`;

    document.getElementById("THEBOMB").innerHTML = ''; // Hide the bomb
    clearInterval(refreshIntervalId);
    PlayAudio('explode.wav');
}


function StartTimer() {
    document.getElementById("THEEXPLOSION").innerHTML = '';
    minutes = initialMinutes;
    seconds = initialSeconds;

    DecrementTimer();
    flashCount = 3;
    clearInterval(refreshIntervalId);
    clearInterval(refreshIntervalId2);
    refreshIntervalId = setInterval(DecrementTimer, 1000);
    refreshIntervalId2 = setInterval(FlashTimer, 50);
    PlayAudio('armbomb.wav');
}

function FlashTimer() {
    showTimer = !showTimer;
    document.getElementById("timer").style.visibility = showTimer ? "visible" : "hidden";
    flashCount--;    
    if (flashCount === 0) {
        document.getElementById("timer").style.visibility = "visible";
        clearInterval(refreshIntervalId2);    
    }    
}

function DecrementTimer() {
    if (minutes === 0 && seconds === 0) {
        TerroristsWin();
        return;
    }

    if (seconds > 0) {
        seconds--;  // Correctly decrement seconds
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    }

    // Always format to two digits
    var formattedMinutes = minutes.toString().padStart(2, '0');
    var formattedSeconds = seconds.toString().padStart(2, '0');
    var text = formattedMinutes + ":" + formattedSeconds;

    document.getElementById("timer").innerHTML = text;
    document.getElementById("timerBG").innerHTML = text;

    if (minutes === 0 && seconds <= 10 && seconds > 0) {
        PlayAudio('beep.wav');
    }
    if (minutes === 0 && seconds === 0) {
        PlayAudio('doublebeep.wav');
    }
}


document.body.onkeyup = function(e) {
    if (e.key === " " || e.code === "Space" || e.keyCode === 32) {    
        PlayAudio('AK47_Fire1.wav');
    }
};
