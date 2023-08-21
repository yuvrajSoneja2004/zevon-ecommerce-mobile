import { View, Text } from 'react-native'
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

  return (
    <SafeAreaView>
      <StackScreen />
      <ScrollView>
      <SliderBox  images={sliderImgs} dotColor="#000" sliderBoxHeight={400} autoplay circleloop resizeMode={'cover'}/>
      </ScrollView>
    </SafeAreaView>
  )
}