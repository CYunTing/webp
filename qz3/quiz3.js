const log=document.getElementById("log");
document.addEventListener("keydown", logkey);

function logkey(e) {
    log.textContent += e.key;
}

/*
e.code -> 像是 a 就會是 'KeyA'、英文上的數字5 = 'Digit5'
e.key -> 大小寫英文字、加按 Shift 的特殊符號
e.keyCode -> 用數字代表的按鍵
*/