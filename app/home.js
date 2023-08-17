import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import HomeComp from '../components/Home/HomeComp'

function home() {
  return (
    <SafeAreaView style={{flex: 1}}>
       <HomeComp />
    </SafeAreaView>
  )
}

export default home