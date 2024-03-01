import { createElement, useState } from "react";
import { Context } from "./createContextStore";
import { createToken } from "@stripe/stripe-react-native";
import axios from "axios";

export default function StoreProvider({ children }) {
  const [statusBottomSheet, setStatusBottomSheet] = useState(false);

  const [cardInfo, setCardInfo] = useState();

  const handleCardToken = async () => {
    if (cardInfo) {
      try {
        const resToken = await createToken({ ...cardInfo, type: "Card" });
        const tokenId = resToken.token.id;

        console.log(tokenId)
        if(tokenId){
        await axios.post("http://192.168.0.171:4000/createCustomer",
        {
          tokenId: tokenId  // Pass tokenId as part of the request body
        }).then((response) => {
            console.log("Data:", response.data);
          }).catch((error) => {
            console.error("Error:", error);
          });
        }
      } catch (err) {
        alert("Error creating card: " + err.message);
      }
    }
  };

  const contextValue = {
    statusBottomSheet,
    setStatusBottomSheet,
    setCardInfo,
    handleCardToken,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
