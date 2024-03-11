import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import UseStore from "../../components/store/useStore";

export default function JoinExistingAccount({navigation}) {

  const [text, onChangeText] = useState("");
  const [focused, setFocused] = useState(false);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)


  useEffect(()=>{
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     if(emailPattern.test(text)){
      setIsButtonEnabled(true)
     }else{
      if(isButtonEnabled){
      setIsButtonEnabled(false)
      }
      return;
     }
  },[text])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1  px-4 bg-white">
          <View className="flex-1 justify-center">
            <View className="gap-y-2 ">
              <Text className="text-gray-800  text-xl font-bold">
                Enter your work email address
              </Text>
              <Text className="text-[16px]  text-gray-500">
                We'll send an activation link to the email address your company
                uses for Gett account
              </Text>
            </View>
            <View className="pt-4 gap-y-2">
              <Text className="text-[14px] font-bold text-gray-500">
                Work email address
              </Text>
              <TextInput
                onChangeText={onChangeText}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                value={text}
                placeholder="name@address.com"
                keyboardType="default"
                className="p-2 border-2 rounded-lg border-gray-300"
                style={{
                  borderColor: focused ? "gray" : "lightgray", // Change border color based on focus state
                }}
                autoFocus={true}
              />
            </View>
          </View>

          <View className=" justify-end">
            <View className={`${isButtonEnabled ? 'bg-[#ff9d00]' : 'bg-slate-500'} rounded-xl mb-4`}>
              <Pressable
                android_ripple={{ color: "gray", borderless: true }}
                style={{ width: "100%" }}
                onPress={()=>navigation.navigate('joinExistingAccoutFinal' , {emailAddress: text})}
                disabled={!isButtonEnabled}
              >
                <Text className="text-[16px] text-center p-4 font-bold  text-white ">
                  Continue
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
