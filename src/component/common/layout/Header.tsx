import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/header.css";
import { AuthContext } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "primereact/badge";
import SideBar from "./SideBar";
import { CartContext } from "../../context/CartContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  const {  cartQuantity } = useContext(CartContext);

  const [menu, setMenu] = React.useState("home");
  const location = useLocation();

  return (
    <header style={{height:"9vh", textAlign: "center", backgroundColor:'#008374' }} >
      <div className="HeaderCardLayout">
        <div className="CompanyNameLayout">
          <p>Bipin's Project</p>
        </div>

        {user ? (
          <>
            <div className="MenuCardLayout">
              <li onClick={() => setMenu("home")}>
                <Link className="MenuCardLayoutli" to="/">
                  Home
                </Link>
                {menu === "home" && <hr className="noborder_hr" />}
              </li>
              <li onClick={() => setMenu("category")}>
                <Link className="MenuCardLayoutli" to="/category">
                  About
                </Link>
                {menu === "category" && <hr className="noborder_hr" />}
              </li>
              <li onClick={() => setMenu("contact")}>
                <Link className="MenuCardLayoutli" to="/contact">
                  Contact me
                </Link>
                {menu === "contact" && <hr className="noborder_hr" />}
              </li>
            </div>
            <div className="LoginCartLayout" style={{cursor:"pointer"}}>
              <div className="CartLayout">
                <Link to="/cart" style={{ textDecoration: "none", color:'white' }}>
                  <i
                    className="pi pi-shopping-cart p-overlay-badge"
                    style={{ fontSize: "1.7rem" }}
                  >
                    <Badge style={{backgroundColor:"#EC4444"}} value={cartQuantity}></Badge>
                  </i>
                </Link>
              </div>
              <SideBar />
              :
            </div>
          </>
        ) : (
          <>
            <div className="LoginCartLayout">
              {location.pathname !== "/login" && (
                <Link
                  className="mx-3"
                  style={{ textDecoration: "none", color: "white" }}
                  to="/login"
                >
                  Login
                </Link>
              )}
              {location.pathname !== "/register" && (
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/register"
                >
                  Register
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default React.memo(Header);
