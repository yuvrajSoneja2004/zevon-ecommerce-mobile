import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import CategoriesComp from '../components/CategoriesComp/CategoriesComp'

function Categories() {
  return (
    <SafeAreaView style={{flex: 1}}>
       <CategoriesComp />
    </SafeAreaView>
  )
}

export default Categories