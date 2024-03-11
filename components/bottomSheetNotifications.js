import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Pressable, Dimensions } from 'react-native';
import UseStore from './store/useStore';

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

const NotificationBottomSheet = ({handleClose ,  handleConfirm}) => {
  

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
            handleClose();
        }, 600)
        
      }


    return(
        <Pressable onPress={ closeModal } style={styles.backdrop}>
            <Pressable style={{ width: '100%', height: deviceCategory == 'medium' && '35%' || deviceCategory == 'large' && '25%' || '55%' }}>
                <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Turn off notifications?</Text>
                    <Text style={{ fontSize: 16 , marginTop: 10 , color:"gray"}}>You might miss updates about your code</Text>
                    <View style={{ marginTop: 20 , flexDirection:'row' , justifyContent:"space-between" , alignItems:"center"}} className="space-x-2">
                    <View className="bg-[#ffffff] border-2 border-gray-200   rounded-xl w-[50%]">
            <Pressable android_ripple={{ color: "gray", borderless: true }}  style={{width:"100%"}} onPress={closeModal}>
              <Text className="text-[16px]  p-4 text-center font-bold text-black">
                Cancel
              </Text>
            </Pressable>
          </View>

          <View className="bg-[#ff9d00] border-2  border-[#ff9d00]  rounded-xl w-[50%]">
            <Pressable android_ripple={{ color: "gray", borderless: true }} style={{width:"100%"}} onPress={handleConfirm}>
              <Text className="text-[16px] text-center p-4 font-bold  text-white ">
                Turn off
              </Text>
            </Pressable>
          </View>
                    </View>
                </Animated.View>
            </Pressable>
            
        </Pressable>
    )
}


export default NotificationBottomSheet;


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