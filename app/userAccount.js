import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import StackScreen from '../components/stackScreen'
import { useSelector } from 'react-redux'
import { Stack, useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import { profileOptionsDark, profileOptionsWhite } from '../utils/profileScreenOptions';

export default function userAccount() {
    
// USing global theme
const isDarkMode = useSelector(state => state.theme.isDarkMode);
const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);

const dim = Dimensions.get("window").height;

const navigate = useRouter()

    // user data
    const userDetails = useSelector(state => state.userInfo);
    console.log(userDetails , 'tu kaate mujhe')
  return (
    <SafeAreaView>
        <Stack.Screen 
  options={{
    headerShadowVisible: false,
    headerTitleAlign: 'center',
    headerTitle: () => (
        <Text style={{color: theme.fontsCol , fontSize: 20}}>Profile</Text>
    ),
    headerRight: () => {
        return <TouchableOpacity>
            {
              !isDarkMode ? (
                <Image  source={require("../assets/shopping-bag.png")} style={{width: 25 , height: 25 }}/>
              ) : (
                <Image  source={require("../assets/dark_shopping.png")} style={{width: 25 , height: 25 }}/>
              )
            }
        </TouchableOpacity>
    },
    headerStyle: {backgroundColor: "#B977FE"},
    contentStyle: {backgroundColor: theme.bg}
  }}
  />
  <ScrollView>
    <View style={S.profileWhole(dim)}>
        <Image  source={{uri: userDetails?.userProfilePic}} style={{width: 100 , height: 100}} />
        <Text style={{color: '#fff' , fontSize: 24 , fontWeight: 'bold' , letterSpacing: 1 , marginTop: 10 , fontFamily:"Roboto-Medium"}}>{userDetails?.userName}</Text>
        <Text style={{color: '#fff' , fontSize: 16 , letterSpacing: 1 , marginTop: 10}}>{userDetails?.userEmail}</Text>
        {/* Options */}
        <View style={S.optionsWhole(dim , theme)}>
        <FlatList
      data={isDarkMode ? profileOptionsDark : profileOptionsWhite}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => {navigate.push(item.endpoint)}} style={{display: 'flex' , flexDirection: 'row', marginVertical: 20, alignItems: 'center'}}>
          <Image source={item.icon} style={{width: 30 , height: 30 , marginRight: 10}}/>
          <Text style={{color: theme.fontsCol, fontSize: 18}}>{item.title}</Text>
        </TouchableOpacity>
      )}
        />
        </View>
    </View>
  </ScrollView> 
    </SafeAreaView>
  )
}


const S = StyleSheet.create({
    profileWhole: (height) => (
         {
            height:height ,
            backgroundColor: "#B977FE",
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
           
        }
    ),
    optionsWhole: (height , whiteCol) => (
      {
        width: '100%',
        height: height - 300,
        backgroundColor: whiteCol.bg,
        marginTop: 30,
        borderRadius: 5,
        shadowColor: whiteCol.fontsCol,
shadowOffset: {
  width: 0,
  height: 3,
},
shadowOpacity:  0.17,
shadowRadius: 3.05,
elevation: 4,
padding: 30
      }
    )
})