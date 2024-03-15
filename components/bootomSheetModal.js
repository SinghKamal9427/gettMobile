import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import BootomSheetModalContent from '../pages/home/bootomSheetModalContent';


const BottomSheetModalLib = () => {
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%' , '80%'], []);

  // callbacks
  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
   console.log(index)
  }, []);

  const handleOpenSheet = () => {
    bottomSheetModalRef.current?.present();
  }

  // renders
  return (
    <><View className="m-4 absolute bottom-6 right-2 rounded-[800px] shadow-xl bg-white flex-1 items-center justify-center">
    <Pressable android_ripple={{color:"gray" , borderless:true }} onPress={handleOpenSheet} style={({pressed })=> [
        Platform.select({
            ios:{
                backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : 'transparent',
                borderRadius:"800px"
            }
        })
    ]}>
      <View  className="p-2 justify-center items-center rounded-[800px]">
      <AntDesign name="up" size={24} color="black" />
    </View>
    </Pressable>
  </View>
    <BottomSheetModalProvider> 
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableOverDrag={false}
          enableHandlePanningGesture={false}
        >
          <BottomSheetView style={styles.contentContainer}>
            <BootomSheetModalContent/>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
  position:'absolute',
  bottom: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    width:'100%'
  },
});

export default BottomSheetModalLib;