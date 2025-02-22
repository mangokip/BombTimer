// User settings
var initialMinutes = 60;
var initialSeconds = 0;
var todayIsChristmas = true;

// Global variables
var minutes = 0;
var seconds = 0;
var refreshIntervalId = 0;
var refreshIntervalId2 = 0;
var showTimer = true;
var flashCount = 0;

function PlayAudio(filename) {
    var audio = new Audio(filename);
    audio.play();
}

function Init() { 
    var bombDiv = document.getElementById("THEBOMB");
    if (todayIsChristmas) {
        bombDiv.innerHTML = '<img src="bomb_christmas.png" id="bomb" onclick="StartTimer()">';
        bombDiv.style.left = "-20px";
    } else {
        bombDiv.innerHTML = '<img src="bomb.png" id="bomb" onclick="StartTimer()">';    
        bombDiv.style.left = "30px";
    }
    bombDiv.innerHTML += '<div id="timerBG" class="lcdfont">00:00</div>';
    bombDiv.innerHTML += '<div id="timer" class="lcdfont"></div>';
    document.getElementById("THEEXPLOSION").innerHTML = '';    
}

function TerroristsWin() { 
    document.getElementById("THEEXPLOSION").innerHTML = '<img src="explosion2.gif" id="explosion">';
    document.getElementById("THEBOMB").innerHTML = '';
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
    var text = minutes < 10 ? "0" + minutes : minutes;
    text += ":";    
    text += seconds < 10 ? "0" + seconds : seconds;    
    if (minutes === 0 && seconds <= 10 && seconds > 0) {
        PlayAudio('beep.wav');
    }
    if (minutes === 0 && seconds === 0) {
        refreshIntervalId2 = setInterval(FlashTimer, 50);
        PlayAudio('doublebeep.wav');
    }    
    document.getElementById("timer").innerHTML = text;        
    if (seconds === -1 && minutes === 0) {
        TerroristsWin();
    }        
    if (minutes > 0 && seconds === 0) {
        seconds = 60;
        minutes--;
    }
    if (seconds > -1) {
        seconds--;
    }
}

document.body.onkeyup = function(e) {
    if (e.key === " " || e.code === "Space" || e.keyCode === 32) {    
        PlayAudio('AK47_Fire1.wav');
    }
};
