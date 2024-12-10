document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsContainer = document.getElementById('lapsContainer');
    const laps = document.getElementById('laps');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let lapTimes = [];

    function formatTime(ms) {
        const date = new Date(ms);
        return date.toISOString().substr(11, 8);
    }

    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }

    function start() {
        try {
            startBtn.disabled = true;
            stopBtn.disabled = false;
            lapBtn.disabled = false;
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
        } catch (error) {
            console.error('Error in start function:', error);
        }
    }

    function stop() {
        try {
            startBtn.disabled = false;
            stopBtn.disabled = true;
            lapBtn.disabled = true;
            clearInterval(timerInterval);
        } catch (error) {
            console.error('Error in stop function:', error);
        }
    }

    function reset() {
        try {
            stop();
            elapsedTime = 0;
            updateDisplay();
            lapTimes = [];
            laps.innerHTML = '';
            lapsContainer.style.display = 'none';
        } catch (error) {
            console.error('Error in reset function:', error);
        }
    }

    function lap() {
        try {
            lapTimes.push(elapsedTime);
            const lapElement = document.createElement('div');
            lapElement.classList.add('lap');
            lapElement.textContent = `Lap ${lapTimes.length}: ${formatTime(elapsedTime)}`;
            laps.appendChild(lapElement);
            laps.scrollTop = laps.scrollHeight;
            
            lapsContainer.style.display = 'block';
        } catch (error) {
            console.error('Error in lap function:', error);
        }
    }

    startBtn.addEventListener('click', start);
    stopBtn.addEventListener('click', stop);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', lap);
});