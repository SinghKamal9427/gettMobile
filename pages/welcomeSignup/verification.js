import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Pressable,
  Dimensions,
  Vibration,
  Animated 
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import UseStore from "../../components/store/useStore";




const {width , height} = Dimensions.get('window')

export default function Verification({navigation , route}) {

    const {phoneNumber} = route.params;
    
    const { setUserAuthenticated} = UseStore()
  const [otpInput, setOtpInput] = useState({ otp: "" });
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [fieldError , setFieldError] = useState(false);

  //Not Used
 const vibrationAnimation = useRef(new Animated.Value(0)).current;

  const inputRefs = Array(6).fill(0).map((_, i) => useRef(null));

      useEffect(()=> {
        inputRefs[0].current.focus();
    },[])

  const handleInputChange = (text, index) => {
    if (text.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
      setOtpInput((prev) => ({
        ...prev,
        otp: prev.otp.substring(0, index) + text + prev.otp.substring(index + 1),
      }));
    } 
  
    if(index === 5) {
        setOtpInput((prev) => ({
            ...prev,
            otp: prev.otp.substring(0, index) + text + prev.otp.substring(index + 1),
          }));
    }
  };

  const handleKeyPress = (event , index) => {
    const currentValue = otpInput.otp[index];

    if(event.nativeEvent.key === 'Backspace'){
        if(currentValue === "_" && index > 0){
        inputRefs[index - 1].current.focus();
        }else{
            setOtpInput((prev) => ({...prev, otp: prev.otp.substring(0, index)  +"_"+  prev.otp.substring(index + 1),
      }));
        }
    }
  }


  useEffect(()=>{
  if (otpInput.otp.length === 6) {
    if(otpInput.otp === "123456"){
       SecureStore.setItemAsync("Authenticate" , phoneNumber.phoneNumber)
       setUserAuthenticated(true)
       setFieldError(false)
    }else{
      setFieldError(true)
    }
  }
},[otpInput])


//Not Used
useEffect(() => {
  if (fieldError && otpInput.otp.length === 6 && !otpInput.otp.match("_")) {
    // Start the vibration animation
    Animated.sequence([
      Animated.timing(vibrationAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(vibrationAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
    // Vibrate the device
    Vibration.vibrate();
  }
}, [otpInput]);


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 , backgroundColor:"white" }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-4 ">
          <View className="flex-1 justify-center space-y-4">
            <View>
              <Text className="text-gray-800  text-xl font-bold">
                Enter the Code sent to
              </Text>
              <Text className="text-gray-800  text-xl font-bold">
                {phoneNumber.countryCode} {phoneNumber.phoneNumber}
              </Text>
              </View>
               <View>
              <Animated.View className="flex-row">
                {[...Array(6).keys()].map((index) => (
                  <TextInput
                    key={index}
                    ref={inputRefs[index]}
                    cursorColor="#6495ed"
                    style={{
                      borderWidth: 1,
                      width: width/9,
                      height: width/9,
                      margin: 5,
                      textAlign: "center",
                      borderColor: fieldError ? "red" /* vibrationAnimation.interpolate({ inputRange: [0, 1],outputRange: ['red', 'transparent'] })  */: focusedIndex === index ? 'blue' : 'gray',
                      fontWeight: "bold",
                      borderRadius: 10,
                    }}
                    onFocus={() => setFocusedIndex(index)}
                    keyboardType="numeric"
                    maxLength={1}
                    onChangeText={(text) => handleInputChange(text, index)}
                    onKeyPress={(event)=>handleKeyPress(event , index)}
                  />
                ))}
              </Animated.View>

              <Text className="text-[14px] text-gray-500 px-2">
                Didn't receive a code?
              </Text>
              </View>
            
          </View>
          <View className=" justify-end mb-4">
          <View className="bg-[#ffffff] border-2 border-gray-200   rounded-xl">
            <Pressable android_ripple={{ color: "gray", borderless: true }} style={{width:"100%"}} >
            <View className="flex-row justify-center items-center space-x-2 p-4 ">
            <Ionicons name="call" size={20} color="black" />
              <Text className="text-[16px] text-center font-bold text-black">
                Get code by phone
              </Text>
              </View>
            </Pressable>
          </View>
            </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
