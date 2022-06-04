import * as React from 'react';
import { createRoot } from 'react-dom/client';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';


const styleArgument = { fontSize: "40px", color: "#A3A3FF" };
const styleArgument2 = { fontSize: "20px" ,paddingLeft: "5px"};
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

/*
<ul style={{ textAlign: 'left' }}>
    {this.state.itemList.map((item, index) => <li key={`item_${index}`}>{item}</li>) }
</ul>

<List sx={styleArugment2} component="nav" aria-label="mailbox folders">
    {this.state.itemList.map((item, index) => <Divider key={`item_${index}`}>{item}</Divider>) }
</List>
*/

class ToDoList extends React.Component {
    constructor(props) {
        super(props); //透過super()就能取得所繼承的類別中的變數結構
        this.state = {
            value: '',
            itemList: [],
        };
        this.handleChange = this.handleChange.bind(this); //bind綁定
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }
  
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    
    handleSubmit(event) {   
        this.state.itemList.push(this.state.value);
        this.setState({value: '', itemList: this.state.itemList,});
        event.preventDefault(); //使用 preventDefault() 阻止無效文本輸入到達輸入字段
    }

    deleteTask(index) {
        console.log({index})
        
    }

 
    render() {
        return (
            <div>
                <h1 style={styleArgument}>CGU Todo list</h1>   
                <form onSubmit={this.handleSubmit} >
                <div >
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="add a new todo..."/>
                </div>
                <input type="submit" value="Add" />
                </form>

                <div>
                    {this.state.itemList.map((item, index) => 
                        <div id={`item_${index}`}>
                            <Checkbox {...label}
                                sx={{
                                    color: pink[800],
                                    '&.Mui-checked': {
                                        color: pink[600],
                                    },
                                }} />
                            <text style={styleArgument2}>{item}</text>
                            <IconButton aria-label="delete" disabled
                                onClick={this.deleteTask(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>

                    )}
                </div>
                
            </div>
        );
    }
}
//ReactDOM.render(<ToDoList />,document.getElementById('root'));
const root = createRoot(document.getElementById('root'));
root.render(<ToDoList />);