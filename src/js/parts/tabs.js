function tabs() {
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
}

module.exports = tabs;
