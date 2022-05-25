import './App.css';
import UserName from './username.js';
import Password from './password.js';
import LoginButton from './loginButton.js';

function App() {
  return (
    <div className="App">
      <div className="ONE">
        <h3>CGU Login</h3>
        <UserName />
        <Password />
        <LoginButton />
      </div>
    </div>
  );
}

export default App;
