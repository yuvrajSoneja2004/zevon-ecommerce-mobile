import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

export default function ProductCard({productTitle,productImage, productPrice ,isBS, productID}) {

let numFormat = new Intl.NumberFormat();
let navigate = useRouter();

const isDarkMode = useSelector(state => state.theme.isDarkMode);
const theme = useSelector(state => isDarkMode ? state.theme.darkTheme.fontsCol : state.theme.lightTheme.fontsCol);

  return (
    <TouchableOpacity style={S.whole()} onPress={() => {navigate.push(`/singleProduct/${productID}`)}}>
      <View style={{width: '100%' , height: 20 , }}>
    {
      isBS ? <View style={{width: 100 , height: 100 , backgroundColor: '#000'}}><Text style={{color: 'white' , width: '100%' , height: '100%', paddingHorizontal: 3 ,fontSize: 13 }}>BEST SELLER</Text></View> : null
    }
      </View>
        <View style={S.productImg}><Image source={{uri: productImage }} style={{height: '100%' , width: '100%', zIndex: -399}}/></View>
      <View style={S.productDetails}>
      <Text  style={{color: theme}}>{productTitle?.slice(0 ,30)}...</Text>
    <View style={{display: 'flex' , flexDirection: 'row' , alignItems: 'center' , justifyContent: 'space-between'}}>
    <View style={S.priceDetails}>
    <Text style={S.discountedPrice}>₹{numFormat.format(parseInt(productPrice))}</Text>
    <Text style={{color: theme}}>₹{numFormat.format(parseInt(productPrice) - 120)}</Text>
    </View>
    {/* Wishlist  */}
    <TouchableOpacity style={{ borderColor: theme ,borderWidth: .4 ,borderRadius: 50, padding: 5}}>{
      !isDarkMode ? (
        <Image  source={require("../../icons/heart.png")} style={{width: 15 , height: 15}}/>
      ) : (
        <Image  source={require("../../icons/dark_heart.png")} style={{width: 15 , height: 15}}/>
      )
    }</TouchableOpacity>
    </View>
      </View>
    </TouchableOpacity>
  )
}
// Will move to external file later

const S = StyleSheet.create({

priceDetails: {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5
}
  ,
  discountedPrice: {
    marginRight: 8,
    textDecorationLine: "line-through",
    color: '#a8a5a5'
  },
    whole: () => (
      {
        height: 290,
        width: '50%', // Two columns, with a small gap for spacing
     // marginBottom: 10, // Add spacing between rows
     borderWidth: 1,
     borderColor: '#E4DCCF',
     marginVertical: 7,
     borderRadius: 5
     }
    ),
    productImg : {
        width: '100%',
        height: '70%',
    },
    productDetails: {
        width: '100%',
        height: '30%',
        padding: 5
    }
})