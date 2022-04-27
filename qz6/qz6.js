setInterval(function(){
    var d=new Date();
    var hour=(d.getHours());
    var min=(d.getMinutes());
    var sec=(d.getSeconds());
    if(min<10)
        min="0"+min;
    if(sec<10)
        sec="0"+sec;
    if(hour<10)
        hour="0"+hour;
    var TheText=hour+":"+min+":"+sec;
    $("#demo").text(TheText);
},1000);



