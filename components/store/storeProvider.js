import { createElement, useState } from "react";
import { Context } from "./createContextStore";
import { createToken } from "@stripe/stripe-react-native";
import axios from "axios";
import { Alert, ActivityIndicator } from "react-native";

export default function StoreProvider({ children }) {
  const [statusBottomSheet, setStatusBottomSheet] = useState(false);
  const [countryCode , setCountryCode] = useState("+91")
  const [cardInfo, setCardInfo] = useState();
  const [userAuthenticated , setUserAuthenticated] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loaderCard , setLoaderCard] = useState(false);
  const [isSaveEnable , setIsSaveEnable] = useState(false);
  const [socketIo , setSocketIo] = useState()

  const handleCardToken = async () => {
    if(!cardInfo){
      Alert.alert('Try again', 'Please enter correct card info', [
        {text: 'OK'},
      ]);
    }
    if (cardInfo) {
      setLoaderCard(true);
      try {
        const resToken = await createToken({ ...cardInfo, type: "Card" });
        const tokenId = resToken.token.id;

        if(tokenId){
        await axios.post("https://gett-clone.onrender.com/createCustomer",
        {
          tokenId: tokenId  // Pass tokenId as part of the request body
        }).then((response) => {
          setLoaderCard(false);
          Alert.alert('Congrats', 'Your card safe successfully', [
            {text: 'OK'},
          ]);
           /*  console.log("Data:", response.data); */
          }).catch((error) => {
            setLoaderCard(false);
            Alert.alert('warning!', 'Please re-check card information', [
              {text: 'OK'},
            ]);/* 
            console.error("Error:", error); */
          });
        }
      } catch (err) {
        setLoaderCard(false);
        Alert.alert('oops!', 'Error creating card', [
          {text: 'OK'},
        ]);
      }
    }
  };

  const contextValue = {
    statusBottomSheet,
    setStatusBottomSheet,
    setCardInfo,
    handleCardToken,
    countryCode,
    setCountryCode,
    userAuthenticated,
    setUserAuthenticated,
    phoneNumber,
    setPhoneNumber,
    loaderCard,
    setLoaderCard,
    isSaveEnable,
    setIsSaveEnable,
    socketIo,
    setSocketIo
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
