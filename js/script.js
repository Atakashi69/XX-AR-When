const currentARInput = document.querySelector("#currentAR");
const currentEXPInput = document.querySelector("#currentEXP");
const calcEXPButton = document.querySelector("#calcEXP");

currentARInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "").replace(/^0/g, "");
});
currentARInput.addEventListener("input", resizeInput);
resizeInput.call(currentARInput);
currentARInput.addEventListener("change", resizeSpan);

currentEXPInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
});
currentEXPInput.addEventListener("input", resizeInput);
resizeInput.call(currentEXPInput);
currentEXPInput.addEventListener("change", resizeSpan);

calcEXPButton.addEventListener("click", calcEXP);

function calcEXP() {
    let currentAR = parseInt(currentARInput.value);
    let currentEXP = parseInt(currentEXPInput.value);
    if (isNaN(currentAR) || isNaN(currentEXP)) return;

    const ctbl = document.querySelector("table");
    if (ctbl) document.querySelector(".EXPTable").removeChild(ctbl);
    const tbl = document.createElement("table");

    for (let i = currentAR + 1, expToNextAR = 0; i <= 60; i++) {
        for (let j = 1; j <= i - currentAR; j++) expToNextAR += AREXPBD[currentAR + j];

        var dailyXP = 1;
        if (i < 15) dailyXP = 2100;
        else if (i < 25) dailyXP = 2200;
        else if (i < 35) dailyXP = 2300;
        else dailyXP = 2400;

        var daysToNextAR = Math.ceil((expToNextAR - currentEXP) / dailyXP);
        var date = new Date();
        date.setDate(date.getDate() + daysToNextAR);

        if (date.getTime() <= new Date().getTime()) {
            expToNextAR = 0;
            continue;
        }

        const tr = tbl.insertRow();
        const td1 = tr.insertCell();
        td1.appendChild(document.createTextNode(date.toLocaleDateString()));
        const td2 = tr.insertCell();
        td2.appendChild(document.createTextNode("AR " + i));

        expToNextAR = 0;
    }
    document.querySelector(".EXPTable").appendChild(tbl);
}

function resizeInput() {
    this.style.width = this.value.length + 2 + "ch";
}

function resizeSpan() {
    if (currentARInput.value >= 60 || currentARInput.value < 1) return;
    const currentEXPLine = document.querySelector(".image-label>.currentEXPLine");
    var percentage = parseInt(currentEXPInput.value) / AREXPBD[parseInt(currentARInput.value) + 1];
    if (percentage < 0) return;
    if (percentage > 1) percentage = 1;
    currentEXPLine.style.width = percentage * 80 + "%";
}
