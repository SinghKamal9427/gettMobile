import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/home';
import BusinessAccount from '../../screens/businessAccount';
import SignupWebComponent from '../../pages/businessAccount/signupWebview';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import UseStore from '../store/useStore';
import JoinExistingAccount from '../../pages/businessAccount/joinExistingAccount';
import JoinExistingAccoutFinal from '../../pages/businessAccount/joinExistingAccoutFinal';
import CardIndex from '../../pages/adddebit/cardIndex';
import Welcome from '../../screens/welcome';
import WelcomeSignup from '../../screens/welcomeSignup';
import CountryCode from '../../pages/welcomeSignup/countryCode';
import Verification from '../../pages/welcomeSignup/verification';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import Newsfeed from '../../screens/newsfeed';
import Rides from '../../screens/rides';
import CouponCode from '../../screens/couponCode';
import Settings from '../../screens/settings';
import NotificationSetting from '../../pages/settings/notificationSetting';
import AccountDetail from '../../screens/accountDetail';

const Stack = createStackNavigator();

const CustomHeader = () => {

  const {setStatusBottomSheet} = UseStore();

  return (
    <Pressable className="px-4" onPress={()=>setStatusBottomSheet(true)}>
     <AntDesign name="close" size={24} color="black" />
    </Pressable>
  );
};

const CustomHeader_JoinExistingAccount = ({navigation}) => {

  return (
    <Pressable className="px-4" onPress={()=>navigation.navigate('Home')}>
     <AntDesign name="close" size={24} color="black" />
    </Pressable>
  );
}

const CustomHeader_PaymentCreditCard = ({navigation}) => {
  const {handleCardToken} = UseStore();
  return (
    <TouchableOpacity className="px-4" onPress={handleCardToken}>
     <Text className="font-bold text-gray-500">Save</Text>
    </TouchableOpacity>
  );
}

const CustomHeader_AccountDetails = ({navigation}) => {
  const {isSaveEnable} = UseStore();
  return (
    <TouchableOpacity className="px-4" disabled={!isSaveEnable}>
     <Text className={`font-bold ${isSaveEnable ? "text-[#ff9d00]" : "text-gray-500"}`}>Save</Text>
    </TouchableOpacity>
  );
}

export default function Custom_Stack() {

  const [welcomeScreen ,setWelcomeScreen] = useState(true)
  const {userAuthenticated , setUserAuthenticated , setPhoneNumber} = UseStore()

  
const handleGet = async () => {
  let result =  await SecureStore.getItemAsync("Authenticate");
  if(result){
    setUserAuthenticated(true)
    setPhoneNumber(result)
  }
}

  useEffect(()=>{
    handleGet();
    setTimeout(()=>{
      setWelcomeScreen(false)
    },4000)
  },[])

  useEffect(()=>{
    async function fetchData() {
      let result = await SecureStore.getItemAsync("Authenticate");
      if (result) {
        setPhoneNumber(result);
      }
    }
    fetchData();
  },[userAuthenticated])

  return welcomeScreen ? ( 

        <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options= {{headerShown:false}}/>
        </Stack.Navigator>
  
  ) : !userAuthenticated ? ( <Stack.Navigator initialRouteName="welcomeSignup" >
        <Stack.Screen name="welcomeSignup" component={WelcomeSignup} options= {{headerShown:false}}/>
        <Stack.Screen name="countryCode" component={CountryCode} options= {{headerTitle:"Select Country" , headerLeft:() => null}}/>
        <Stack.Screen name="verification" component={Verification} options= {{headerTitle:"Phone Verification" }}/>
        </Stack.Navigator>) : 
        (  <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options= {{headerShown:false}}/>
        <Stack.Screen name="business-center" component={BusinessAccount} options={{headerTitle:"Gett for Business" , headerTransparent:false}}/>
        <Stack.Screen name="signup" component={SignupWebComponent} options={({ navigation }) => ({headerTitle:"Gett for Business" , headerTransparent:false , headerRight:() => <CustomHeader/> , headerLeftContainerStyle:{display:"none"} })}/>
        <Stack.Screen name="joinExistingAccount" component={JoinExistingAccount} options={{headerTitle:"Join existing account" , headerTransparent:false}}/>
        <Stack.Screen name="joinExistingAccoutFinal" component={JoinExistingAccoutFinal} options={({ navigation }) => ({headerTitle:"Join existing account" , headerTransparent:false , headerRight:()=><CustomHeader_JoinExistingAccount navigation={navigation}/>})}/>
        <Stack.Screen name="credit-card" component={CardIndex} options={({ navigation }) => ({headerTitle:"Add Debit/Credit Card" , headerTransparent:false, headerRight:()=><CustomHeader_PaymentCreditCard navigation={navigation}/>})}/>
        <Stack.Screen name="megaphone" component={Newsfeed} options={({ navigation }) => ({headerTitle:"NewsFeed" , headerTransparent:false })}/>
        <Stack.Screen name="clock-time-four" component={Rides} options={({ navigation }) => ({headerTitle:"Rides and delivery" , headerTransparent:false })}/>
        <Stack.Screen name="discount" component={CouponCode} options={({ navigation }) => ({headerTitle:"Coupons" , headerTransparent:false })}/>
        <Stack.Screen name="settings" component={Settings} options={({ navigation }) => ({headerTitle:"Settings" , headerTransparent:true })}/>
        <Stack.Screen name="notificationSetting" component={NotificationSetting} options={({ navigation }) => ({headerTitle:"Notification Settings" , headerTransparent:true })}/>
        <Stack.Screen name="accountDetails" component={AccountDetail} options={({ navigation }) => ({headerTitle:"Account Details" , headerTransparent:false, headerRight:()=><CustomHeader_AccountDetails navigation={navigation}/>})}/>
    </Stack.Navigator> )
}