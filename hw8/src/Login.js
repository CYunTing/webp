import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const Login = () => {
    return (
        <div>
            <TextField id='email' label="Email Address"></TextField>
            <TextField id='password' label="Password"></TextField>
            <Button variant="contained" color="primary">SI IN</Button>
        </div>
    );
           
    
}

export default Login;