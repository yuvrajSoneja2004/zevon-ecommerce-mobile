import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function StackScreen() {
  return   <Stack.Screen 
  options={{
    headerShadowVisible: false,
    headerTitleAlign: 'center',
    headerTitle: () => {
      return <Image  source={require("../assets/logo.png")} style={{width: 100 , height: 30}}/>
    },
    headerRight: () => {
        return <TouchableOpacity>
            <Image  source={require("../assets/shopping-bag.png")} style={{width: 25 , height: 25 }}/>
        </TouchableOpacity>
    }
    
    
  }}
  />
}