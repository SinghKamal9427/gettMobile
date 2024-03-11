import { View, Text, TextInput, Dimensions, TouchableOpacity, Pressable, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import UseStore from '../components/store/useStore'

const {width} = Dimensions.get('window');

export default function WelcomeSignup({navigation}) {

    const {countryCode} = UseStore();
    
    const [input , setInput] = useState({
        countryCode : countryCode,
        phoneNumber : ""
    });
    const [isButtonVisible, setisButtonVisible] = useState(false)

    useEffect(()=> {
        setInput((prev) => ({...prev , countryCode: countryCode}))
    },[countryCode]);


    const handleChange =(text)=> {
        setInput((prev) => ({...prev , phoneNumber: text}))

        if(input.phoneNumber.length === 10){
          setisButtonVisible(true)
        }else{
          setisButtonVisible(false)
        }
    };


  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : null}
  >
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View className = "flex-1 px-4 bg-white">
        <View className = "flex-1 justify-center space-y-6">
      <Text className="text-gray-800  text-xl font-bold">Enter Your Mobile Number</Text>
      <View className = "border-2 border-blue-500 p-1 flex-row justify-start items-center space-x-2 rounded-lg">
        <TouchableOpacity className = "bg-gray-200 p-2 rounded-md " onPress={()=>navigation.navigate('countryCode')}>
            <Text>{countryCode}</Text>
        </TouchableOpacity>
      <TextInput style={{width:width/1.6}}   maxLength={20} inputMode='numeric'  autoFocus={true} cursorColor="#6495ed" onChangeText={handleChange}/>
      </View>
      </View>


      <View className=" justify-end space-y-2">
      
      <Text className="text-[12px] text-gray-500">By Continuing, confirm i have read the <Text className=" text-[#ff9d00]">Privacy Policy</Text> and agree to the <Text className="text-[#ff9d00]">Terms & Conditions</Text> of Gett in the country where i use the service.</Text>
            <View className={`${isButtonVisible ? "bg-[#ff9d00]" : "bg-gray-500"} rounded-xl mb-4`}>
              <Pressable
                android_ripple={{ color: "gray", borderless: true }}
                style={{ width: "100%" }}
                onPress={()=>navigation.navigate('verification' , {phoneNumber : input})}
                disabled={!isButtonVisible}
              >
                <Text className="text-[16px] text-center p-4 font-bold  text-white ">
                  Accept and Continue
                </Text>
              </Pressable>
            </View>
          </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}