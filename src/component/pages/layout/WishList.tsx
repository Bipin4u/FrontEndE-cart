import Rating from "./Rating";
import { Image } from "primereact/image";
import { useContext } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { WishContext } from "../../context/WishContext";

const WishList: React.FC = () => {
  const {WishItem, handleWishList} = useContext(WishContext)



  if(WishItem.length < 1 ){
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <h1 className="text-center">Your Wish List is Empty</h1>
      </div>    
    )
  }
  if(!WishList ){
    return (
      <div>wait</div>
    )
  }

  const handleRemoveWish = (id:number) => {
    handleWishList(id)
  }

  return (
    <div className="container " style={{minHeight:"80vh"}}>
  <h2 className="m-2">Wish List</h2>
  {WishItem.map((item: any, index: number) => (
    <div
      key={index}
      className="p-3 w-100 m-1 shadow-sm p-0"
      style={{ borderRadius: "10px" }}
    >
      <div className="d-flex">
        <Link to={`/item/${item.item.id}`} style={{ textDecoration: "none", color: "black", flex: 1 }}>
          <div className="d-flex">
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
            <div className="m-2 p-2 w-100">
              <p
                className="h5"
                style={{ fontWeight: "600", fontSize: "1.2rem" }}
              >
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
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Button
          className="mx-2 rounded-2 text-white "
          label="Remove"
          style={{
            height:"40px",
            backgroundColor: "#008374",
            borderColor: "#008374",
          }}
          icon="pi pi-trash"
          onClick={() => handleRemoveWish(item.item.id)}
        />
      </div>
    </div>
  ))}
</div>

  );
};

export default WishList;
