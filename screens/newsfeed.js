import { View, Text } from 'react-native'
import React from 'react'

export default function Newsfeed() {
  return (
    <View className = "flex-1 items-center space-y-2 pt-4 bg-white">
      <Text className="text-gray-800  text-xl font-bold">You're all caught up</Text>
      <Text className="text-[12px] text-gray-500">Good for you!</Text>
    </View>
  )
}