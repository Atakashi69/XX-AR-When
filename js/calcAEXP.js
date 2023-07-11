calcAEXPButton.addEventListener("click", calcAEXP);

function calcAEXP() {
    let currentAR = parseInt(currentARInput.value);
    let currentAEXP = parseInt(currentAEXPInput.value);
    if (isNaN(currentAR) || isNaN(currentAEXP)) return;

    const ctbl = document.querySelector(".genshin table");
    if (ctbl) document.querySelector(".genshin .EXPTable").removeChild(ctbl);
    const tbl = document.createElement("table");

    for (let i = currentAR + 1, expToNextAR = 0; i <= 60; i++) {
        for (let j = 1; j <= i - currentAR; j++) expToNextAR += AREXPDB[currentAR + j];

        let dailyXP = -1;
        if (i < 15) dailyXP = 2100;
        else if (i < 25) dailyXP = 2200;
        else if (i < 35) dailyXP = 2300;
        else dailyXP = 2400;

        let daysToNextAR = Math.ceil((expToNextAR - currentAEXP) / dailyXP);
        let date = new Date();
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
    document.querySelector(".genshin .EXPTable").appendChild(tbl);
}
