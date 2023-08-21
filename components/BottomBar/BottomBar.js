import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { bottomBarData, bottomBarDataDark } from '../../utils/bottombarDetails'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

export default function BottomBar() {
  let navigate = useRouter()
  // USing global theme
const isDarkMode = useSelector(state => state.theme.isDarkMode);
const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);
  return (
    <View style={S.whole(theme)}>
        {
           !isDarkMode ?  bottomBarData.map((ma) => (
            <TouchableOpacity style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}} onPress={() => { navigate.push(ma.endpoint)}}>
              <Image  source={ma.icon} style={{width: 27 , height: 27,marginBottom: 6}} key={ma.id}/>
              <Text style={{fontFamily: "Inco" , color: theme.fontsCol}}>{ma.title}</Text>
            </TouchableOpacity>

         )) :  bottomBarDataDark.map((ma) => (
          <TouchableOpacity style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}} onPress={() => { navigate.push(ma.endpoint)}}>
            <Image  source={ma.icon} style={{width: 27 , height: 27,marginBottom: 6}} key={ma.id}/>
            <Text style={{fontFamily: "Inco" , color: theme.fontsCol}}>{ma.title}</Text>
          </TouchableOpacity>

       ))
        }

    </View>
  )
}

const S = StyleSheet.create({
    whole: (theme) => (
      {
        width: '100%',
        height: 80,
        backgroundColor: theme.bg,
        zIndex: 9999999999,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    justifyContent: 'space-evenly'
        
    }
    )
})