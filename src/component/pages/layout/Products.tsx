import "../css/products.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Rating from './Rating'

interface  productCategory {
  title:string,
  items:any,
  filter:React.Dispatch<React.SetStateAction<string>>
}
const Products:React.FC<productCategory>=({title,items,filter})=> {
    return (
      <div className="Product_container container">
        <p className="product_heading">{title}</p>
        <div className="product-heading-section">
          <button onClick={() => filter('sofa')}>Sofa</button>
          <button onClick={() => filter('recliner')}>Recliner</button>
          <button onClick={() => filter('dining')}>Dyning</button>
          <button onClick={() => filter('bed')}>Bed</button>
          <button onClick={() => filter('office_study_table')}>Table</button>      
          <button onClick={() => filter('chair')}>Chair</button>
        </div>
        <div className="Product_item_display">

        {items
       .map((item : any, index : number) => (
          <Link className="product_link" to={`/item/${item.id}`} key={index}>
            <div className="product-card">
              <div className="product-image-section">
                <img className="product-image" src={item.first_image} alt={item.title} />
              </div>
              <div className="product-info">
                <p className="product-name">{item.name}</p>
                <div className="product-price-type">
                  <div className="product_rating_type">
                    <p className="product-title">{item.type}</p>
                    <div className="product_rating_container"><Rating rating={item.rating} reviews_count={item.reviews_count}/></div>
                  </div>
                    <div className="product_price_container">
                    <p className="product-discount_price">{item.discount_price.toLocaleString()}</p>
                  <p className="product_price"><s>{item.price.toLocaleString()}</s></p>
                  <p className="product_discount">{item.discount.toLocaleString()}% OFF</p>
                    </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        </div>
      </div>
    );
  }
  
  export default Products;
