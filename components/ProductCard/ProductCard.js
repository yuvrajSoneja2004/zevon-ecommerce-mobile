import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ProductCard({productTitle,productImage, productPrice}) {
  return (
    <TouchableOpacity style={S.whole}>
        <View style={S.productImg}><Image source={{uri: productImage }} style={{height: '100%' , width: '100%'}}/></View>
      <View style={S.productDetails}>
      <Text>{productTitle}</Text>
      <Text>{parseInt(productPrice) - 120}</Text>
      </View>
    </TouchableOpacity>
  )
}
// Will move to external file later

const S = StyleSheet.create({
    whole: {
       height: 240,
       borderWidth: 2,
       borderColor: 'black',
       width: '50%', // Two columns, with a small gap for spacing
    marginBottom: 10, // Add spacing between rows
    },
    productImg : {
        width: '100%',
        height: '70%',
        borderWidth: 3,
        borderColor: 'pink'
    },
    productDetails: {
        width: '100%',
        height: '30%'
    }
})