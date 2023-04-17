import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';

const Login = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        const formEmail = e.target.email.value;
        const formPass = e.target.password.value;
        const users = JSON.parse(localStorage.getItem("users")) ?? [];
        
        const user = users.find((storedUser) => {
            return storedUser.email == formEmail;
        });

        if (!user){
            alert("Email Id does not exist. Please Sign up");
            return
        }
        
        else if (user?.password != formPass){
            alert(" Email id or Password is incorrect")
            return  
        }
        if (user?.email) {
            loginUser(user?.email);
            navigate('/')
        }
        
    }

    const loginUser = (userEmail) => {
        if (!userEmail) return ;
        localStorage.setItem("currentLoggedInUserEmail", JSON.stringify(userEmail))
    }

    const onSignUpClick = () => {
        localStorage.removeItem("currentLoggedInUserEmail");
        navigate('/signup')
    }

    return <>
   <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} id="login-form">
            <label for="email">Email id</label>
            <input type="email" id="email" placeholder="Email Id" required onChange={(e) => {setEmail(e.target.value)}} name="email" value={email}></input>
            <label for="password">Password</label>
            <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} name="password" value={password} required></input>
            <input type="submit" id="login" value="Login"/>
        </form>
		<button type="button" className="signup" onClick={onSignUpClick}>Don't have an account? Signup</button>
        </div>
    </>
}

export default Login;