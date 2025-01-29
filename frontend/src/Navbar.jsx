import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { Outlet } from "react-router-dom";
import AiChat from "./AiChat";
// import ms_logo from "../../assets/maniyan_stores.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <div className="ai-container" onClick={togglePopup}>
      {!isOpen?(<p>O</p>):(<p>X</p>)}
    </div>
    {isOpen &&(<AiChat/>)}

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
    </div>
    <Outlet/>
    </>
  );
}

export default Navbar;
