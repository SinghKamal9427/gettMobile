import { View, Text, SafeAreaView, Platform, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';

const ios = Platform.OS === 'ios';

export default function Home({navigation}) {
  return (
    <SafeAreaView className = {ios ? "-mb-2" : "mb-2"}>
    <View className="m-4 relative">
      <View className="absolute top-6 left-2 rounded-[800px] shadow-xl bg-white flex-1 items-center justify-center">
      <Pressable android_ripple={{color:"gray" , borderless:true }} onPress={()=>navigation.toggleDrawer()}>
        <View  className=" p-3">
      <EvilIcons name="navicon" size={18} color="black"/>
      </View>
      </Pressable>
      </View>
    </View>
    </SafeAreaView>
  )
}