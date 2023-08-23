import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import StackScreen from '../stackScreen'


export default function CategoriesComp() {

// Slider Images
const sliderImgs = [
    require("../../assets/category_slider_images/1.png"),
    require("../../assets/category_slider_images/2.png"),
    require("../../assets/category_slider_images/3.png"),
    require("../../assets/category_slider_images/4.png"),
    require("../../assets/category_slider_images/5.png"),
]

// Categories images
const catImgs = [
  require("../../assets/category_screen/1.png"),
  require("../../assets/category_screen/2.png"),
]

const itemSeperator = () => {
  return <View style={{height: 20}} />
}

  return (
    <SafeAreaView>
      <StackScreen />
      <ScrollView>
      <SliderBox  images={sliderImgs} dotColor="#000" sliderBoxHeight={400} autoplay circleloop resizeMode={'cover'}/>
      <View style={{display: 'flex' , rowGap: 0 }}>
        <FlatList
  data={catImgs}
  renderItem={({item}) => (
      <Image source={item} style={{width: "50%" , height: 300}} />   
  )}
 ItemSeparatorComponent={itemSeperator}
  numColumns={2}
      />
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}