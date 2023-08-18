import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loader({size , color}) {
  return (
    <View style={{flex:1 ,display: 'flex' , justifyContent: 'center' ,alignItems: 'center'  ,height: '100%'}}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}