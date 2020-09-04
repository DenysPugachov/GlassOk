function calculator() {
    //Calculator
    let persons = document.querySelectorAll(".counter-block-input")[0],
        restDays = document.querySelectorAll(".counter-block-input")[1],
        place = document.getElementById("select"),
        totalValue = document.getElementById("total"),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener("input", function() {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;
        counterTotal(total);
    });

    restDays.addEventListener("input", function() {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;
        counterTotal(total);
    });

    place.addEventListener("change", function() {
        if (restDays.value == "" || persons.value == "") {
            totalValue.innerHTML = 0;
        } else {
            let sum = total * this.options[this.selectedIndex].value;
            counterTotal(sum);
        }
    });

    function counterTotal(s) {
        if (restDays.value > 0 && persons.value > 0) {
            totalValue.innerHTML = s;
        } else {
            totalValue.innerHTML = 0;
        }
    }
}

module.exports = calculator;
