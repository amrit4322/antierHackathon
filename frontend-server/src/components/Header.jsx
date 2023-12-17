import React from "react";
import { NavLink } from "react-router-dom";
import CartBtn from "./buttons/CartBtn";
import Login from "./buttons/Login";
import Signup from "./buttons/Signup";

const Header = () => {
  return (
    <div className="body">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        {" "}
        {/* Changed bg-light to bg-dark */}
        <div className="container-fluid py-2">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                  <NavLink
                    className="navbar-brand text-center fw-bold text-white"
                    to="/"
                    style={{ width: "60%" }}
                  >
                    GamersNest
                  </NavLink>{" "}
                </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>{" "}
                {/* Set text-white for the nav-link */}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/products">
                  Product
                </NavLink>{" "}
                {/* Set text-white for the nav-link */}
              </li>

              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/about">
                  About
                </NavLink>{" "}
                {/* Set text-white for the nav-link */}
              </li>
              
            </ul>

            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                {/*                        
                            <NavLink className="navbar-brand mx-auto fw-bold text-white" to="/">Cool Games</NavLink> */}

                {/* Set text-white for the navbar-brand */}
                <li className="nav-item">
                  
                  <Login />{" "}
                </li>
                
                <li className="nav-item dropdown me-2">
                  <NavLink
                    className="nav-link text-white dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Profile
                  </NavLink>
                  <ul className="dropdown-menu bg-dark me-3">
                    <li>
                      <NavLink className="nav-link text-white dropdown-item" to="/profile">
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link text-white dropdown-item" to="/history">
                        Purchases
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link text-white dropdown-item" to="/contact">
                        Buy Tokens
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                 
                  <CartBtn className="btn btn-light" />{" "}
                </li>
                {/* <Signup className="btn btn-light" /> Set btn-light for Signup button */}
                {/* <CartBtn className="btn btn-light" />  */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
