import {
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import UseStore from "../components/store/useStore";
import BottomSheetAccountDetails from "../components/bottomSheetAccountDetails";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";

export default function AccountDetail() {
  const { phoneNumber} = UseStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isBottomSheetOpen , setIsBottomSheetOpen] = useState(false);

  const [focusedName, setFocusedName] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);

  const [image, setImage] = useState();
 
 //Gallery image picker
  const [libraryPermissionInformation, requestLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  //Camera
  const [cameraPermissionInformation, requestCameraPermission] =
    ImagePicker.useCameraPermissions();


//Gallery image picker
  const handleLibraryPermissionDenied = async () => {
    const response = await requestLibraryPermission();
    if (!response.canAskAgain || !response.status) {
      Linking.openSettings();
    }
  };

//Gallery image picker
  const verifyLibraryPermission = async () => {
    if (
      libraryPermissionInformation.status ===
      ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      const response = await requestLibraryPermission();
      return response.granted;
    }
    if (
      libraryPermissionInformation.status === ImagePicker.PermissionStatus.DENIED
    ) {
      Alert.alert("Alert", "Please Allow permission to Upload Image", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Allow", onPress: handleLibraryPermissionDenied },
      ]);

      return false;
    }
    return true;
  };

  //Gallery image picker
  const imagePicker = async () => {
    const hasPermission = await verifyLibraryPermission();
    if (hasPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled) {
        setImage(result);
        HandleBottomSheettoggle(false)
      }
    }
  };

//Camera
  const handleCameraPermissionDenied = async () => {
    const response = await requestCameraPermission();
    if (!response.canAskAgain || !response.status) {
      Linking.openSettings();
    }
  };

//Camera
  const verifyCameraPermission = async () => {
    if (
      cameraPermissionInformation.status ===
      ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      const response = await requestCameraPermission();
      return response.granted;
    }
    if (
      cameraPermissionInformation.status === ImagePicker.PermissionStatus.DENIED
    ) {
      Alert.alert("Alert", "Please Allow permission to Upload Image", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Allow", onPress: handleCameraPermissionDenied },
      ]);
      return false;
    }
    return true;
  };

//Camera
  const cameraPicker = async () => {
    const hasPermission = await verifyCameraPermission();
    if (hasPermission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!result.canceled) {
        setImage(result);
        HandleBottomSheettoggle(false)
      }
    }
  };

  const HandleBottomSheettoggle = (boolean) => {
    setIsBottomSheetOpen(boolean)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView>
        <View className="justify-center items-center space-y-4 mt-10 px-4">
          <View className=" justify-center items-center border border-[#a5a4a4] rounded-[600px] ">
            {image ? (
              <View className="relative">
                <Image
                  source={{ uri: image?.assets[0].uri }}
                  className="w-32 h-32 rounded-[600px] "
                />
                <View className="absolute right-0 bottom-0 bg-slate-100 rounded-[600px]">
                <Pressable
                android_ripple={{ color: "gray", borderless: true }}
                style={{ width: "100%" }}
                className="p-2"
                onPress={()=>HandleBottomSheettoggle(true)}
              >
                <Entypo name="camera" size={20} color="black" />
              </Pressable>
              </View>
              </View>
            ) : (
              <Pressable
                android_ripple={{ color: "gray", borderless: true }}
                style={{ width: "100%" }}
                className="p-8"
                onPress={()=>HandleBottomSheettoggle(true)}
              >
                <Entypo name="camera" size={30} color="black" />
              </Pressable>
            )}
          </View>
          <View className=" gap-y-2 w-full">
            <Text className="text-[14px] font-bold text-gray-500">
              Full name
            </Text>
            <TextInput
              onChangeText={setName}
              onFocus={() => setFocusedName(true)}
              onBlur={() => setFocusedName(false)}
              value={name}
              placeholder="Full name"
              keyboardType="default"
              className="p-2 border-2 rounded-lg"
              style={{
                borderColor: focusedName ? "lightblue" : "lightgray", // Change border color based on focus state
              }}
              autoFocus={true}
            />
          </View>
          <View className=" gap-y-2 w-full">
            <Text className="text-[14px] font-bold text-gray-500">Email</Text>
            <TextInput
              onChangeText={setEmail}
              onFocus={() => setFocusedEmail(true)}
              onBlur={() => setFocusedEmail(false)}
              value={email}
              placeholder="Email"
              keyboardType="default"
              className="p-2 border-2 rounded-lg"
              style={{
                borderColor: focusedEmail ? "lightblue" : "lightgray", // Change border color based on focus state
              }}
            />
          </View>
          <View className=" gap-y-2 w-full">
            <Text className="text-[14px] font-bold text-gray-500">Phone</Text>
            <TextInput
              value={phoneNumber}
              placeholder="phone number"
              keyboardType="default"
              className="p-2 border-2 rounded-lg"
              style={{
                borderColor: "lightgray",
                backgroundColor: "lightgray",
              }}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
     {isBottomSheetOpen && <BottomSheetAccountDetails imagePicker={imagePicker} cameraPicker={cameraPicker} handleClose={HandleBottomSheettoggle}/>}
    </KeyboardAvoidingView>
  );
}
