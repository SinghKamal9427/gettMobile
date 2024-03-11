import React, { Component, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Progress from 'react-native-progress';
import BottomSheet from '../../components/bottomsheet';
import UseStore from '../../components/store/useStore';

export default function SignupWebComponent ({navigation}) {

    const [loaded , setLoaded] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0);
    const {statusBottomSheet} = UseStore();


    const handleLoadProgress = ({ nativeEvent }) => {
      setLoadingProgress(nativeEvent.progress);
    };


    const handleLoaded = () => {
       setLoaded(false);
    }
    const hideHeaderAndFooter = `
    const header = document.getElementById('signup_header');
    const footer = document.getElementById('signup_footer');
    const login = document.getElementById('login_link');

    if(header){
        header.style.display = 'none';
    }

    if(footer){
        footer.style.display = 'none';
    }

    if(login){
      login.style.display = 'none';
    }
`
  return (<>
   {loaded && <Progress.Bar progress={loadingProgress} width={null} color='#ff9d00' height={4} borderRadius={0} borderWidth={0}/>}
    <WebView
      source={{ uri: 'https://gettcloone.vercel.app/en/signup' }}
      javaScriptEnabled={true}
      injectedJavaScript={hideHeaderAndFooter}
      onLoadEnd={handleLoaded}
      onLoadProgress={handleLoadProgress}
     injectedJavaScriptBeforeContentLoaded={hideHeaderAndFooter}
     style={{ display: loaded ? "none" : "block"}}
    />

{statusBottomSheet && <BottomSheet navigation={navigation}/>}
</>
  )
}