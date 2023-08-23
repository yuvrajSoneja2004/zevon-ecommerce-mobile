

 // * Step 1 : Import Stack Component from expo-router
 import { Stack } from "expo-router";

 // Importing neccessary functions to use custom fonts
 import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { GlobalStore } from "../store/store";
import { Text, View } from "react-native";
import { useState } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";




// This function ensures that don't load the app until the required fonts are loaded
SplashScreen.preventAutoHideAsync();



 
 // * Step 2 : Create a function that returns Stack component so that we can  use it in whole app
 const Layout = () => {

   const [fontsLoaded] = useFonts({
      'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    });
  
    const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);
  
    if (!fontsLoaded) {
      return null;
    }
  

  
    return (
      <Provider store={GlobalStore}>
         <Stack onLayout={onLayoutRootView}/>
      </Provider>
    )
 }


 export default Layout;