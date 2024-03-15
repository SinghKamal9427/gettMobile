import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Pressable, Dimensions, Platform } from 'react-native';
import UseStore from './store/useStore';
import { Entypo , MaterialIcons  } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;



let deviceCategory;

if (screenHeight < 480) {
  deviceCategory = 'small';
} else if (screenHeight < 800) {
  deviceCategory = 'medium';
} else {
  deviceCategory = 'large';
}

const BottomSheetAccountDetails = ({handleClose , imagePicker , cameraPicker}) => {
  

  const slide = React.useRef(new Animated.Value(300)).current;


    const slideUp = () => {
        // Will change slide up the bottom sheet
        Animated.timing(slide, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start();
      };
    
      const slideDown = () => {
        // Will slide down the bottom sheet
        Animated.timing(slide, {
          toValue: 300,
          duration: 400,
          useNativeDriver: true,
        }).start();
      };


      React.useEffect(() => {
        slideUp()
      })


      const closeModal = () => {
        slideDown();

        setTimeout(() => {
            handleClose(false);
        }, 600)
        
      }


    return(
        <Pressable onPress={ closeModal } style={styles.backdrop}>
            <Pressable style={{ width: '100%', height: deviceCategory == 'medium' && '40%' || deviceCategory == 'large' && '30%' || '60%' }}>
                <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                    <View className="py-2 flex-col">
                    <View className='rounded-xl'>
                    <Pressable android_ripple={{ color: "gray", borderless: true }}  style={({pressed})=>[
                  Platform.select({
                    ios:{
                      backgroundColor : pressed ? 'rgba(0,0,0,0.1)' : 'transparent',
                      borderRadius:"12px"
                    }
                  }),{
                    width:"100%"
                  }
                ]} onPress={cameraPicker}>
                    <View className='flex-row items-center p-2 py-4 space-x-4'>
                    <Entypo name="camera" size={20} color="black" />
                    <Text style={{ fontSize: 16, color:"gray"}} className="font-semibold">Take Photo</Text>
                    </View>
                    </Pressable>
                    </View>

                    <View className='rounded-xl'>
                    <Pressable android_ripple={{ color: "gray", borderless: true }}  style={({pressed})=>[
                  Platform.select({
                    ios:{
                      backgroundColor : pressed ? 'rgba(0,0,0,0.1)' : 'transparent',
                      borderRadius:"12px"
                    }
                  }),{
                    width:"100%"
                  }
                ]} onPress={imagePicker}>
                    <View className='flex-row items-center p-2 py-4 space-x-4'>
                    <MaterialIcons name="photo-library" size={20} color="black" />
                    <Text style={{ fontSize: 16, color:"gray"}} className="font-semibold">Choose From Library</Text>
                    </View>
                    </Pressable>
                    </View>
                    </View>
                    <View className="bg-[#ffffff] border-2 border-gray-200   rounded-xl ">
            <Pressable android_ripple={{ color: "gray", borderless: true }}  style={({pressed})=>[
                  Platform.select({
                    ios:{
                      backgroundColor : pressed ? 'rgba(0,0,0,0.1)' : 'transparent',
                      borderRadius:"12px"
                    }
                  }),{
                    width:"100%"
                  }
                ]} onPress={closeModal}>
              <Text className="text-[16px]  p-4 text-center font-bold text-black">
                Back
              </Text>
            </Pressable>
          </View>

                </Animated.View>
            </Pressable>
            
        </Pressable>
    )
}


export default BottomSheetAccountDetails;


const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    bottomSheet: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bcbcbc',
        paddingHorizontal: 15,
        marginBottom: 10
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#40A2E3',
        alignItems: 'center',
        marginTop: 15
    }
})