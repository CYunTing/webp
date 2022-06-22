import * as React from 'react';
import  { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import firebase from '../utils/firebase';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';


function Login () {
  const history = useHistory();
  const [accountValue, setAccountValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isLoading, setIsLoading] = React.useState("");

  const onAccountChange = (e) => setAccountValue(e.target.value);
  const onPasswordChange = (e) => setPasswordValue(e.target.value);
  function handleSubmit () {
    firebase
      .auth()
      .signInWithEmailAndPassword(accountValue,passwordValue)
      .then(()=>{
          alert("登入成功ヾ(≧▽≦*)o");
          history.push('/');   //導到主頁
          setIsLoading(false); 
      })
      .catch((error) => {
        switch(error.code){
          case 'auth/invalid-email':
            alert('信箱格式不正確＞︿＜');
            break;
          case 'auth/user-not-found':
            alert('信箱不存在＞︿＜');
            break;
          case 'auth/wrong-password':
            alert('密碼錯誤＞︿＜');
            break;
          default:;
        }
        setIsLoading(false);
      }) 

  }

  const theme1 = createTheme({
    palette: {
      neutral: {
        main: '#E0B5FF',
        contrastText: '#F2FFFF',
        float: 'right',
      },
    },
  });
  

    return (
        <Grid item xs={12} sm={8} md={5} ml={45} elevation={6}  width={600}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate  sx={{ mt: 1 }}>
            <h3 align="center">登入( •̀ ω •́ )y</h3>
              <TextField
                margin="normal"
                required
                fullWidth
                id="account"
                label="帳號(電子郵件)"
                name="account"
                onChange={onAccountChange}
                value={accountValue}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="密碼"
                id="password"
                onChange={onPasswordChange}
                value={passwordValue}
                type={'password'} 
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="記住我"
              />
              <ThemeProvider theme={theme1}>
              <Button 
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                  color="neutral"
                  fullWidth
                  loading = {isLoading}
                >
                  登入
                </Button>
              </ThemeProvider>
              
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    忘記密碼QAQ
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"沒有帳號嗎?來註冊一個吧!(((o(*ﾟ▽ﾟ*)o)))"}
                  </Link>
                </Grid>
                </Grid>
                    
            </Box>
            </Box>
        </Grid>
                
    );
           
    
}

export default Login;