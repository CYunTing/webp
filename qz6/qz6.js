setInterval(function(){
    var d=new Date();
    var hour=(d.getHours());
    var min=(d.getMinutes());
    var sec=(d.getSeconds());
    var TheText=hour+":"+min+":"+sec;
    $("#demo").text(TheText);
},1000);



