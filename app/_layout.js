 // ? Currently following tutorial of react native from : https://www.youtube.com/watch?v=mJ3bGvy0WAY&ab_channel=JavaScriptMastery

 // * Step 1 : Import Stack Component from expo-router
 import { Stack } from "expo-router";

 // Importing neccessary functions to use custom fonts
 import { useFonts } from "expo-font";
 import { useCallback } from "react";
 import * as SplashScreen from 'expo-splash-screen';



// This function ensures that don't load the app until the required fonts are loaded
 SplashScreen.preventAutoHideAsync();



 
 // * Step 2 : Create a function that returns Stack component so that we can  use it in whole app
 const Layout = () => {

   // requiring fonts that we wank to use
   const [fontsLoaded] = useFonts({
      PrimaryFont: require("../fonts/Inco-Regular.ttf"),
     
   })

   // its like useEffect hook
   const onLayoutRootView = useCallback(async () => {
      if(fontsLoaded){
         await SplashScreen.hideAsync();
      }

   } ,[fontsLoaded])

   if(!fontsLoaded) return null;

    return <Stack onLayout={onLayoutRootView} />
 }

 export default Layout;