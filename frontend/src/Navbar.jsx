import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";
// import ms_logo from "../../assets/maniyan_stores.png";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

//   const handleSigninClick = () => {
//     navigate("/signin");
//   };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/product?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
    
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
              <Link className="Navlink" to="/main/product">
                Account
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="search_container">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for Products. . ."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon icon={faSearch} className="search_icon" />
          </form>
        </div> */}
    </div>
    <Outlet/>
    </>
  );
}

export default Navbar;
