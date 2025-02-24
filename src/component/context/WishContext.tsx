import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import data from '../../../data.json'

interface WishType {
    id: number,
    user: number,
    item: {
        id: number,
        name: string,
        type: string,
        rating: number,
        price: string,
        reviews_count: number,
        discount: string,
        first_image: string,
        discount_price: number
    }
}

export interface WishContextType {
  WishItem: any;
  wishId:any,
  handleWishList: (item_id: number) => void;
}

const defaultContextValue: WishContextType = {
  WishItem: {},
  wishId:[],
  handleWishList: () => {},
};

export const WishContext = createContext<WishContextType>(defaultContextValue);

const WishProvider = ({ children }: { children: React.ReactNode }) => {
  const [WishItem, setWishItem] = useState<Array<WishType>>([]);
  const [count, setcount] = useState<number>(0);
  const [wishId, setWishId] = useState<Array<number>>([]);


  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (authToken) {
      axios
        .get(`${data.url}/api/wish-list/`, {
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setWishItem(res.data);
          setWishId(res.data.map((da: any) => da.item.id));
          console.log(res.data)
          console.log(res.data)
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
        `${data.url}/api/wish-list/`,
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
      .then(() => {
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
