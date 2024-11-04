import React, { useContext } from "react";
import { Link, useLocation  } from "react-router-dom";
import "../css/header.css";
import { AuthContext } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";


const Header = () => {
  const { user, userLogout } = useContext(AuthContext);
  const [menu, setMenu] = React.useState("home");
  const location = useLocation();

  return (
    <header className="headerContainer">
      <div className="HeaderCardLayout">
        <div className="CompanyNameLayout">
          <p>Sri Ram and Co</p>
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
                  Category
                </Link>
                {menu === "category" && <hr className="noborder_hr" />}
              </li>
              <li onClick={() => setMenu("product")}>
                <Link className="MenuCardLayoutli" to="/product">
                  Products
                </Link>
                {menu === "product" && <hr className="noborder_hr" />}
              </li>
              <li onClick={() => setMenu("contact")}>
                <Link className="MenuCardLayoutli" to="/contact">
                  Contact
                </Link>
                {menu === "contact" && <hr className="noborder_hr" />}
              </li>
            </div>
            <div className="LoginCartLayout">
              <div className="CartLayout">Cart</div>
              <div style={{ cursor: "pointer" }} onClick={userLogout}>
                Logout
              </div>
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

export default Header;
