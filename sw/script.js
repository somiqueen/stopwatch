let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps-list');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 10);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        lapButton.disabled = false;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
        lapButton.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    lapCounter = 0;
    timeDisplay.innerHTML = "00:00:00.000";
    lapsList.innerHTML = "";
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
}

function lap() {
    lapCounter++;
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapCounter}: ${timeDisplay.textContent}`;
    lapsList.appendChild(lapTime);
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));

    timeDisplay.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, size = 2) {
    let padded = number.toString();
    while (padded.length < size) padded = "0" + padded;
    return padded;
}
