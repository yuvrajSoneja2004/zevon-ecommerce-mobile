import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

export default function CartCard({data}) {
    
    const isDarkMode = useSelector(state => state.theme.isDarkMode);
    const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);
    const seperator = new Intl.NumberFormat();
  return (
    <View style={S.whole}>
     <Image source={{uri: data?.productImage}} style={{width: "50%" , height: "100%", borderRadius: 10, resizeMode: 'contain'}}/>
     <View style={{width: '100%' , marginLeft: 20}}>
     <Text style={{width: '30%' ,fontWeight: 'bold' , fontSize: 16, lineHeight: 22, color: theme.fontsCol}}>{data?.productName.slice(0 ,24)}{data?.productName?.length > 24 ? "..." : ""}</Text> 
     <Text style={{width: '100%'  , fontSize: 16, lineHeight: 22 , marginVertical: 10,color: theme.fontsCol }}>APPLE</Text> 
     <View style={{display: 'flex' , flexDirection: 'row' , alignItems: 'center'}}>
     <Text style={{width: '100%'  , fontSize: 16, lineHeight: 22 , marginVertical: 10 , color: theme.fontsCol}}>Color: <View style={{backgroundColor: data?.productSelectedColor, width: 25 , height: 25}}></View></Text> 
     </View>
     <Text style={{width: '30%' ,fontWeight: 'bold' , fontSize: 18, lineHeight: 22 , color: theme.fontsCol, marginTop: 10}}>₹{seperator.format(data?.productPrice)}</Text> 
     {/* Product count  */}
     <View style={{height: 33 , width: 100, display: 'flex' , flexDirection: 'row', marginVertical: 12}}>
      <TouchableOpacity><Image source={require("../icons/cart_icons/add.png")} style={{width: 30 , height: 30}}/></TouchableOpacity>
        <Text style={{fontSize: 16, marginHorizontal: 15, marginTop: 3}}>0</Text>
       <TouchableOpacity><Image source={require("../icons/cart_icons/less.png")} style={{width: 30 , height: 30}}/></TouchableOpacity>
     </View>
     <TouchableOpacity><Text>❌ Remove</Text></TouchableOpacity>
    
     </View>
     
    </View>
  )
}


const S = StyleSheet.create({
whole : {
    height: 300,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 2,
    alignItems: 'flex-start',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    padding: 20,
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4,
}
})