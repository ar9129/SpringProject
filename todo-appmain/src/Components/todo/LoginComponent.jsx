import {BrowserRouter, Routes, Route, useNavigate, Navigate, useParams, Link} from "react-router-dom";
import { useState } from "react";
import {useAuth} from "./security/AuthContext";





export default function LoginComponent() {

    const [Username, setUsername] = useState("aditya");
  
    function handleUsernameChange(event) {
      setUsername(event.target.value);
    }
  
    const [Password, setPassword] = useState("dummy");
  
    function handlePasswordChange(event) {
      setPassword(event.target.value);
    }
  
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
  
    const navigate = useNavigate();
      
    const authContext= useAuth();


    function handleSubmit() {
      if (authContext.login(Username, Password)) {
        navigate(`/welcome/${Username}`);
       
      } else {
        setShowErrorMessage(true);
      }
    }
  
    return (
      <div className="login">
        
        {showErrorMessage && (
          <div className="errorMessage">
            {" "}
            Bad credentials, Please check your username and password{" "}
          </div>
        )}
        <div className="LoginForm">
          <div>
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={Username}
              onChange={handleUsernameChange}
            />
          </div>
  
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={Password}
              onChange={handlePasswordChange}
            />
          </div>
  
          <div>
            <button type="button" name="login" onClick={handleSubmit}>
              {" "}
              Login{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
  