const currentARInput = document.querySelector("#currentAR");
const currentAEXPInput = document.querySelector("#currentAEXP");
const calcAEXPButton = document.querySelector("#calcAEXP");

const currentTLInput = document.querySelector("#currentTL");
const currentTEXPInput = document.querySelector("#currentTEXP");
const calcTEXPButton = document.querySelector("#calcTEXP");

currentARInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "").replace(/^0/g, "");
});
currentARInput.addEventListener("input", resizeInput);
currentARInput.value = getCookie("AR") || 0;
resizeInput.call(currentARInput);
currentARInput.addEventListener("change", resizeARSpan);
resizeARSpan.call(currentARInput);
currentARInput.addEventListener("change", function () {
    setCookie("AR", this.value, { "max-age": 60 * 60 * 24 * 30 });
});

currentAEXPInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
});
currentAEXPInput.addEventListener("input", resizeInput);
currentAEXPInput.value = getCookie("AEXP") || 0;
resizeInput.call(currentAEXPInput);
currentAEXPInput.addEventListener("change", resizeARSpan);
resizeARSpan.call(currentAEXPInput);
currentAEXPInput.addEventListener("change", function () {
    setCookie("AEXP", this.value, { "max-age": 60 * 60 * 24 * 30 });
});

currentTLInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "").replace(/^0/g, "");
});
currentTLInput.addEventListener("input", resizeInput);
currentTLInput.value = getCookie("TL") || 0;
resizeInput.call(currentTLInput);
currentTLInput.addEventListener("change", resizeTLSpan);
resizeTLSpan.call(currentTLInput);
currentTLInput.addEventListener("change", function () {
    setCookie("TL", this.value, { "max-age": 60 * 60 * 24 * 30 });
});

currentTEXPInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
});
currentTEXPInput.addEventListener("input", resizeInput);
currentTEXPInput.value = getCookie("TEXP") || 0;
resizeInput.call(currentTEXPInput);
currentTEXPInput.addEventListener("change", resizeTLSpan);
resizeTLSpan.call(currentTEXPInput);
currentTEXPInput.addEventListener("change", function () {
    setCookie("TEXP", this.value, { "max-age": 60 * 60 * 24 * 30 });
});

function resizeInput() {
    this.style.width = (this.value.length == 0 ? 1 : this.value.length) + 1 + "ch";
}

function resizeARSpan() {
    if (currentARInput.value >= 60 || currentARInput.value < 1) return;
    const currentAEXPLine = document.querySelector(".image-label>.currentAEXPLine");
    let percentage = parseInt(currentAEXPInput.value) / AREXPDB[parseInt(currentARInput.value) + 1];
    if (percentage < 0) return;
    if (percentage > 1) percentage = 1;
    currentAEXPLine.style.width = percentage * 285 + "px";
}

function resizeTLSpan() {
    if (currentTLInput.value >= 70 || currentTLInput.value < 1) return;
    const currentTEXPLine = document.querySelector(".image-label>.currentTEXPLine");
    let percentage = parseInt(currentTEXPInput.value) / TLEXPDB[parseInt(currentTLInput.value) + 1];
    if (percentage < 0) return;
    if (percentage > 1) percentage = 1;
    currentTEXPLine.style.width = percentage * 285 + "px";
}
