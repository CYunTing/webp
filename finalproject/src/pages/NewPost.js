import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import firebase from '../utils/firebase';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'; 


function NewPost(){
    const theme1 = createTheme({
        palette: {
            neutral: {
            main: '#E0B5FF',
            contrastText: '#F2FFFF',
            float: 'right',
            },
        },
    });

    
    const history = useHistory();
    const [article, setArticleValue] = React.useState("");
    const onArticleChange = (e) => setArticleValue(e.target.value);
    const [file, setFile] = React.useState(null);
    const previewUrl = file 
        ?URL.createObjectURL(file)
        :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFYxiwko2d1gXR4rQP6uWOyPOgt4LRveo4TAE8KjyYx4AuGdM0TvEu7PXcGfNmtfSXY1M&usqp=CAU";

      

    function handleSubmit () {
        const documentRef = firebase.firestore().collection("posts").doc();
        const fileRef = firebase.storage().ref('post-images/' + documentRef.id);
        const metadata = {
            contentType: file.type
        };
        fileRef.put(file, metadata).then(() => {
            fileRef.getDownloadURL().then((imageUrl) => {
                documentRef.set({
                    content: article,
                    createdAt: firebase.firestore.Timestamp.now(),
                    author: {
                        displayName: firebase.auth().currentUser.displayName || "",
                        photoURL: firebase.auth().currentUser.photoURL || '',
                        uid: firebase.auth().currentUser.uid,
                        email: firebase.auth().currentUser.email
                    },
                    imageUrl,
                }).then(() => {
                    history.push('/');
                });
            })
        })
        
    }

    return (
        <React.Fragment>
            <Container sx={{width:"800px",align:"center"}}>
                <Box sx={{ bgcolor: "#78FFFF", height: 'auto',width:"800px",mt: '100px',display:'flex',flexDirection:'column',
                    align:"center",borderRadius: "20px"}}>
                    <br/>
                    <h3 align="center">發表文章</h3>
                    <TextField
                        margin="normal"
                        required
                        style={{ width: 300 ,height: 80, alignSelf:"center",}}
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/*"
                    />
                    <img 
                        src={previewUrl} 
                        alt=""
                        style={{ width: 200 ,height: 200, alignSelf:"center",mt:"10px"}}
                    />
                    <br/><br/>
                    <TextareaAutosize
                        maxRows={8}
                        aria-label={"maximum height"}
                        placeholder="文章內容"
                        style={{ width: 300 ,height: 200, alignSelf:"center",mt:"10px"}}
                        onChange={onArticleChange}
                        value={article}
                    />
                    <ThemeProvider theme={theme1}>
                    <Button 
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                        color="neutral"
                        style={{ width: 30,alignSelf:"center",}}
                    >
                        發布
                    </Button>
                    </ThemeProvider>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default NewPost;