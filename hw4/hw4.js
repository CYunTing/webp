var len = [0,0,0,0,0,0];
var TheString1 = [];
var TheString2 = [];
var TheString3 = [];
var TheString4 = [];
var TheString5 = [];
var TheString6 = [];


var start;
var ifStart=false;

function startGame() {
    ifStart = true;
    start = (new Date()).getTime();

    var x = parseInt(Math.floor(Math.random() * 26)); //0-25
    var s = parseInt(Math.floor(Math.random() * 6)); //0-5

    if (s == 0) 
        TheString1[0] = x; //a~z:97-122
    else if (s == 1) 
        TheString2[0] = x; //a~z:97-122
    else if (s == 2) 
        TheString3[0] = x; //a~z:97-122
    else if (s == 3) 
        TheString4[0] = x; //a~z:97-122
    else if (s == 4) 
        TheString5[0] = x; //a~z:97-122
    else if (s == 5) 
        TheString6[0] = x; //a~z:97-122
    
    len[s] += 1;
    storeImg(x, s);

    
}

function stopGame() {
    $("div").children().stop(true, false);
}

function storeImg(x,s) {
    
    /*$("#ONE").append('<img src="image/' + 0 + '.png">');*/
    /*$("#ONE").html('<img src="image/' + 0 + '.png">');*/
    /* $('<img src="image/' + x + '.png">').appendTo("#ONE");*/

    if(s==0)
        $('<img src="image/' + x + '.png">').prependTo("#ONE");
    else if(s==1)
        $('<img src="image/' + x + '.png">').prependTo("#TWO");
    else if(s==2)
        $('<img src="image/' + x + '.png">').prependTo("#THREE");
    else if(s==3)
        $('<img src="image/' + x + '.png">').prependTo("#FOUR");
    else if(s==4)
        $('<img src="image/' + x + '.png">').prependTo("#FIVE");
    else if(s==5)
        $('<img src="image/' + x + '.png">').prependTo("#SIX");
    

}

function endGame() {
    TheString1 = [];
    TheString2 = [];
    TheString3 = [];
    TheString4 = [];
    TheString5 = [];
    TheString6 = [];
    len = [0, 0, 0, 0, 0, 0];

    $("#ONE").empty();
    $("#TWO").empty();
    $("#THREE").empty();
    $("#FOUR").empty();
    $("#FIVE").empty();
    $("#SIX").empty();
    
    start = 0;
    ifStart = false;
    $("#YourPress").text("_");
    
}

function createRandom(TheString,count,j)
{
    for (i = count-1; i >= 0; i--){
        var x = parseInt(Math.floor(Math.random() * 26)); //0-25
        TheString[i] = x; //a~z:97-122
        storeImg(x, j);
    }

}


function createWord(count) {

    for (i = 0; i < 6; i++)
        len[i] += count;
    
    for (i = len[0]-1; i >count-1; i--)
        TheString1[i] = TheString1[i - count];
    for (i = len[1]-1; i >count-1; i--)
        TheString2[i] = TheString2[i - count];
    for (i = len[2]-1; i >count-1; i--)
        TheString3[i] = TheString3[i - count];
    for (i = len[3]-1; i >count-1; i--)
        TheString4[i] = TheString4[i - count];
    for (i = len[4]-1; i >count-1; i--)
        TheString5[i] = TheString5[i - count];
    for (i = len[5]-1; i >count-1; i--)
        TheString6[i] = TheString6[i - count];
        
    

    createRandom(TheString1, count,0);
    createRandom(TheString2, count,1);
    createRandom(TheString3, count,2);
    createRandom(TheString4, count,3);
    createRandom(TheString5, count,4);
    createRandom(TheString6, count,5);
}

function Compare(TheKeyCode) {
    if (65 <= TheKeyCode && TheKeyCode <= 90) {
        //A-Z:65-90
        var TheKeyCodeNum = parseInt(Math.floor(TheKeyCode)-65) ;
        
        if (TheKeyCodeNum == TheString1[len[0] - 1]) {
            TheString1.splice(len[0] - 1, 1);
            $("#ONE").children().eq(len[0]-1).remove();
            len[0]-=1;
        }
        else if (TheKeyCodeNum == TheString2[len[1] - 1]) {
            TheString2.splice(len[1] - 1, 1);
            $("#TWO").children().eq(len[1]-1).remove();
            len[1]-=1;
        }
        else if (TheKeyCodeNum == TheString3[len[2] - 1]) {
            TheString3.splice(len[2] - 1, 1);
            $("#THREE").children().eq(len[2]-1).remove();
            len[2]-=1;
        }
        else if (TheKeyCodeNum == TheString4[len[3] - 1]) {
            TheString4.splice(len[3] - 1, 1);
            $("#FOUR").children().eq(len[3]-1).remove();
            len[3]-=1;
        }
        else if (TheKeyCodeNum == TheString5[len[4] - 1]) {
            TheString5.splice(len[4] - 1, 1);
            $("#FIVE").children().eq(len[4]-1).remove();
            len[4]-=1;
        }
        else if (TheKeyCodeNum == TheString6[len[5] - 1]) {
            TheString6.splice(len[5] - 1, 1);
            $("#SIX").children().eq(len[5]-1).remove();
            len[5]-=1;
        }

        
    }
}



function GetInput(event) {
    var TheKeyCode = event.keyCode;
    $("#YourPress").text(String.fromCharCode(parseInt(Math.floor(TheKeyCode))));
    Compare(TheKeyCode);

    var Now = (new Date()).getTime();
    var time = Math.round(Now - start);
    var count = Math.floor(time / 1000 * 1.5);
    if (count == 0)
        count = 1;
    createWord(count);
    start = (new Date()).getTime();
}

function Move() {
    $("#ONE").children().stop().animate({ left: "+=1270px" }, 10000);
    $("#TWO").children().stop().animate({ left: "+=1270px" }, 20000);
    $("#THREE").children().stop().animate({ left: "+=1270px" }, 9000);
    $("#FOUR").children().stop().animate({ left: "+=1270px" }, 8000);
    $("#FIVE").children().stop().animate({ left: "+=1270px" }, 5000);
    $("#SIX").children().stop().animate({ left: "+=1270px" }, 15000);
}

function MyDefeat() {
    var pos1 = $("#ONE").children().eq(len[0]-1).offset();
    var pos2 = $("#TWO").children().eq(len[1]-1).offset();
    var pos3 = $("#THREE").children().eq(len[2]-1).offset();
    var pos4 = $("#FOUR").children().eq(len[3]-1).offset();
    var pos5 = $("#FIVE").children().eq(len[4]-1).offset();
    var pos6 = $("#SIX").children().eq(len[5]-1).offset();

    var pos = [pos1.left, pos2.left, pos3.left, pos4.left, pos5.left, pos6.left];
        
    var max = 0;
    for (i = 0; i < 6; i++){
        if (pos[i] > max)
            max = pos[i];
    }

    

    var maxi=Math.round(max);
    if (maxi > 1280) {
        endGame();
        alert("Game Over.")
    }
    
}





$("#stBtn").click(function () {
    startGame();
    Move();
    
});

$("#endBtn").click(function () {
    endGame();
});

$("#stopBtn").click(function () {
    stopGame();
});



$(document).ready(function () {
    $(document).keydown(function (event) {
        if (ifStart) {
            GetInput(event);
            Move();
        }
           
    });
});

var t1 = window.setInterval("MyDefeat()", 10);









