import React from 'react'
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { GlobalStore } from '../store/store'
import { Stack, useRouter } from 'expo-router'
import Gay from '../components/Gay'
import RegisterComp from '../components/RegisterComp/RegisterComp';

function index() {
    const navigate = useRouter()
   
  return (
    <Provider store={GlobalStore}>
      <Stack.Screen 
      options={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitle: () => {
          return <Image  source={require("../assets/logo.png")} style={{width: 100 , height: 30}}/>
        }
      }}
      />
        <SafeAreaView style={{flex: 1}}>
    <RegisterComp />
    </SafeAreaView>
    </Provider>
  )
}

export default index