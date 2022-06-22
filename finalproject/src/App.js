import './App.css';
import {Route, Switch} from 'react-router-dom';
import PrimarySearchAppBar from './Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Posts from './pages/Posts';
import NewPost from './pages/NewPost';
import Post from './pages/Post';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import MyMenu from './components/MyMenu';
import MySettings from './pages/Mysettings';
import RecipeReviewCard from './pages/Home';



function App() {

  return (
    <div>
      <PrimarySearchAppBar />
        <Route path="/" exact>
            <Posts />
        </Route>
        <Route path="/Register" exact>
          <Register/>
        </Route>
        <Route path="/Home" exact>
          <RecipeReviewCard/>
        </Route>
        <Route path="/Login" exact>
          <Login />
        </Route>
        <Route path="/new-post" exact>
          <NewPost />
        </Route>
        <Route path="/posts/:postId" exact>
          <Post />
        </Route>

        <Route path='/my'>
          <Container>
            <Grid>
              <Grid>
                <Grid >
                  <MyMenu />
                </Grid >
                <Grid>
                  <Switch>
                    <Route path='/my/posts' exact>
                      我的文章
                    </Route>
                    <Route path='/my/settings' exact>
                      <MySettings />
                    </Route>
                  </Switch>
                </Grid>
              </Grid>
            </Grid>
            </Container>
        </Route>
        
    </div>  
  );
}

export default App;
