import React, { useEffect } from "react";
import "../css/products.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from './Rating'



function Products() {
    const [filterText, setFilterText] = useState("sofa");
    const [items, setItems] = useState<any>([]); 


    useEffect(() => {    
      axios.get(`http://127.0.0.1:8000/api/items/?type=${filterText}`)
        .then(res => {
          setItems(res.data);  
          console.log(res);   
        })
        .catch(error => {
          console.error('There was an error fetching the items!', error);
        });
    }, [filterText]);

    return (
      <div className="Product_container container">
        <p className="product_heading">Popular Items</p>
        <div className="product-heading-section">
          <button onClick={() => setFilterText('sofa')}>Sofa</button>
          <button onClick={() => setFilterText('recliner')}>Recliner</button>
          <button onClick={() => setFilterText('dyning')}>Dyning</button>
          <button onClick={() => setFilterText('bed')}>Bed</button>
          <button onClick={() => setFilterText('office_&_study_table')}>Table</button>      
          <button onClick={() => setFilterText('chair')}>Chair</button>
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
