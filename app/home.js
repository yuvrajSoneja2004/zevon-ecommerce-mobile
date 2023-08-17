import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import HomeComp from '../components/Home/HomeComp'
import { Stack } from 'expo-router';


function home() {



  return (
    <SafeAreaView style={{flex: 1 , backgroundColor: '#fff'}}>
         <Stack.Screen 
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
       <HomeComp />
    </SafeAreaView>
  )
}

export default home