import React, { useState } from "react";
import './App.css';
import { toast, ToastContainer } from "react-toastify"; // Importing toast
import "react-toastify/dist/ReactToastify.css"; // Importing Toast styles
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const AuthPage = () => {

  const navigate=useNavigate(null);
  
  const serverPort=import.meta.env.VITE_SERVER_PORT;
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const toggleAuthMode = () => setIsLogin((prev) => !prev);

  const sentSMS=async()=>{
    try{
      
      const res=await axios.post(serverPort+"api/user/sendOTP",{phno:"+91"+phone});
      console.log(res);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    }catch(err){
      toast.error("Unable to send SMS");
    }
    

  }

  const handleSendOtp = () => {
    if (!phone || phone.length!=10) {
      toast.error("Please enter a valid phone number!"); // Error toast for missing phone number
      return;
    }
    sentSMS(); 
  };

  const verifyOTP=async()=>{
    try{
      const res=await axios.post(serverPort+"api/user/verifyOTP",{phno:"+91"+phone,otp:otp});
      if(res){
        setIsOtpVerified(true);
        toast.success("OTP Verified!");
        return;
      }
    }catch(err){
      toast.error("Invalid OTP!");
    }
  }

  const handleVerifyOtp = () => {
    if (!otp || otp.length!=6) {
      toast.error("Please enter a valid OTP!"); // Error toast for missing OTP
      return;
    }
    verifyOTP();
    
  };

  const verifyUser=async()=>{
    try{

      const res=await axios.post(serverPort+"api/user/login",{email:email,password:password});
      localStorage.setItem("userData",res);
      
      localStorage.setItem("userData",JSON.stringify(res.data.data));
      toast.success("Logged in successfully!");
      if(res.data.data?.isAdmin){
        setTimeout(()=>{navigate("/admin-dashboard")},1200);
      }
      else{
        setTimeout(()=>{navigate("/home")},1500);
      }
    }catch(err){
      toast.error(err.response.data.message);
    }
  }

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill in all fields!"); // Error toast for missing email or password
      return;
    }
    else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      toast.error("Invalid email format!");
      return 
    }
    verifyUser();
  };

  const sendData=async()=>{
    try{
      const res=await axios.post(serverPort+"api/user/register",{name:name,email:email,password:password,phno:phone});
      localStorage.setItem("UserData",JSON.stringify(res.data.data));
      toast.success("Registered successfully!");
      setTimeout(()=>{
        navigate('/home');
      },1500);

    }catch(err){
      toast.error("Unable to register!");
    }
  }

  const handleRegister = () => {
    if (!name || !email || !password) {
      toast.error("Please fill in all fields!"); // Error toast for missing fields
      return;
    }
    else if(/^[0-9]/.test(name)){
      toast.error("Invalid name formate!");
      return;
    }
    else if(password.length<8){
      toast.error("Password length must br greater then 8.");
      return;
    }
    else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      toast.error("Invalid email format!");
      return 
    }
    sendData();
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{isLogin ? "Login" : "Register"}</h2>

        {isLogin ? (
          <div className="auth-form">
            <label htmlFor="email" className="auth-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
            <button
              className="auth-button"
              onClick={handleLogin}
              disabled={!email || !password}
            >
              Login
            </button>
          </div>
        ) : (
          <div>
            {!otpSent ? (
              <div className="auth-form">
                <label htmlFor="phone" className="auth-label">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="auth-input"
                />
                <button
                  className="auth-button"
                  onClick={handleSendOtp}
                  disabled={!phone}
                >
                  Send OTP
                </button>
              </div>
            ) : !isOtpVerified ? (
              <div className="auth-form">
                <label htmlFor="otp" className="auth-label">
                  OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="auth-input"
                />
                <button
                  className="auth-button"
                  onClick={handleVerifyOtp}
                  disabled={!otp}
                >
                  Verify OTP
                </button>
                <p className="auth-text">
                  Didn’t receive the OTP?{" "}
                  <button onClick={handleSendOtp} className="auth-resend">
                    Resend
                  </button>
                </p>
              </div>
            ) : (
              <div className="auth-form">
                <label htmlFor="name" className="auth-label">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input"
                />
                <label htmlFor="email" className="auth-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
                <label htmlFor="password" className="auth-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
                <button
                  className="auth-button"
                  onClick={handleRegister}
                  disabled={!name || !email || !password}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}

        <p className="auth-text">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleAuthMode} className="auth-toggle">
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>

      {/* ToastContainer to display toasts */}
      <ToastContainer />
    </div>
  );
};

export default AuthPage;
