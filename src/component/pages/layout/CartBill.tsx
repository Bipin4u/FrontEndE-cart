import React, { useEffect, useState } from 'react';

import { Button } from 'primereact/button';
        

interface Item {
  item: {
    price: number;
    discount_price: number;
    
  };
  quantity : number
}

interface BillProp {
  items: Item[];
}

const CartBill: React.FC<BillProp> = ({ items }) => {
  const [originalPrice, setOriginalPrice] = useState(0);
  const [actualPrice, setActualPrice] = useState(0);

  useEffect(() => {
    let original_price : number = 0;
    let actual_price : number = 0;
    items.forEach((item) => {
      console.log(item.quantity)

      original_price += Number(item.item.price)*item.quantity ;
      actual_price += item.item.discount_price*item.quantity;
    });

    setOriginalPrice(original_price);
    setActualPrice(actual_price);
  }, [items]); 

  return (
    <div>
      <div className="p-3 border rounded w-100 m-auto">
        <h4 className="text-center mb-3">PRICE DETAILS</h4>
        <hr />
        <div className="d-flex justify-content-between mb-2">
          <div>Price ({items.length} items)</div>
          <div className="text-muted">₹{actualPrice}</div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <div>Discount</div>
          <div className="text-success">-₹{originalPrice - actualPrice}</div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <div>Delivery Charges</div>
          <div className="text-danger">₹50</div>
        </div>
        <hr />
        <div className="d-flex justify-content-between font-weight-bold">
          <div>Total Amount</div>
          <div>₹{actualPrice + 50}</div>
        </div>
        <hr />
        <div className="text-success text-center mt-2">
          You will save ₹{originalPrice - actualPrice} on this order!
        </div>
        <div className="m-2 card flex justify-content-center">
            <Button style={{backgroundColor:'#008374'}} label="Place Order" />
        </div>
      </div>
    </div>
  );
};

export default CartBill;
