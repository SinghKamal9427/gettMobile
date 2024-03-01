import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import Custom_Drawer from "./components/navigations/drawer";
import StoreProvider from './components/store/storeProvider';

export default function App() {
  return (
    <NavigationContainer>
      <StoreProvider>
      <Custom_Drawer />
      </StoreProvider>
    </NavigationContainer>
  );
  }