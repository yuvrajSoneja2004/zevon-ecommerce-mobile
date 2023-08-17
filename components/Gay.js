import { useRouter } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

function Gay() {
    let data = useSelector(state => state.sample)
  return (
    <View>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
        <Text>{data}</Text>
    </View>
  )
}

export default Gay