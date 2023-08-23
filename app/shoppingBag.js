import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import StackScreen from '../components/stackScreen'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

export default function shoppingBag() {
    const isDarkMode = useSelector(state => state.theme.isDarkMode);
    const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);
  return (
    <SafeAreaView style={{flex: 1}}>
        <StackScreen />
        <ScrollView>
            <View style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center', height: Dimensions.get("window").height - 100}}>
                <Image  source={require("../assets/empty_cart.png")} style={{width: "100%" , height: 340}}/>
                <Text style={{color: theme.fontsCol, fontSize: 28}}>No items in Cart 😞</Text>
                <TouchableOpacity style={{backgroundColor: "#B977FE" , borderRadius: 5 , marginTop: 15}}>
                    <Text style={{color: theme.fontsCol , paddingVertical: 10 , paddingHorizontal: 25}}>Add Products</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}