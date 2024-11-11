import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import CartCard from "./CartCard";
import CartBill from "./CartBill";

const Cart = () => {
  const { cartItem } = useContext(AuthContext);
  if(!cartItem ){
    return (
      <div>wait</div>
    )
  }
  if(cartItem.length < 1 ){
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <h1 className="text-center">Your Cart is Empty</h1>
      </div>    
    )
  }
  return (
<div className="container my-4">
  <h2 className="text-center mb-4">Your Cart</h2>
  <div className="row">
    <div className="col-lg-8 col-md-7 mb-3">
      <div className="p-3 border rounded bg-light">
        {cartItem.map((item, index) => (
          <div key={index} className="mb-3 border-bottom pb-2">
            <CartCard item={item} />
          </div>
        ))}
      </div>
    </div>
    <div className="col-lg-4 col-md-5">
      <div className="p-4 border rounded bg-white shadow-sm">
        <CartBill items={cartItem} />
      </div>
    </div>
  </div>
</div>
  );
};

export default Cart;
