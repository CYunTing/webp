import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import firebase from '../utils/firebase';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';
import { FormHelperText } from '@mui/material';


function Register () {
  const history = useHistory();
  const [accountValue, setAccountValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState("");


  const onAccountChange = (e) => setAccountValue(e.target.value);
  const onPasswordChange = (e) => setPasswordValue(e.target.value);
  function handleSubmit () {
    setIsLoading(true);

    firebase
    .auth()
    .createUserWithEmailAndPassword(accountValue,passwordValue)
    .then(()=>{
        alert("註冊成功ヾ(≧▽≦*)o");
        history.push("/");   //導到主頁 
        setIsLoading(false);
    })
    .catch((error) => {
      switch(error.code){
        case 'auth/email-already-in-use':
          alert('這個信箱有人註冊過囉＞︿＜');
          break;
        case 'auth/invalid-email':
          alert('信箱格式不正確＞︿＜');
          break;
        case 'auth/weak-password':
          alert('密碼至少要6個字元＞︿＜');
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
        <Grid item xs={12} sm={8} md={5} ml={45} elevation={6} square width={600}>
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
            <h3 align="center">註冊( •̀ ω •́ )y</h3>
              <TextField
                margin="normal"
                required
                fullWidth
                id="account"
                label="帳號(電子郵件)"
                name="account"
                onChange={onAccountChange}
                value={accountValue}
                type={'email'} 
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
              <FormHelperText>
                      ↑密碼至少要6個字元噢!
              </FormHelperText>
              <ThemeProvider theme={theme1}>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                  color="neutral"
                  fullWidth
                  loading = {isLoading}
                >
                  註冊
                </Button>
              </ThemeProvider>                   
            </Box>
            </Box>
        </Grid>
                
    );
           
    
}

export default Register;