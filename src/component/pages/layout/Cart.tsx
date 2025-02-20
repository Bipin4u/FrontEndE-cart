import { useContext } from "react";
import CartCard from "./CartCard";
import CartBill from "./CartBill";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cartItem } = useContext(CartContext);

  // If cartItem is null or undefined, show a loading message
  if (!cartItem) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  // If cartItem is an empty array, show "Your Cart is Empty"
  if (cartItem.length < 1) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <h1 className="text-center">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="container my-4" style={{ minHeight: "75vh" }}>
      <h2 className="text-center mb-4">Your Cart</h2>
      <div className="row">
        {/* Cart items section */}
        <div className="col-lg-8 col-md-7 mb-3">
          <div className="p-3 border rounded bg-light">
            {cartItem.map((item:any) => (
              <div key={item.id} className="mb-3 border-bottom pb-2">
                <CartCard item={item} />
              </div>
            ))}
          </div>
        </div>
        {/* Cart bill section */}
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