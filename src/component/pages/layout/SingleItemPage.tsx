import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/singleItemPage.css";
import Rating from "./Rating";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { CartContext } from "../../context/CartContext";
import { WishContext } from "../../context/WishContext";
import Review from "./Review";
import data from '../../../../data.json'

const SingleItemPage = () => {
  const { addCartDetails, cartId } = useContext(CartContext);
  const { id } = useParams();
  const [item, setItem] = useState<any>();

  const [loading, setLoading] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState("features"); // New state to track selected feature
  const [mainImage, setMainImage] = useState("");
  const toast = useRef<Toast>(null);
  const { handleWishList, wishId } = useContext(WishContext);
  const navigate = useNavigate()

  const renderFeatureContent = (type: string) => {
    switch (type) {
      case "features":
        return (
          <div>
            <ul>
              {item.features.map((feature: any, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        );

      case "dimensions":
        return (
          <div>
            <p>
              <strong></strong> {item.dimensions}
            </p>
          </div>
        );

      case "warranty":
        return (
          <div>
            <p>
              <strong></strong> {item.warranty}
            </p>
          </div>
        );

      case "package":
        return (
          <div>
            <p>
              <strong></strong> {item.package_details}
            </p>
          </div>
        );

      case "material":
        return (
          <div>
            <p>
              <strong></strong> {item.material}
            </p>
          </div>
        );

      default:
        return <div>No content available for this selection.</div>;
    }
  };

  const handleWish = (item_id: number) => {
    handleWishList(item_id);
  };

  useEffect(() => {
    axios
      .get(`${data.url}/api/item/${id}/`)
      .then((res) => {
        setItem(res.data);
        setMainImage(res.data.images[0].image_path);
        setLoading(false);
        {
          console.log(wishId.includes(res.data.id));
        }
        console.log(res.data.id);
        console.log(wishId);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
      });
  }, [id]);





  const addCartDetail = async (item: number) => {
    const type = "increment";
    addCartDetails(item, type);
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Item added to cart",
      life: 1000,
    });
  };
  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <div className="item-detail">
      <Toast ref={toast} />
      <div className="item-images">
        <div className="item-thumbnails">
          {item.images.map((img: any, index: number) => (
            <img
              className="item-thumbnail"
              onClick={() => {
                setMainImage(img.image_path);
              }}
              key={index}
              src={img.image_path}
              alt={item.name}
            />
          ))}
        </div>

        <div className="item_main_image" style={{ position: "relative" }}>
          <i
            onClick={() => handleWish(item.id)}
            className={
              wishId.includes(item.id) ? "pi pi-heart-fill secondary" : "pi pi-heart secondary"
            }
            style={{
              fontSize: "2.5rem",
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          ></i>
          <img
            src={mainImage}
            alt={item.name}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div>
        <h2>{item.name}</h2>
        <h2 className="item_type">{item.type}</h2>
        <div className="item_add_flex">
          <p> Price :</p>
          <p className="item-discount_price product-discount_price">
            {" "}
            {item.discount_price?.toLocaleString()}{" "}
          </p>
          <p className="item_price product_price">
            {" "}
            <s>{item.price?.toLocaleString()}</s>{" "}
          </p>
          <p className="item_discount product_discount">
            {item.discount?.toLocaleString()}% OFF
          </p>
        </div>
        <p className="item-description">{item.description}</p>
        <Rating rating={item.rating} reviews_count={item.reviews_count} />
        <div className="m-2 card flex justify-content-center">
          {cartId.includes(item.id) ? (
            <Button
              onClick={() => navigate('/cart')}
              style={{ backgroundColor: "#008374" }}
              label="Go to Cart"
            />
          ) : (
            <Button
              onClick={() => addCartDetail(item.id)}
              style={{ backgroundColor: "#008374" }}
              label="Add to Cart"
            />
          )}{" "}
        </div>
      </div>
      <div>
        <div className="item_other_features">
          <div
            onClick={() => setSelectedFeature("features")}
            className={selectedFeature === "features" ? "active" : ""}
          >
            Features
          </div>
          <div
            onClick={() => setSelectedFeature("dimensions")}
            className={selectedFeature === "dimensions" ? "active" : ""}
          >
            Dimension
          </div>
          <div
            onClick={() => setSelectedFeature("warranty")}
            className={selectedFeature === "warranty" ? "active" : ""}
          >
            {" "}
            Warranty{" "}
          </div>
          <div
            onClick={() => setSelectedFeature("package")}
            className={selectedFeature === "package" ? "active" : ""}
          >
            {" "}
            Package Details{" "}
          </div>
          <div
            onClick={() => setSelectedFeature("material")}
            className={selectedFeature === "material" ? "active" : ""}
          >
            {" "}
            Material{" "}
          </div>
        </div>
        <div className="item-feature-content">
          {renderFeatureContent(selectedFeature)}
        </div>
      </div>
      <div>
          <Review id={id} />
      </div>
    </div>
  );
};
export default SingleItemPage;
