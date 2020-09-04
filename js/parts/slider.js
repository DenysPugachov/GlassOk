function slider() {
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
}

module.exports = slider;
