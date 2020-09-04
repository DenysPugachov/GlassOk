window.addEventListener("DOMContentLoaded", function() {
    "use strict";

    let tab = document.querySelectorAll(".info-header-tab"),
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent"),
        descriptionBtn = document.querySelectorAll(".description-btn"),
        more = document.querySelector(".more"),
        close = document.querySelector(".popup-close"),
        overlay = document.querySelector(".overlay");
    // console.log(descriptionBtn);

    //Hide all Tabs
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }
    hideTabContent(1);

    //Show certain Tab
    function showTabContent(b) {
        if (tabContent[b].classList.contains("hide")) {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    //add Evets for every Tabs
    info.addEventListener("mouseover", function(e) {
        let target = e.target;
        if (target && target.classList.contains("info-header-tab")) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

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

    //Modal window
    more.addEventListener("click", showModWindow);
    close.addEventListener("click", hideModWindow);
    //add modal window in Tabs description
    descriptionBtn.forEach(item => {
        item.addEventListener("click", showModWindow);
    });

    //Hide modal windodw
    function hideModWindow() {
        overlay.style.display = "none";
        this.classList.remove("more-splash");
        document.body.style.overflow = ""; //overflow ON
    }

    // Show modal window
    function showModWindow() {
        overlay.style.display = "block";
        this.classList.add("more-splash");
        document.body.style.overflow = "hidden"; //overflow Off
    }

    let form = document.querySelector(".main-form"),
        contForm = document.querySelector("#form"),
        input = document.getElementsByTagName("input"),
        statusMessage = document.createElement("div"),
        message = {
            loading: "Lodading...",
            success: "Thanks. We will contact you soon!",
            failure: "Somethig went wrong..."
        };

    statusMessage.classList.add("status");
    statusMessage.classList.add("snow");

    //fucnction send form to PHP sever
    function sendFormData(formElement) {
        formElement.addEventListener("submit", function(e) {
            e.preventDefault(); //prevent default sending requerst
            formElement.appendChild(statusMessage);

            let formData = new FormData(formElement),
                obj = {};

            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            let jsonData = JSON.stringify(obj);

            function postData(data) {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open("POST", "server.php");
                    request.setRequestHeader("Content-type", "application/json; charset=utf-8");

                    request.onreadystatechange = function() {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 3) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    };
                    request.send(data);
                });
            }

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = "";
                }
            }

            postData(jsonData)
                .then(() => (statusMessage.innerHTML = message.loading))
                .then(() => (statusMessage.innerHTML = message.success))
                .catch(() => (statusMessage.innerHTML = massage.failure))
                .then(clearInput);
        });
    }

    sendFormData(form);
    sendFormData(contForm);

    //Slider

    let slideIndex = 1, //number of current slide
        slides = document.querySelectorAll(".slider-item"), //slids
        prev = document.querySelector(".prev"), //arrow letf
        next = document.querySelector(".next"), //arrow right
        dotsWrap = document.querySelector(".slider-dots"), //dots wrap
        dots = document.querySelectorAll(".dot"); //each dot

    showSlides(slideIndex);
    function showSlides(n) {
        //return to the 1st after last slide
        if (n > slides.length) {
            slideIndex = 1;
        }
        //return to last slide after 1st slide
        if (n < 1) {
            slideIndex = slides.length;
        }
        //hide slides
        slides.forEach(item => (item.style.display = "none"));
        //remove class dot-active
        dots.forEach(item => item.classList.remove("dot-active"));
        //show needed slide
        slides[slideIndex - 1].style.display = "block";
        //show needed dot
        dots[slideIndex - 1].classList.add("dot-active");
    }

    //change slide depend of arrows
    function plusSlides(n) {
        showSlides((slideIndex += n));
    }
    //change slide depend of dots
    function currentSlide(n) {
        showSlides((slideIndex = n));
    }
    //add slide change to arrows
    prev.addEventListener("click", () => plusSlides(-1));
    next.addEventListener("click", () => plusSlides(1));

    //use dots to change slied through delegation
    dotsWrap.addEventListener("click", function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains("dot") && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

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

    console.log("test");
});
