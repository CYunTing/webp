import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import firebase from './utils/firebase';
import 'firebase/auth';
import './App.css';
import { useHistory } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

   

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const theme1 = createTheme({
  palette: {
    neutral: {
      main: '#FFE8E8',
      contrastText: '#0F0F0F',
      float: 'right',
    },
  },
});




export default function PrimarySearchAppBar() {
  const history = useHistory();
  const [user,setUser] = React.useState(null);
  React.useEffect(()=>{
    firebase.auth().onAuthStateChanged((currentUser)=>{
      setUser(currentUser);
    });
  },[]);

  function theSignout(){
    firebase.auth().signOut();
    history.push('/');
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#FFAC12	'}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link underline="hover" color="inherit" href="/Home">首頁</Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="搜尋"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <ThemeProvider theme={theme1}>
            <Stack direction="row" spacing={2} sx={{ ml: 80}}>
              {user ? (
                <>
                  <Button variant="contained" startIcon={<ArticleIcon />} color="neutral" >
                    <Link underline="hover" color="inherit" href="/new-post">發表文章</Link>
                  </Button>
                  <Button variant="contained" startIcon={<PersonIcon />} color="neutral" >
                    <Link underline="hover" color="inherit" href="/my">會員</Link>
                  </Button> 
                  <Button variant="contained" startIcon={<LogoutIcon />} color="neutral" onClick={theSignout}>
                    登出
                  </Button> 
                  </>
                  ) : (
                    <>
                      <Button variant="contained" startIcon={<PersonIcon />} color="neutral" >
                          <Link underline="hover" color="inherit" href="/Login">登入</Link>
                      </Button>
                      <Button variant="contained" startIcon={<PersonAddAlt1Icon />} color="neutral" >
                          <Link underline="hover" color="inherit" href="/Register">註冊</Link>
                      </Button> 
                    </>
                  )       
              }                   
            </Stack>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
