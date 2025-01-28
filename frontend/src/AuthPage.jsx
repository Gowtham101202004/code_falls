import React, { useState } from "react";
import OTPInput from 'react-otp-input';
import './App.css';
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
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

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };
  
  const handleSendOtp = () => {
    if (!phone || phone.length!=10) {
      toast.error("Please enter a valid phone number!"); 
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
      toast.error("Please enter a valid OTP!"); 
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
      toast.error("Please fill in all fields!"); 
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
      toast.error("Please fill in all fields!"); 
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
            <div className="inputBox">
                <input type="email" id="email"  value={email} onChange={(e) => setEmail(e.target.value)} required />
                <span>Email</span>
                <i></i>
            </div>
            <div className="inputBox">
                <input type="password" id="password"  value={password} onChange={(e) => setPassword(e.target.value)} required />
                <span>Password</span>
                <i></i>
            </div>
            <button
              className="auth-button"
              onClick={handleLogin}
              disabled={!email || !password}>
              Login
            </button>
          </div>
        ) : (
          <div>
            {!otpSent ? (
              <div className="auth-form">
                <div className="inputBox">
                  <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  <span>Phone Number</span>
                  <i></i>
                </div>
                <button
                  className="auth-button"
                  onClick={handleSendOtp}
                  disabled={!phone}>
                  Send OTP
                </button>
              </div>
            ) : !isOtpVerified ? (
              <div className="auth-form">
                {/* <div className="inputBox">
                  <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                  <span>OTP</span>
                  <i></i>
                </div> */}
                <div className="otp-input-container">
                  <OTPInput
                    value={otp}
                    onChange={handleOtpChange}
                    numInputs={6}
                    isInputNum={true}
                    shouldAutoFocus
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}/>
                </div>
                <button
                  className="auth-button"
                  onClick={handleVerifyOtp}
                  disabled={!otp}>
                  Verify OTP
                </button>
                <p className="auth-text">
                  Didn’t receive the OTP?{" "}
                  <span onClick={handleSendOtp} className="auth-resend">
                    Resend
                    </span>
                </p>
              </div>
            ) : (
              <div className="auth-form">
                <div className="inputBox">
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <span>Name</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <span>Email</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <span>Password</span>
                  <i></i>
                </div>
                <button
                  className="auth-button"
                  onClick={handleRegister}
                  disabled={!name || !email || !password}>
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
