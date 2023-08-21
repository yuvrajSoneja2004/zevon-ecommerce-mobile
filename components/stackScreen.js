import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux';

export default function StackScreen() {

  const router =  useRouter()

// USing global theme
const isDarkMode = useSelector(state => state.theme.isDarkMode);
const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);


  return   <Stack.Screen 
  options={{
    headerShadowVisible: false,
    headerTitleAlign: 'center',
    headerTitle: () => {
    return !isDarkMode ? <Image  source={require("../assets/logo.png")} style={{width: 100 , height: 30}}/>:<Image  source={require("../assets/inverted_logo.png")} style={{width: 100 , height: 30}}/>
  },
  headerLeft: () => (
    <TouchableOpacity onPress={() => router.back()}>
{/* Later  */}
    </TouchableOpacity>
  ),
    headerRight: () => {
        return <TouchableOpacity>
            {
              !isDarkMode ? (
                <Image  source={require("../assets/shopping-bag.png")} style={{width: 25 , height: 25 }}/>
              ) : (
                <Image  source={require("../assets/dark_shopping.png")} style={{width: 25 , height: 25 }}/>
              )
            }
        </TouchableOpacity>
    },
    headerStyle: {backgroundColor: theme.bg}
  }}
  />
}