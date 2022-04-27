var dataUrl = "https://cors-anywhere.herokuapp.com/https://wic.heo.taipei/OpenData/API/Rain/Get?stationNo=&loginId=open_rain&dataKey=85452C1D"; 
var data = $.getJSON(dataUrl); 

var stationNo=[];
var stationName=[];
var recTime=[];
var rain=[];

var y=[];
var m=[];
var d=[];
var hour=[];
var min=[];

data.done( function( msg ) { 
    console.log(msg); 

    for(var i=0;i<5;i++)
    {
        stationNo[i]=msg[i].data.stationNo;
        stationName[i]=msg[i].data.stationName;
        recTime[i]=msg[i].data.recTime;
        rain[i]=msg[i].data.rain;
    }

    for(i=0;i<5;i++){
        y[i]=recTime[i].substr(0,4);
        m[i]=recTime[i].substr(4,2);
        d[i]=recTime[i].substr(6,2);
        hour[i]=recTime[i].substr(8,2);
        min[i]=recTime[i].substr(10,2);
    }

    for(var i=0;i<5;i++){
        var text1=stationName[i]+"("+stationName[i]+")";
        var text2= y[i]+"年"+m[i]+"月"+d[i]+"號"+hour+"點"+min+"分";
        var text3= "即時雨量"+rain[i];
        $("#contain").append($("<h2>").text1);
        $("#contain").append($("<h2>").text2);
        $("#contain").append($("<h2>").text3);
    }

}); 

