function timer() {
    //launch reverseTimer
    let dedline = "2019-12-24";

    function getTimerRemaining(endTime) {
        let diff = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((diff / 1000) % 60),
            minutes = Math.floor((diff / 1000 / 60) % 60),
            hours = Math.floor((diff / (1000 * 60 * 60)) % 60),
            days = Math.floor(diff / (1000 * 60 * 60 * 24));

        return { diff, seconds, minutes, hours, days };
    }

    function setClock(id, endTime) {
        let t = document.getElementById(id),
            seconds = t.querySelector(".seconds"),
            minutes = t.querySelector(".minutes"),
            hours = t.querySelector(".hours"),
            days = t.querySelector(".days"),
            setTimerInerval = setInterval(updateClock, 1000);

        function updateClock() {
            let currentDiffTime = getTimerRemaining(endTime);
            seconds.textContent = currentDiffTime.seconds;
            minutes.textContent = currentDiffTime.minutes;
            hours.textContent = currentDiffTime.hours;
            days.textContent = currentDiffTime.days;

            if (currentDiffTime.diff <= 0) {
                clearInterval(setTimerInerval);
            }
        }
    }
    setClock("timer", dedline);
}

module.exports = timer;
