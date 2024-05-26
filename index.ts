const display = <HTMLDivElement>document.getElementById("display"),
    starter = <HTMLButtonElement>document.getElementById("start"),
    stopper = <HTMLButtonElement>document.getElementById("stop"),
    resetter = <HTMLButtonElement>document.getElementById("reset");

let timer: number,
    startTime = 0,
    elapsed = 0,
    isRunning = false;

starter.onclick = function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsed;
        timer = setInterval(updateTimer, 10);
        isRunning = true;
    }
};

stopper.onclick = function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        elapsed = Date.now() - startTime;
        isRunning = false;
    }
};

resetter.onclick = function resetTimer() {
    clearInterval(timer);
    startTime = 0;
    elapsed = 0;
    isRunning = false;
    display.textContent = "00.00.00:00";
};

function updateTimer() {
    const now = Date.now();
    elapsed = now - startTime;

    const ms = Math.floor((elapsed % 1000) / 10);
    const secs = Math.floor((elapsed / 1000) % 60);
    const mins = Math.floor((elapsed / 60000) % 60);
    const hrs = Math.floor((elapsed / 3600000) % 24);

    const msStr = String(ms).padStart(2, "0");
    const secsStr = String(secs).padStart(2, "0");
    const minsStr = String(mins).padStart(2, "0");
    const hrsStr = String(hrs).padStart(2, "0");

    display.textContent = `${hrsStr}.${minsStr}.${secsStr}:${msStr}`;
}
