import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    password:'',
    confirmPassword:''
});
  const [passwordValidationError, setPasswordValidationError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const users = JSON.parse(localStorage.getItem("users")) ?? [];
    const existingUser = users.find((user) => {
      return user.email == email
    });
    if (existingUser) {
      alert("User with above email id already Exists. Please Login with the email id")
      return
    }
    if (confirmPasswordError) {
      alert("Please confirm correct password");
      return;
    }
    if (passwordValidationError) {
      alert("please set correct password");
      return;
    }
    const userId = users.length + 1;
    const updatedUsers = [...users, {name, email, password, userId, taskCounter: 0}];
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    loginUser(email)
  }

  const loginUser = (userEmail) => {
    if (!userEmail) return;
    localStorage.setItem("currentLoggedInUserEmail" , JSON.stringify(userEmail));
    navigate("/")

  }

  const onLoginClick = () => {
    navigate('/login')
  }

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value.trim();
    const newPassword = {...password,[e.target.name]: inputValue}
    setPassword(newPassword);
  }

  const validatePassword = (e)=>{
    const inputValue = e.target.value.trim();
    const fieldName = e.target.name;

    if(fieldName==='password'){
      const passwordLength = inputValue.length;
      const upperCasePresent = /(?=.*?[A-Z])/.test(inputValue);
      const lowerCasePresent = /(?=.*?[a-z])/.test(inputValue);
      const digitsPresent = /(?=.*?[0-9])/.test(inputValue);
      const specialCharPresent = /(?=.*?[#?!@$%^&*-])/.test(inputValue);
      const minLengthPresent = /.{8,}/.test(inputValue);

      let errMsg = "";
      if(passwordLength === 0){
        errMsg="Password is empty";
      } else if (!upperCasePresent){
        errMsg="At least one Uppercase is required";
      } else if(!lowerCasePresent){
        errMsg="At least one Lowercase is required";
      } else if(!digitsPresent){
        errMsg="At least one digit is required";
      } else if(!specialCharPresent){
        errMsg="At least one Special Characters is required";
      } else if(!minLengthPresent){
        errMsg="At least minumum 8 characters is required";
      } else{
        errMsg="";
      }
    setPasswordValidationError(errMsg);
    }

    if(fieldName === "confirmPassword" || (fieldName ==="password" && password.confirmPassword.length>0) ){
            
        if(password.confirmPassword !== password.password)
        {
          setConfirmPasswordError("Passwords do not match!");
        } else{
          setConfirmPasswordError("");
        }
    }
}

  return <>
      <div className ='signup-box'>
        <h1>Sign up</h1>
          <form onSubmit={handleSubmit} id="signup-form">
            <label htmlFor="name">User Name</label>
            <input type="text" placeholder="User name" onChange={(e) => {setName(e.target.value)}} name="name" value={name} required></input>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email Id" onChange={(e) => {setEmail(e.target.value)}} name="email" value={email} required></input>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" onChange={handlePasswordChange} onKeyUp={validatePassword} name="password" value={password.password} required></input>
            {passwordValidationError && <p className="text-danger">{passwordValidationError}</p>}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" placeholder="confirm password" onChange={handlePasswordChange} onKeyUp={validatePassword} name="confirmPassword" value={password.confirmPassword} required></input>
            { confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}
            <input type="submit" value="Sign up"/>
        </form>
        <button onClick = {onLoginClick} className="login"> Have an account? Login </button>
      </div>
  </>
}

export default Signup