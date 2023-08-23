// expo-fonts.js
import * as Font from 'expo-font';

const useFonts = async () => {
    console.log("THis font function is being called")
  await Font.loadAsync({
    'Inco-Regular': require('../assets/fonts/Inco-Regular.ttf'),
    'primary' : require("../assets/fonts/BricolageGrotesque-Regular.ttf")
    // Define other custom fonts here
  });
};

export default useFonts;
