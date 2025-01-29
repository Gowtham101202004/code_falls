import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faXmark, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import AiChat from "./AiChat";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [username,setUsername]=useState("");
  const navigate=useNavigate(null);

  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem('userData'));
    if(!data){
      toast.error("Unable to get User Data!");
      setTimeout(()=>navigate("/"),1000);
    }
    else{
      setUsername(data.name);
    }

  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setBounce(true);
    setTimeout(() => setBounce(false), 600);
  };

  return (
    <>
      <div className="ai-container" onClick={togglePopup}>
        {!isOpen ? (
          <div className={`ai-icon ${bounce ? "bounce" : ""}`}>
            <FontAwesomeIcon icon={faComment} />
          </div>
        ) : (
          <div className={`ai-icon ${bounce ? "bounce" : ""}`}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        )}
      </div>
      {isOpen && <AiChat />}
      <div className="Navbar">
        <h1>Flipazon.</h1>
        <div className="Nav-Links">
          <ul>
            <li>
              <NavLink className="Navlink" to="/main/home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="Navlink" to="/main/product">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink className="Navlink" to="/main/order">
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="Navbar-Name-Container">
          <h3>Hey!, {username}</h3>
          <span onClick={()=>{
            localStorage.clear();
            toast.success("Logged Out Successfully!");
            setTimeout(()=>navigate("/"),1200);
          }}>
            <FontAwesomeIcon icon={faArrowRightFromBracket}/>
          </span>
        </div>
      </div>
      <Outlet />
      <ToastContainer/>
    </>
  );
}

export default Navbar;
