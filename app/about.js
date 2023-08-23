import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import StackScreen from '../components/stackScreen'
import { useSelector } from 'react-redux';

export default function about() {

    const isDarkMode = useSelector(state => state.theme.isDarkMode);
    const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);


  return (
    <SafeAreaView>
      <StackScreen />
      <ScrollView contentContainerStyle={S.wholeView}>
        <Text style={{color: theme.fontsCol , fontSize: 30 , marginVertical: 20}}>About Me?</Text>
    <Image  source={require("../assets/about.png")} style={{height: 400 , width: 400 }} />
    <Text style={{color: theme.fontsCol , fontSize: 30 , marginVertical: 20}}>This is a personal project made by Yuvraj Soneja , a student who is aiming to become software developer. I will really apperaiciate it if you send feedback regarding the features and bugs for this app. Well , if you are reading till here , thank you very much &lessthan;3</Text>

      </ScrollView>
    </SafeAreaView>
  )
}


const S = StyleSheet.create({
    wholeView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        textAlign: 'center'
    }
})