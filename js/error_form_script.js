window.addEventListener("DOMContentLoaded", function() {
    "use strict";

    let tabs = require("./parts/tabs.js"),
        calculator = require("./parts/calculator.js"),
        form2 = require("./parts/form2.js"),
        modal = require("./parts/modal.js"),
        slider = require("./parts/slider.js"),
        timer = require("./parts/timer.js");

    tabs();
    calculator();
    form2();
    modal();
    slider();
    timer();

    console.log("main.js work!!");
});
