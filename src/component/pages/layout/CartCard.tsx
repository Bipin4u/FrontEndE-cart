import { Card } from "primereact/card";
import Rating from "./Rating";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useCallback } from "react";

const custom_styles = {
  backgroundColor: "#008374",
  borderColor: "#008374",
  borderRadius: "8px",
};

const CartCard: React.FC<any> = ({ item }) => {
  const { addCartDetails } = useContext(AuthContext);
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const handleQuantityChange = useCallback(
    (action: 'increment' | 'decrement') => {
      if (action === 'increment') {
        setQuantity(prevQuantity => prevQuantity + 1);
        addCartDetails(item.item.id, 'increment');
      } else if (action === 'decrement' && quantity > 1) {
        setQuantity(prevQuantity => prevQuantity - 1);
        addCartDetails(item.item.id, 'decrement');
      }
    },
    [quantity, addCartDetails, item.item.id]
  );

  const handleDelete = () => {
    addCartDetails(item.item.id, 'delete');
  };

  return (
    <div>
      <Card className="w-100 m-2 shadow-sm" style={{ borderRadius: "10px" }}>
        <div className="d-flex">
          <div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "150px",
                height: "150px",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={item.item.first_image}
                alt="Product Image"
                height="150"
                width="150"
                className="img-fluid"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="ms-3 w-100">
            <p className="h5" style={{ fontWeight: "600", fontSize: "1.2rem" }}>
              {item.item.name}
            </p>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between">
                <div className="product_rating_type">
                  <p className="product-title">{item.item.type}</p>
                  <div className="product_rating_container">
                    <Rating
                      rating={item.item.rating}
                      reviews_count={item.item.reviews_count}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="product_price_container">
                  <p className="product-discount_price">
                    {item.item.discount_price.toLocaleString()}
                  </p>
                  <p className="product_price">
                    <s>{item.item.price.toLocaleString()}</s>
                  </p>
                  <p className="product_discount">
                    {item.item.discount.toLocaleString()}% OFF
                  </p>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <ButtonGroup>
                    <Button
                      className="mx-1 text-white"
                      icon="pi pi-minus"
                      style={custom_styles}
                      onClick={() => handleQuantityChange('decrement')}
                      disabled={quantity <= 1}
                    />
                    <Button
                      className="mx-1 text-white"
                      label={quantity.toString()}
                      style={custom_styles}
                    />
                    <Button
                      className="mx-1 text-white"
                      icon="pi pi-plus"
                      style={custom_styles}
                      onClick={() => handleQuantityChange('increment')}
                    />
                  </ButtonGroup>
                </div>
                <Button
                  className="mx-2 rounded-2 text-white"
                  label="Remove"
                  style={{ backgroundColor: "#008374", borderColor: "#008374" }}
                  icon="pi pi-trash"
                  onClick={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CartCard;
