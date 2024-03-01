import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { businessAccountItems } from "../components/constants/drawerFeed";

export default function BusinessAccount({navigation}) {
  return (
    <View className="flex-1 mt-20">
        <ScrollView>
      <View className="bg-[#c5deff57] m-4 rounded-xl">
        <View className="p-6 gap-y-2">
          <Text className="text-gray-800 text-xl font-bold">
            Register your company to Gett Business, for free!
          </Text>
          {businessAccountItems.map((item, index) => (
            <View className="flex-row items-center py-2" key={index}>
              <Feather name="check" size={24} color="black" />
              <Text className="text-[16px] px-4 text-gray-700">
                {item.title}
              </Text>
            </View>
          ))}

          <View className="bg-[#ff9d00] rounded-xl">
            <Pressable android_ripple={{ color: "gray", borderless: true }} style={{width:"100%"}} onPress={()=>navigation.navigate('signup')}>
              <Text className="text-[16px] text-center p-4 font-bold  text-white ">
                Register a company
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="bg-[#c5deff57] m-4 rounded-xl">
        <View className="p-6 gap-y-4">
          <Text className="text-gray-800 text-xl font-bold pr-10">
            Company already registerd?
          </Text>
          <View className="bg-[#ffffff] rounded-xl">
            <Pressable android_ripple={{ color: "gray", borderless: true }}  style={{width:"100%"}} onPress={()=>navigation.navigate('joinExistingAccount')}>
              <Text className="text-[16px] p-4 text-center font-bold text-black">
                Join existing account
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      </ScrollView>

    </View>
  );
}