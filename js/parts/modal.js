function modal() {
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
}

module.exports = modal;
