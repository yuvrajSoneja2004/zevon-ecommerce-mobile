import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HomeComp from '../components/Home/HomeComp'
import { Stack } from 'expo-router';
import BottomBar from '../components/BottomBar/BottomBar';
import { useSelector } from 'react-redux';
import StackScreen from '../components/stackScreen';


function home() {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);


  return (
    <SafeAreaView style={{flex: 1 , backgroundColor: theme.bg}}>
        <StackScreen />
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