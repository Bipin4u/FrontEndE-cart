import React, { useState,useContext } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RightSidebarDemo() {
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const {userLogout} = useContext(AuthContext)
  const navigate = useNavigate()

  const wishList = () =>{
    navigate('/wishlist')
  }
  const myOrder = () =>{
    navigate('/myorder')
  }
  const items = [
    {
      items: [
        {
          label: "Home",
          icon: "pi pi-home",
          command: () => navigate('/'),
          
        },
        {
          label: "Wish List",
          icon: "pi pi-heart",
          command: () => wishList,
        },
        {
            label: "My Orders",
            icon: "pi pi-file-check",
            command: () => myOrder,
          },
          {
            label: "Cart",
            icon: "pi pi-shopping-cart",
            command: () => navigate('/cart'),
          },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: () => userLogout(),
        },
      ],
    },
  ];
  return (
    <div className="bg-transparent ">
      <div className="flex justify-content-center p-0">
        <Button
          onClick={() => setVisibleRight(true)}
          className="p-button-text m-0"
        >
          <i
            className="pi pi-bars"
            style={{ color: "white", fontSize: "1.7rem" }}
          ></i>
        </Button>
      </div>

      <Sidebar
        style={{width:'170'}}
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <h2>Memu</h2>
        <div>
          <div  className=" flex justify-content-center">
            <Menu   model={items} />
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
