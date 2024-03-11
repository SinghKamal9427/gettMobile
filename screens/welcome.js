import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'


const {height , width} = Dimensions.get('window')

export default function Welcome() {
  return (
    <View className = "flex-1 justify-center items-center p-10">
      <Image source={require('../assets/images/Gett.png')}  style={{ width: width * 0.62, height: (width * 0.60) * (20 / 59)  }}/>
    </View>
  )
}