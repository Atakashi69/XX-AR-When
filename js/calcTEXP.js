calcTEXPButton.addEventListener("click", calcTEXP);

function calcTEXP() {
    let currentTL = parseInt(currentTLInput.value);
    let currentTEXP = parseInt(currentTEXPInput.value);
    if (isNaN(currentTL) || isNaN(currentTEXP)) return;

    const ctbl = document.querySelector(".hsr table");
    if (ctbl) document.querySelector(".hsr .EXPTable").removeChild(ctbl);
    const tbl = document.createElement("table");

    for (let i = currentTL + 1, expToNextTL = 0; i <= 70; i++) {
        for (let j = 1; j <= i - currentTL; j++) expToNextTL += TLEXPDB[currentTL + j];

        //daily XP + weekly XP from SU 
        let dailyXP = -1;
        if (i < 20) dailyXP = 2200 + 800 / 7;
        else if (i < 30) dailyXP = 2350 + 800 / 7;
        else if (i < 40) dailyXP = 2500 + 800 / 7;
        else if (i < 50) dailyXP = 2650 + 800 / 7;
        else if (i < 60) dailyXP = 2800 + 800 / 7;
        else dailyXP = 2950 + 800 / 7;

        let daysToNextTL = Math.ceil((expToNextTL - currentTEXP) / dailyXP);
        let date = new Date();
        date.setDate(date.getDate() + daysToNextTL);

        if (date.getTime() <= new Date().getTime()) {
            expToNextTL = 0;
            continue;
        }

        const tr = tbl.insertRow();
        const td1 = tr.insertCell();
        td1.appendChild(document.createTextNode(date.toLocaleDateString()));
        const td2 = tr.insertCell();
        td2.appendChild(document.createTextNode("TL " + i));

        expToNextTL = 0;
    }
    document.querySelector(".hsr .EXPTable").appendChild(tbl);
}
