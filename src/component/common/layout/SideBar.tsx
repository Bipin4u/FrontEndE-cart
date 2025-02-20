import  { useState, useContext } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import { Menu } from "primereact/menu";

export default function RightSidebarDemo() {
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const { userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

 

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate("/");
        setVisibleRight(false);
      },
    },
    {
      label: "Wish List",
      icon: "pi pi-heart",
      command: () => {
        navigate("/wish-list");
        setVisibleRight(false);
      },
    },
    {
      label: "My Orders",
      icon: "pi pi-file-check",
      command: () => {
        navigate('/orders');
        setVisibleRight(false);

      }
    },
    {
      label: "Cart",
      icon: "pi pi-shopping-cart",
      command: () => {
        navigate("/cart");
        setVisibleRight(false);
      },
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        userLogout();
        setVisibleRight(false);
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-content-center p-0 px-2">
        <Button onClick={() => setVisibleRight(true)} className="p-button-text p-0 ">
          <i className="pi pi-bars " style={{ color: "white", fontSize: "1.7rem" }}></i>
        </Button>
      </div>

      <Sidebar
        className="primaryBackground"
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}        
      >
        <h2>Menu</h2>
        <div className="card flex justify-center">
          <Menu
            className="primaryBackground"
            model={items}
            style={{
              backgroundColor: "transparent",     
              border: "none",

            }}
          />
        </div>
      </Sidebar>
    </div>
  );
}
