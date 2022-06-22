import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import firebase from '../utils/firebase'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';




const Item = styled(Paper)(({ theme }) => ({
backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
...theme.typography.body2,
padding: theme.spacing(1),
textAlign: 'center',
color: theme.palette.text.secondary,
}));

function Posts(){
    const [posts, setPosts] = React.useState([]);
    
    firebase.firestore().collection("posts").get()
    .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map(docSnapshot => {
            const id = docSnapshot.id;
            return { ...docSnapshot.data(), id };
        })
        setPosts(data);
    })
    

    return(
        <Box sx={{ flexGrow: 1,mt:"100px" }}>
            <List sx={{width:'80%', bgcolor: 'background.paper'}}>               
                {posts.map(post => {
                    return (
                        <ListItem alignItems="flex-start" key={post.id} as={Link} to={`/posts/${post.id}`}>
                            <ListItemAvatar>
                                <Avatar alt="" src={post.author.photoURL} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={post.displayName || "我是沒名字的使用者T_T"}
                            />
                            <img alt="" src={post.imageUrl} />
                            <ListItemText
                                secondary={
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {post.content}
                                    </Typography>
                                }
                            />
                            <Item>
                               <FavoriteBorderIcon color="red"/> 
                               留言0、讚0
                            </Item>
                            

                        </ListItem> 
                    )
                })}
                   
            </List>
        </Box>
    );
}

export default Posts;