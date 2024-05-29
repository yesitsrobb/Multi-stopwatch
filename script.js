const names = [
    "Robb", "Supreet", "Lisa", "Alla", "Chris", "Bharath", "Shreyaansh", 
    "Crystal", "Daniel", "Rida", "Priscilla", "Gagan", "Sabah", "Abraham"
];

document.addEventListener("DOMContentLoaded", () => {
    const stopwatchesContainer = document.getElementById("stopwatches");

    for (let i = 0; i < names.length; i++) {
        const stopwatch = createStopwatch(i);
        stopwatchesContainer.appendChild(stopwatch);
    }
});

let timers = Array(names.length).fill(0);
let intervals = Array(names.length).fill(null);

let totalElapsedTime = 0;

function startStopwatch(index) {
    // Stop all other stopwatches
    intervals.forEach((interval, i) => {
        if (interval !== null && i !== index) {
            clearInterval(interval);
            intervals[i] = null;
        }
    });

    // Start the selected stopwatch
    if (intervals[index] === null) {
        const startTime = Date.now() - (timers[index] || 0);

        intervals[index] = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            totalElapsedTime = elapsedTime;
            timers[index] = elapsedTime;
            updateStopwatches();
        }, 100);
    }
}

function stopStopwatch(index) {
    if (intervals[index] !== null) {
        clearInterval(intervals[index]);
        intervals[index] = null;
        updateStopwatches();
    }
}

function createStopwatch(index) {
    const stopwatch = document.createElement("div");
    stopwatch.className = "stopwatch";
    stopwatch.innerHTML = `
        <div class="stopwatch-name" id="stopwatch-name-${index}">${names[index]}</div>
        <div class="time" id="time-${index}">00:00.0 (0%)</div>
        <div class="buttons">
            <button class="start-button" onclick="startStopwatch(${index})">Start</button>
            <button class="stop-button" onclick="stopStopwatch(${index})">Stop</button>
        </div>
    `;
    return stopwatch;
}

function updateStopwatches() {
    const totalRunningTime = timers.reduce((acc, cur) => acc + cur, 0);
    for (let i = 0; i < names.length; i++) {
        const percentage = totalRunningTime === 0 ? 0 : ((timers[i] / totalRunningTime) * 100).toFixed(1);
        document.getElementById(`time-${i}`).textContent = formatTime(timers[i]) + ` (${percentage}%)`;
    }
}

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((ms % 1000) / 100);

    return `${pad(minutes)}:${pad(seconds)}.${milliseconds}`;
}

function pad(num) {
    return num.toString().padStart(2, "0");
}
