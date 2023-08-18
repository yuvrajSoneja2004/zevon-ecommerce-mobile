import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HomeComp from '../components/Home/HomeComp'
import { Stack } from 'expo-router';
import BottomBar from '../components/BottomBar/BottomBar';


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
        <BottomBar />
       <HomeComp />
    </SafeAreaView>
  )
}

const S = StyleSheet.create({
  bottomStyle: {
     width: '100%',
     position: 'absolute',
    //  height: "100%",
    //  zIndex: 1,

    backgroundColor: 'transperent',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
  }
})

export default home