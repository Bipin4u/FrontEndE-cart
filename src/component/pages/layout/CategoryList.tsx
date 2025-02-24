import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Rating from "./Rating";
import Paginater from "./Paginater";
import Filter from "./Filter";
import data from '../../../../data.json'
import Loader from "./Loader";

function Products() {
  const { category } = useParams();
  const [items, setItems] = useState<any>([]);
  const [sort, setsort] = useState<string>("");
  const [pagenumber, setpagenumber] = useState<number>(1);
  const [totalRecords, settotalRecords] = useState<number>(15);
  const [loading,setLoading] = useState<boolean>(true)

  console.log(sort);
  console.log(pagenumber);

  useEffect(() => {
    axios
      .get(
        `${data.url}/api/category/${category}/?page=${pagenumber}&sort=${sort}`
      )
      .then((res) => {
        setItems(res.data.items);
        settotalRecords(res.data.total_items);
        console.log(res);
        setLoading(false)
      })
      .catch((error) => {
        console.error("There was an error fetching the items!", error);
      });
  }, [sort, pagenumber]);

  if (loading) 
    return (
      <Loader />
    );
  

  return (
    <div className="Product_container container">
      <div>
        <Filter setsort={setsort} />
      </div>
      <div className="Product_item_display">
        {items.map((item: any, index: number) => (
          <Link className="product_link" to={`/item/${item.id}`} key={index}>
            <div className="product-card">
              <div className="product-image-section">
                <img
                  className="product-image"
                  src={item.first_image}
                  alt={item.title}
                />
              </div>
              <div className="product-info">
                <p className="product-name">{item.name}</p>
                <div className="product-price-type">
                  <div className="product_rating_type">
                    <p className="product-title">{item.type}</p>
                    <div className="product_rating_container">
                      <Rating
                        rating={item.rating}
                        reviews_count={item.reviews_count}
                      />
                    </div>
                  </div>
                  <div className="product_price_container">
                    <p className="product-discount_price">
                      {item.discount_price.toLocaleString()}
                    </p>
                    <p className="product_price">
                      <s>{item.price.toLocaleString()}</s>
                    </p>
                    <p className="product_discount">
                      {item.discount.toLocaleString()}% OFF
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mb-3">
        <Paginater pageNumber={setpagenumber} totalRecords={totalRecords} />
      </div>
    </div>
  );
}

export default Products;
