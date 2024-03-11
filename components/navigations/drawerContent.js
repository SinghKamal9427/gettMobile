import { View, Text, TouchableOpacity, Platform, TouchableNativeFeedback, TouchableHighlight, Dimensions, ScrollView } from 'react-native'
import { Entypo} from '@expo/vector-icons';
import { iconData } from '../constants/drawerFeed';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

let deviceCategory;

if (screenHeight < 480) {
  deviceCategory = 'small';
} else if (screenHeight < 800) {
  deviceCategory = 'medium';
} else {
  deviceCategory = 'large';
}


export default function DrawerContent({navigation}) {

  const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <ScrollView className="flex-1">
    <View className = "flex-1 justify-center bg-white ">
   {/*  <TouchableOpacity className="flex items-end m-6" onPress={()=>navigation.closeDrawer()}>
     <Text className = "text-black text-xl">CloseIcon</Text>
     </TouchableOpacity> */}
     <View  className='pt-10'>
     <TouchableComponent  background={TouchableNativeFeedback.Ripple('#a5a4a442', false)} onPress={()=>navigation.navigate('accountDetails')}>
      <View  className=" gap-4 py-4 items-center justify-end">
      <View className="p-4 border border-[#a5a4a417] rounded-[600px]"><Entypo name="camera" size={20} color="black" /></View>
      <View>
   <Text className = "text-black text-xl text-center font-extrabold">Hey There!</Text>
   <Text className = "text-gray-500 text-[12px] text-center ">Enter your email and get ride receipts.</Text>
   </View>
   </View>
   </TouchableComponent>
   </View>
     <View className={`items-start justify-start px-4 border-y-2 border-[#a5a4a417]`}>
    
    {iconData.map(({ icon, name, component: IconComponent }, index)=>
     <View className="w-full" key={index}>
     <TouchableComponent  background={TouchableNativeFeedback.Ripple('#a5a4a442', false)} onPress = {()=>navigation.navigate(icon)}>
     <View className={`flex-row items-center justify-start  py-4 gap-x-4`}>
      <IconComponent name={icon} size={20} color="black" />
      <Text className = "text-gray-600 text-[16px] text-center ">{name}</Text>
      </View>
      </TouchableComponent>
      </View>
      )}
   </View>
     <TouchableComponent  background={TouchableNativeFeedback.Ripple('#a5a4a442', false)}>
     <View className="items-start justify-start w-full">
   <Text className = "text-gray-600 text-[16px] p-4">Legal</Text>
   </View></TouchableComponent>
 </View>
 </ScrollView>
  )
}