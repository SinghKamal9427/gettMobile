import { createDrawerNavigator } from '@react-navigation/drawer';
import Custom_Stack from './stack';
import DrawerContent from './drawerContent';

const Drawer = createDrawerNavigator();

export default function Custom_Drawer() {
  return (
   <Drawer.Navigator screenOptions={{swipeEnabled:false}} drawerContent={(props)=><DrawerContent {...props}/>}>
    <Drawer.Screen name='bio' component={Custom_Stack} options={{headerShown:false}}/> 
   </Drawer.Navigator>
  )
}