import * as React from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../utils/firebase'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'; 
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';

function Post(){
    const theme1 = createTheme({
        palette: {
            neutral: {
            main: '#E0B5FF',
            contrastText: '#F2FFFF',
            float: 'right',
            },
        },
    });

  
    const {postId} = useParams();
    const [post, setPost] = React.useState({
        author: {},
    });

    const[commentContent,setCommentContent] = React.useState("");
    const oncommentChange = (e) => setCommentContent(e.target.value);

    //const[comments,setComments] = React.useState([]);

    function onsubmit(){
        const firestore = firebase.firestore();
        const batch = firestore.batch();
        const postRef = firestore.collection('posts').doc(postId);
        batch.update(postRef,{
            commentsCount:firebase.firestore.FieldValue.increment(1)
        })

        postRef.collection('comments').doc();
        const commentRef = postRef.collection('comments').doc();
        batch.set(commentRef,{
            content:commentContent,
            createdAt:firebase.firestore.Timestamp.now(),
            author:{
                uid: firebase.auth().currentUser.uid,
                displayName: firebase.auth().currentUser.displayName||'',
                photoURL:firebase.auth().currentUser.photoURL||'',
            }
        });

        batch.commit().then(() => {
            setCommentContent('');
        });

    }

    React.useEffect(()=>{
        firebase
        .firestore()
        .collection('posts')
        .doc(postId)
        .onSnapshot((docSnapshot)=>{
            const data = docSnapshot.data();
            setPost(data);
        });
        /*.firestore().collection("posts")
        .doc(postId).get()
        .then((docSnapshot) => {
            const data = docSnapshot.data();
            setPost(data);
        })*/
    });

    React.useEffect(()=>{
        firebase
        .firestore()
        .collection('post')
        .doc(postId)
        .collection('comments')
        .onSnapshot((collectionSnapshot)=>{
            const data = collectionSnapshot.docs.map(doc=>{
                return doc.data();
            });
            console.log(data);
            //setComments(data);
        });
    },)
    

    

    const isLiked =post.likeBy?.includes(
        firebase.auth().currentUser.uid
    )

    function toggleLiked(){
        const uid = firebase.auth().currentUser.uid;
        if(isLiked){
            firebase
                .firestore()
                .collection('posts')
                .doc(postId)
                .update({
                    likedBy: firebase.firestore.FieldValue.arrayRemove(uid),
                })
        }else{
            firebase
                .firestore()
                .collection('posts')
                .doc(postId)
                .update({
                    likedBy: firebase.firestore.FieldValue.arrayUnion(uid),
                });
        }
    }

    return (
        <Box sx={{ flexGrow: 1,mt:"100px" ,ml:"100px"}}>
            <Grid container spacing={2}>              
            <Grid item xs={1}> 
            <ListItemAvatar>
                <Avatar alt="" src={post.author.photoURL} />
            </ListItemAvatar>
            </Grid > 
            <Grid item xs={4}> 
            <ListItemText
                primary={post.displayName || "我是沒名字的使用者T_T"}
            />
            </Grid> 
            <Grid item xs={12}> 
            <img alt="" src={post.imageUrl} /><br/>
            </Grid > 
            <Grid item xs={12}> 
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
            </Grid> 
            <Grid item xs={12}> 
            <IconButton  
            >
              <FavoriteIcon
                name={`thumbs up${isLiked ?'':'Contained'}`} 
                color={isLiked?'secondary':'success'}
                onClick={toggleLiked}/>  
                讚{post.likeBy?.length || 0}
            </IconButton>
            </Grid > 
        <Grid>
        <Grid item xs={8}> 
        <TextareaAutosize
            maxRows={8}
            aria-label={"maximum height"}
            placeholder="留言..."
            style={{ width: 300 ,height: 200, alignSelf:"center",mt:"10px"}}
            onChange={oncommentChange}
            value={commentContent}
        />
        </Grid> 
        <Grid item xs={4}> 
        <ThemeProvider theme={theme1}>
        <Button 
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onsubmit}
            color="neutral"
            style={{ width: 30,alignSelf:"center",}}
        >
            留言
        </Button>
        </ThemeProvider>
        </Grid> 
        </Grid>
            
        <Grid container spacing={2} sx={{mt:"50px"}}>
            <Grid item xs={1}> 
                <Avatar alt="" src={""} />
            </Grid>
            <Grid item xs={4} > 
                留言者
            </Grid> 
            <Grid item xs={7} > 
                
            </Grid> 
          <Grid item xs={12}>
            <h4 style={{ margin: 0, textAlign: "left" }}>留言者</h4>
            <p style={{ textAlign: "left" }}>
              好可愛( •̀ ω •́ )y
              </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              {new Date().toLocaleString()}
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        </Grid>
        </Box>
                    
                  
                            
                   
            
    )

}

export default Post;