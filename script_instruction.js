if (localStorage.getItem("show") == "false" && localStorage.getItem("forceOpen") == null) {
    console.log("here!");
    window.location.href = "game.html";
}

localStorage.removeItem("forceOpen")

var imgs = document.images,
    len = imgs.length,
    counter = 1;

const button = document.getElementById("skip");
button.addEventListener("click", skip);

function skip() {
    location.href = "game.html";
}

const changeShow = document.getElementById("do-not-show-button");
if (localStorage.getItem("show") == "false") {
    changeShow.innerHTML = "Show this instruction on start of game";
} else {
    changeShow.innerHTML = "Stop showing this instruction on start of game"
}
changeShow.addEventListener("click", changeShowing);

function changeShowing() {
    if (localStorage.getItem("show") == "true") {
        localStorage.setItem("show", "false");
        changeShow.innerHTML = "Show this instruction on start of game";
    } else {
        localStorage.setItem("show", "true");
        changeShow.innerHTML = "Stop showing this instruction on start of game";
    }
}