import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/home';
import BusinessAccount from '../../screens/businessAccount';
import SignupWebComponent from '../../pages/businessAccount/signupWebview';
import { Image, Pressable, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import UseStore from '../store/useStore';
import JoinExistingAccount from '../../pages/businessAccount/joinExistingAccount';
import JoinExistingAccoutFinal from '../../pages/businessAccount/joinExistingAccoutFinal';
import CardIndex from '../../pages/adddebit/cardIndex';

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
    <Pressable className="px-2" onPress={handleCardToken}>
     <Text>Save</Text>
    </Pressable>
  );
}

export default function Custom_Stack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options= {{headerShown:false}}/>
        <Stack.Screen name="business-center" component={BusinessAccount} options={{headerTitle:"Gett for Business" , headerTransparent:true}}/>
        <Stack.Screen name="signup" component={SignupWebComponent} options={({ navigation }) => ({headerTitle:"Gett for Business" , headerTransparent:false , headerRight:() => <CustomHeader/> , headerLeftContainerStyle:{display:"none"} })}/>
        <Stack.Screen name="joinExistingAccount" component={JoinExistingAccount} options={{headerTitle:"Join existing account" , headerTransparent:false}}/>
        <Stack.Screen name="joinExistingAccoutFinal" component={JoinExistingAccoutFinal} options={({ navigation }) => ({headerTitle:"Join existing account" , headerTransparent:false , headerRight:()=><CustomHeader_JoinExistingAccount navigation={navigation}/>})}/>
        <Stack.Screen name="credit-card" component={CardIndex} options={({ navigation }) => ({headerTitle:"Add a Debit/Credit Card" , headerTransparent:false, headerRight:()=><CustomHeader_PaymentCreditCard navigation={navigation}/>})}/>
    </Stack.Navigator>
  )
}