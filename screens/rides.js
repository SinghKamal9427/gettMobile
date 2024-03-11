import { View, Text } from 'react-native'
import React from 'react'

export default function Rides() {
  return (
    <View className = "flex-1 items-center justify-center space-y-2 px-4 bg-white">
      <Text className="text-gray-800  text-xl font-bold">No recent orders</Text>
      <Text className="text-[12px] text-gray-500">Details of your recent rides and deleveries will appear here</Text>
    </View>
  )
}