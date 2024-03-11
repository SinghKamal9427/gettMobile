import { View, Text } from 'react-native'
import React from 'react'

export default function CouponCode() {
  return (
    <View className = "flex-1 items-center justify-center space-y-2 px-4 bg-white">
    <Text className="text-gray-800  text-xl font-bold">You don't have coupons</Text>
    <Text className="text-[12px] text-gray-500">Invite friends to earn credit coupon</Text>
  </View>
  )
}