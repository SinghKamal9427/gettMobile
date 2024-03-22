import { View, Text, SafeAreaView, Platform, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import Map from '../components/map'; 
import BottomSheetModalLib from '../components/bootomSheetModal';
import {PushN} from '../components/pushNotifications/pushN';
import UseStore from '../components/store/useStore';
import { io } from 'socket.io-client';

const ios = Platform.OS === 'ios';



export default function Home({navigation}) {

  const {setSocketIo} = UseStore()

  PushN()
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  useEffect(()=>{
    const socketIo = io('http://192.168.0.176:4000')
    setSocketIo(socketIo)
    
  /*   socketIo.emit('chat message' , "Hello!")
    
    socketIo.on('chat message' , (msg) => {
      console.log('message: ' + msg);})
     */
    return() => {
      socketIo.disconnect();
    }
    },[])

  return (
    <View style={styles.container}>
          <Map/>
      <View className="m-4 absolute top-6 left-2 rounded-[800px] shadow-xl bg-white flex-1 items-center justify-center">
      <Pressable android_ripple={{color:"gray" , borderless:true }} onPress={()=>navigation.toggleDrawer()} style={({pressed})=>[
        Platform.select({
          ios:{
            backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : 'transparent',
            borderRadius:"800px"
          }
        })
      ]}>
        <View  className="p-2 justify-center items-center rounded-[800px]">
      <EvilIcons name="navicon" size={24} color="black"/>
      </View>
      </Pressable>
    </View>
    <BottomSheetModalLib/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})