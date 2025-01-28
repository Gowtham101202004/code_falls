import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";
// import ms_logo from "../../assets/maniyan_stores.png";

function Navbar() {
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
              <NavLink className="Navlink" to="/main/order">
                Order
              </NavLink>
            </li>
            <li>
              <NavLink className="Navlink" to="/main/account">
                Account
              </NavLink>
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
