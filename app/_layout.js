 // ? Currently following tutorial of react native from : https://www.youtube.com/watch?v=mJ3bGvy0WAY&ab_channel=JavaScriptMastery

 // * Step 1 : Import Stack Component from expo-router
 import { Stack } from "expo-router";

 // Importing neccessary functions to use custom fonts
 import { useFonts } from "expo-font";
 import { useCallback } from "react";
 import * as SplashScreen from 'expo-splash-screen';
 import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { GlobalStore } from "../store/store";



// This function ensures that don't load the app until the required fonts are loaded



 
 // * Step 2 : Create a function that returns Stack component so that we can  use it in whole app
 const Layout = () => {

   // requiring fonts that we wank to use
   const [fontsLoaded] = useFonts({
      "Inco": require("../fonts/Inco-Regular.ttf"),
     
   })

   if(!fontsLoaded){
      return <AppLoading>Error , fonts not loaded</AppLoading>
   }

  

    return (
      <Provider store={GlobalStore}>
         <Stack/>
      </Provider>
    )
 }

 export default Layout;