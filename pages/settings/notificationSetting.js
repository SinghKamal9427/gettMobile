import { View, Text, Platform, SafeAreaView, Pressable, ScrollView, Switch} from 'react-native'
import React, { useState } from 'react'
import NotificationBottomSheet from '../../components/bottomSheetNotifications';

const ios = Platform.OS === 'ios';

export default function NotificationSetting() {

    const [isEnabledRideNotifications, setIsEnabledRideNotification] = useState(false);
    const [isEnabledNewsNotifications, setIsEnabledNewsNotification] = useState(false);
    const [isEnabledEmailNotifications, setIsEnabledEmailNotification] = useState(false);

    const [currentSwitch , setCurrentSwitch] = useState('');

    const [isNotificationBottomSheetShow , setIsNotificationBottomSheetShow] = useState(false);

    const toggleSwitchRideNotification = () => setIsEnabledRideNotification(previousState => !previousState);
    const toggleSwitchNewsNotification = () => setIsEnabledNewsNotification(previousState => !previousState);
    const toggleSwitchEmailNotification = () => setIsEnabledEmailNotification(previousState => !previousState);


    const handelSetIsNotificationBottomSheetShow = (enabled , fn , current) => {
        if(enabled) {
            setIsNotificationBottomSheetShow(true)
        }else{
            fn()
        }

        if(current){
        setCurrentSwitch(current)
        }
    }
 
    
    const handleConfirm = () => {
        if (currentSwitch === 'ride'){
            toggleSwitchRideNotification()
        }else if (currentSwitch === 'news'){
            toggleSwitchNewsNotification()
        }else if (currentSwitch === 'email'){
            toggleSwitchEmailNotification()
        }
        setIsNotificationBottomSheetShow(false)
      };

      const handleClose = () => {
        setIsNotificationBottomSheetShow(false)
      }
    

  return (
    <View className="flex-1 mt-14">  
    <SafeAreaView className={ios ? "-mb-2" : "mb-2"}>
    <ScrollView className="px-4 ">
        <View className="space-y-6 py-6">
      <View className="space-y-2">
      <Text className="text-[14px] text-gray-500">Ride Updates</Text>
      <View>
            <View className=" p-4 flex-row justify-between items-center bg-white rounded-xl"> 
        <Text className="font-semibold text-[16px]">Push Notifications</Text>
        <Switch
        trackColor={{false: '#767577', true: '#82CAFF'}}
        thumbColor={isEnabledRideNotifications ? '#1569C7' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>handelSetIsNotificationBottomSheetShow(isEnabledRideNotifications , toggleSwitchRideNotification , "ride")}
        value={isEnabledRideNotifications}
      />
      
      </View>
      <Text className="text-[12px] p-2 text-gray-500">Choose how to know when your driver arrives</Text>
      </View>
      </View>
      <View className="space-y-2">
      <Text className="text-[14px] text-gray-500">News and Special offers</Text>
      <View>
      <View className="bg-white rounded-xl">
            <View className="p-4 flex-row justify-between items-center bg-white rounded-xl border-b-[2px] border-gray-200"> 
        <Text className="font-semibold text-[16px]">Push Notifications</Text>
        <Switch
        trackColor={{false: '#767577', true: '#82CAFF'}}
        thumbColor={isEnabledNewsNotifications ? '#1569C7' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>handelSetIsNotificationBottomSheetShow(isEnabledNewsNotifications , toggleSwitchNewsNotification, "news")}
        value={isEnabledNewsNotifications}
      />
      </View>
            <View className="p-4 flex-row justify-between items-center bg-white rounded-xl"> 
        <Text className="font-semibold text-[16px]">Email</Text>
        <Switch
        trackColor={{false: '#767577', true: '#82CAFF'}}
        thumbColor={isEnabledEmailNotifications ? '#1569C7' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>handelSetIsNotificationBottomSheetShow(isEnabledEmailNotifications , toggleSwitchEmailNotification, "email")}
        value={isEnabledEmailNotifications}
      />
      </View>
     
      </View>
      <Text className="text-[12px] p-2 text-gray-500">Get updates on discount and new features</Text>
      </View>
      </View>
      </View>
      </ScrollView>
      </SafeAreaView>
      {isNotificationBottomSheetShow && <NotificationBottomSheet handleClose={handleClose} handleConfirm={handleConfirm}/>}
      </View>
  )
}