import { View, Text, Platform, SafeAreaView, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome ,Entypo   } from '@expo/vector-icons';
import { languages } from '../components/constants/settings';

const ios =  Platform.OS === 'ios';

export default function Settings({navigation}) {

    const [SelectedLanguage , setSelectedLanguage] = useState('english');

    const handleChooseLanguage = (lang) => {
        setSelectedLanguage(lang)
    }

  return (
    <View className="flex-1 mt-14">  
    <SafeAreaView className={ios ? "-mb-2" : "mb-2"}>
    <ScrollView className="px-4 ">
        <View className="space-y-6 py-6">
        <View className="space-y-2">
      <Text className="text-[14px] text-gray-500">Display Language</Text>
      <View className="bg-white rounded-xl">
     
        {languages.map((val , i)=> (
             <View className={`border-b-[2px] border-gray-200 ${i === 2 && "rounded-b-xl border-0"} ${i === 0 && "rounded-t-xl" }`} key={i}>
        <Pressable android_ripple={{ color: "gray", borderless: true }} style={{width:"100%"}} onPress={()=>handleChooseLanguage(val.lang)}>
            <View className="p-4 flex-row justify-between"> 
        <Text className={`${SelectedLanguage === val.lang ? 'font-bold' : 'font-semibold'} text-[16px]`}>{val.name}</Text>
       {SelectedLanguage === val.lang && <FontAwesome name="check" size={20} color="#3090C7" />}
        </View>
        </Pressable>
        </View>   ))}
   
      </View>
      </View>

      <View className="space-y-2">
      <Text className="text-[14px] text-gray-500">Show Addresses in</Text>
      <View className="bg-white rounded-xl">
        <Pressable android_ripple={{ color: "gray", borderless: true }} style={{width:"100%"}}>
            <View className="p-4 flex-row justify-between"> 
        <Text className="font-bold text-[16px] ">English</Text>
   <FontAwesome name="check" size={20} color="#3090C7" />
        </View>
        </Pressable>
      </View>
      </View>

      <View className="space-y-2">
      <Text className="text-[14px] text-gray-500">Notification</Text>
      <View className="bg-white rounded-xl">
        <Pressable android_ripple={{ color: "gray", borderless: true }} style={{width:"100%"}} onPress={()=>navigation.navigate('notificationSetting')}>
            <View className="p-4 flex-row justify-between"> 
        <Text className="font-semibold text-[16px]">Notification Settings</Text>
        <Entypo name="chevron-right" size={20} color="black" />
        </View>
        </Pressable>
      </View>
      </View>

      <View className="space-y-2">
      <Text className="text-[14px] text-gray-500">Software Licenses</Text>
      <View className="bg-white rounded-xl">
        <Pressable android_ripple={{ color: "gray", borderless: true }} style={{width:"100%"}}>
            <View className="p-4 flex-row justify-between"> 
        <Text className="font-semibold text-[16px] ">Software Licenses</Text>
        <Entypo name="chevron-right" size={20} color="black" />
        </View>
        </Pressable>
      </View>
      </View>

      <View className="space-y-2">
      <Text className="text-[14px] text-gray-500">Version</Text>
      <View className="bg-white rounded-xl p-4">
        <Text className="font-semibold text-[16px] ">10.29.120</Text>
        </View>
      </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  )
}