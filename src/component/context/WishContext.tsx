import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export interface WishContextType {
  WishItem: any;
  wishId:any,
  handleWishList: (item_id: number) => void;
}

const defaultContextValue: WishContextType = {
  WishItem: {},
  wishId:[],
  handleWishList: (item_id: number) => {},
};

export const WishContext = createContext<WishContextType>(defaultContextValue);

const WishProvider = ({ children }: { children: React.ReactNode }) => {
  const [WishItem, setWishItem] = useState([]);
  const [count, setcount] = useState(0);
  const [wishId, setWishId] = useState([]);


  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (authToken) {
      axios
        .get("http://127.0.0.1:8000/api/wish-list/", {
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setWishItem(res.data);
          setWishId(res.data.map((da: any) => da.item.id));
          console.log(wishId)
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the Cart Quantity Item!",
            error
          );
        });
    }
  }, [authToken,count]);

  const handleWishList = (item_id: number) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/wish-list/",
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
        setcount(prev=>prev+1)
      })
      .catch((error) => {
        console.error("There was an error adding the WishListt!", error);
      });
  };



  const contextData = {
    WishItem,
    handleWishList,
    wishId,
  };

  return (
    <WishContext.Provider value={contextData}>{children}</WishContext.Provider>
  );
};

export default WishProvider;
