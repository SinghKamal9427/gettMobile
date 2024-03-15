import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

export default function JoinExistingAccoutFinal({route}) {

    const {emailAddress} = route.params;


    const redirectToEmailApp = async () => {
      const url = 'mailto:';
      
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Can't open email app");
      }
    };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1  px-4 bg-white">
        <View className="flex-1 gap-y-4 mt-10">
          <View className="justify-start items-start">
            <View className="bg-[#c5deff57] p-4 rounded-[600px] ">
              <Ionicons name="mail" size={34} color="black" />
            </View>
          </View>
          <View className="gap-y-2">
            <Text className="text-[14px] font-bold text-gray-500">
              We sent a link to {emailAddress}
            </Text>
            <Text className="text-gray-800  text-xl font-bold">
              Check your email to activate your business account
            </Text>
          </View>
          <View className=" bg-[#ff9d00] rounded-xl">
            <Pressable
              android_ripple={{ color: "gray", borderless: true }}
              style={({pressed})=>[
                Platform.select({
                  ios:{
                    backgroundColor : pressed ? 'rgba(0,0,0,0.1)' : 'transparent',
                    borderRadius:"12px"
                  }
                }),{
                  width:"100%"
                }
              ]}
              onPress={redirectToEmailApp}
            >
              <Text className="text-[16px] text-center p-4 font-bold  text-white ">
                Open Email app
              </Text>
            </Pressable>
          </View>
          <Text className="text-[14px] font-bold text-gray-500">
            Did'nt receive an email?
          </Text>
        </View>

        <View className="flex-1 justify-start">
          <View className="bg-[#c5deff57] p-4 rounded-xl flex-row items-center ">
            <MaterialCommunityIcons name="alert-box" size={24} color="black" />
            <View className="px-4">
              <Text className="text-[14px] font-bold text-gray-500">
                Still no email?
              </Text>
              <Text className="text-[12px]  text-gray-500">
                You might not be registered yet. Contact your company's account
                manager for help
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-[12px] font-bold text-gray-500 mb-4">
          You'll get an email if there's an existing business account linked to
          this email address
        </Text>
      </View>
    </ScrollView>
  );
}
