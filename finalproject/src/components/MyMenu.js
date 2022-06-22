import React from 'react';
import 'firebase/firestore';
import {Link,useLocation} from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/ListItem';

function MyMenu(){
    const location =useLocation();
    const menuItems = [
        {
            name:'我的文章',
            path: '/my/posts'
        },
        {
            name:'會員資料',
            path: 'my/settings'
        },
    ];
    return(
        <List animated selection>
            {menuItems.map((menuItem)=>{
                return(
                    <ListItem
                        as={Link} 
                        to={menuItem.path} 
                        key={menuItem.name} 
                        active={menuItem.path===location.pathname}
                    >
                    {menuItem.name}
                    </ListItem>
                );
            })}
        </List>
    )
}

export default MyMenu;