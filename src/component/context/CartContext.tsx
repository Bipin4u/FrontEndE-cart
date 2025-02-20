import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import data from '../../../data.json'

export interface CartContextType {
    cartItem: any,
    cartId:any,
    cartQuantity:number;
    addCartDetails: (item_id: number, type:string) => void; 
  }
  
  const defaultContextValue: CartContextType = {
    cartItem: {},
    cartId:[],
    cartQuantity: 0,
    addCartDetails: (item_id: number, type:string) => {}, 
  };

export const CartContext = createContext<CartContextType>(defaultContextValue);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const [cartItem,setCartItem] = useState([])
  const [cartId,setCartId] = useState([])

  const {authToken} = useContext(AuthContext)

  useEffect(()=>{
    if (authToken) {
        axios
          .get(`${data.url}/api/getcart/`, {
            headers: {
              Authorization: `Token ${authToken}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setCartQuantity(res.data.length);
            setCartItem(res.data)
            setCartId(res.data.map((da:any)=>da.item.id))
          })
          .catch((error) => {
            console.error("There was an error fetching the Cart Quantity Item!", error);

          });
      }
  },[authToken,cartQuantity])

  const addCartDetails = (item_id: number, type:string) => {
    axios
      .post(
        `${data.url}/api/cart/?type=${type}`,
        {
          item: item_id, 
        },
        {
          headers: {
            Authorization: `Token ${authToken}`, 
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setCartQuantity(qty=>qty+1)
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart!", error);
        return 0
      });
  };
  const contextData = {
    addCartDetails,
    cartQuantity,
    cartItem,
    cartId
  };

  return (
    <CartContext.Provider value={contextData}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
