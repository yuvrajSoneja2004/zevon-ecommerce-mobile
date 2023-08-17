import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import RegisterComp from '../components/RegisterComp/RegisterComp'

function Register() {
  return (
    <SafeAreaView style={{flex: 1}}>
       <RegisterComp />
    </SafeAreaView>
  )
}

export default Register