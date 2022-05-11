const changeText=(event)=>{ 
    console.log(event.target) 
    event.target.innerText = event.target.innerText + "被點了" 
}
  
const MultiButton = (num) => {
    //<button onClick={changeText}> 第1個按鍵 </button>;

    var output = [];
    for (var i = 1; i <= num; i++)
        output.push(<button id={'b'+i} >第{i}個按鍵</button>)
    return output;
}


var Buttons = document.getElementById("root");
Buttons.onclick=changeText;

//onClick={changeText}

export default MultiButton;
  
