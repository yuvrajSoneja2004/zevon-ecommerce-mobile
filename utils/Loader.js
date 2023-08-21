import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

export default function Loader({size , color}) {


  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);

  return (
    <View style={{flex:1 ,display: 'flex' , justifyContent: 'center' ,alignItems: 'center'  ,height: '100%'}}>
      <ActivityIndicator size={size} color={theme.fontsCol} />
    </View>
  )
}