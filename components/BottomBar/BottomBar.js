import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { bottomBarData } from '../../utils/bottombarDetails'

export default function BottomBar() {
  return (
    <View style={S.whole}>
        {
            bottomBarData.map((ma) => (
               <TouchableOpacity style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
                 <Image  source={ma.icon} style={{width: 27 , height: 27,marginBottom: 6}} key={ma.id}/>
                 <Text>{ma.title}</Text>
               </TouchableOpacity>

            ))
        }

    </View>
  )
}

const S = StyleSheet.create({
    whole: {
        width: '100%',
        height: 80,
        backgroundColor: '#fff',
        zIndex: 9999999999,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    justifyContent: 'space-evenly'
        
    }
})