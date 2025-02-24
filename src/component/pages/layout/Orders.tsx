import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import data from '../../../../data.json'
import Loader from "./Loader";

const Orders: React.FC = () => {
  const { authToken } = useContext(AuthContext);
  const [item, setItem] = useState<any>();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const handleNavigate = (name:string,img:string,id:number) => {
    navigate('/reviewrating', {
      state: {
        title: name,
        image: img,
        id:id
      },
    });
  };

  useEffect(() => {
    if (authToken) {
      axios
        .get(`${data.url}/api/orders/`, {
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setLoading(false)
          setItem(res.data);
          console.log('orders',res.data)
        })
        .catch((error) => {
          setLoading(false)
          console.error("There was an error fetching the Order Item!", error);
        });
    }
  }, [authToken]);

  if(!authToken || !item){
    return (
        <Loader />
    )
  }


  return (
    <div className="container" style={{ minHeight: "85vh" }}>
  <h2 className="m-2">My Orders</h2>
  {item.map((order: any, index: number) => (
    <div
      key={index}
      className="p-3 w-100 m-1 shadow-sm d-flex justify-content-between align-items-center"
      style={{ borderRadius: "10px" }}
    >
      <div className="d-flex align-items-center w-50">
        <Link
          to={`/item/${order.item.id}`}
          style={{ textDecoration: "none", color: "black", flex: 1 }}
        >
          <div className="d-flex">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "100px",
                height: "100px",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={order.item.first_image}
                alt="Product Image"
                height="100"
                width="100"
                className="img-fluid"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="m-2 p-2 w-50">
              <p
                className="h5"
                style={{ fontWeight: "600", fontSize: "1.2rem" }}
              >
                {order.item.name}
              </p>
              <p className="text-muted">{order.item.type}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="text-end">
        <div>₹{order.item.price.toLocaleString()}</div>
      </div>
      <div className="d-block text-end ">
        <div>Delivered on Jul 2024</div>
        <Button onClick={()=>handleNavigate(order.item.name,order.item.first_image,order.item.id)} label=" Rate & Review" className="p-button-link pi pi-star" />
      </div>
    </div>
  ))}
</div>

  );
};

export default Orders;
