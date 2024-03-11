import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import Custom_Drawer from "./components/navigations/drawer";
import StoreProvider from './components/store/storeProvider';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
       <StatusBar  animated={true}
        barStyle={"dark-content"}
        backgroundColor={"white"}
        showHideTransition={"fade"}/>
      <StoreProvider>
      <Custom_Drawer />
      </StoreProvider>
    </NavigationContainer>
  );
  }