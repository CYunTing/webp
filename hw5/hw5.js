var station = [];
var AllTime = [];
var RunTime = [];
var price = [];

$.ajax({
    url:"https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/S2STravelTime/TYMC?%24top=30&%24format=JSON",
    method:"GET",
    dataType:"JSON",
    
    success:
        function (res) {
            
            /*$.each(res[0].TravelTimes, function (i, item) { 
                station_Init[i]=item.ToStationName.Zh_tw;
            }); */
            var A1 = res[0].TravelTimes[0].FromStationName.Zh_tw;
            station[0] = A1;
            for (i = 0; i <= 19; i++){
                var A = res[0].TravelTimes[i].ToStationName.Zh_tw;
                station[i+1] = A;
            }

            for (i = 0; i <= 19; i++){
                var t = res[0].TravelTimes[i].RunTime;
                var T = Math.round(t / 60);
                AllTime[i] = T;
            }

            RunTime[0] = AllTime[0];
            for (i = 1; i <= 19; i++){
                var t1 = AllTime[i-1];
                var t2 = AllTime[i];
                var T = t2-t1;
                RunTime[i] = T;
            }

            for (i = 0; i <= 20; i++){
                $('#A' + (i+1)).append(station[i]);
            }

            for (i = 0; i <= 20; i++){
                var theText = RunTime[i] + "分鐘";
                $('#t' + (i+1)).append(theText);
            }
            

        },
    error:function(err){console.log(err)},
});


$.ajax({
    url:"https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TYMC?%24format=JSON",
    method:"GET",
    dataType: "JSON",
    success:
        function (res) {
            for (i = 0; i <= 19; i++){
                var pri = res[0+20*i+i].Fares[0].Price;
                price[i] = pri;
            }


            for (i = 0; i <= 20; i++){
                var theText = price[i] + "元";
                $('#p' + (i+1)).append(theText);
            }
        },
        
        
        
    error:function(err){console.log(err)},
});
    






