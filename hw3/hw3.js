var len = 0;
var TheString = [];
var result = document.getElementById("result");
var YourPress = document.getElementById("YourPress");
document.addEventListener("keydown", GetInput);
var start;

function startGame() {
    start = new Date();

    for (i = 0; i < 5; i++){
        var x = parseInt(Math.floor(Math.random() * 26)); //0-25
        TheString[i] = String.fromCharCode(97 + x);;
    }
    len += 5;
    for (i = 0; i < len; i++){
        result.textContent += TheString[i];
    }
}

function stopGame() {
    TheString = [];
    len = 0;
    result.textContent = '';
}


function createWord(count) {
    len+=count;
    for (i = len-1; i >count-1; i--){
        TheString[i] = TheString[i - count];
    }
    for (i = 0; i < count; i++){
        var x = parseInt(Math.floor(Math.random() * 26)); //0-25
        TheString[i]=String.fromCharCode(97 + x); //a~z:97-122
    }    
    
}



function GetInput(e) {

    var TheWord = e.key;
    var TheKeyCode = e.keyCode;
    YourPress.textContent = TheWord;
    if (65 <= TheKeyCode && TheKeyCode <= 90) {
        //A-Z:65-90
        if (TheWord == TheString[len - 1]) {
            TheString.splice(len - 1, 1);
            len -= 1;
        }
    }

    var now = new Date();
    var time = Math.round(now.getTime() - start.getTime());
    var count = Math.floor(time / 1000 * 2.5);
    createWord(count);
    start = new Date();

    result.textContent = '';
    for (i = 0; i < len; i++){
        result.textContent += TheString[i];
    }
}