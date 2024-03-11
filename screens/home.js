import { View, Text, SafeAreaView, Platform, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
/* import Map from '../components/map';  */

const ios = Platform.OS === 'ios';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
         {/* <Map/>  */}
      <View className="m-4 absolute top-6 left-2 rounded-[800px] shadow-xl bg-white flex-1 items-center justify-center">
      <Pressable android_ripple={{color:"gray" , borderless:true }} onPress={()=>navigation.toggleDrawer()} style={{}}>
        <View  className="p-2 justify-center items-center rounded-[800px]">
      <EvilIcons name="navicon" size={24} color="black"/>
      </View>
      </Pressable>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})