import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import ProductCard from '../ProductCard/ProductCard'
import axios from 'axios'

export default function HomeComp() {

    // Trending Products
    const [trendingProducts , setTrendingProducts] = useState([])

// Slider Images
const sliderImgs = [
    require("../../assets/slider-images/1.png"),
    require("../../assets/slider-images/2.png"),
    require("../../assets/slider-images/3.png"),
]

// Category Images
const categoryImages = [
    require("../../assets/category_images/1.png"),
    require("../../assets/category_images/2.png"),
    require("../../assets/category_images/3.png"),
    require("../../assets/category_images/4.png"),
]

useEffect(() => {
    const getData = async (req , res) => {
        try {
            const fetchData = await axios.get("https://purple-anemone-veil.cyclic.app/sale");
            const res = fetchData.data;
            console.log(res)
            setTrendingProducts(res);

        } catch (error) {
            alert("error at the tine of fetching data" + error)
        }
    }
getData()
} , [])


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={S.searchBox}>
        <View style={S.darkModeBox}><Image source={require("../../assets/night.png")} style={{width: 25 , height: 25}} />
        </View>
        <View style={S.inputWrapper}>
            <View style={{width: '100%' , display: 'flex' , justifyContent: 'center' , alignItems: 'center',     backgroundColor: '#ebebeb'
, flexDirection: 'row' , borderRadius: 200}} >
                <Image  source={require("../../icons/search.png")}  style={{width: 22 , height: 22 ,marginRight: 3}}/>
            <TextInput  style={S.input} numberOfLines={1} maxLength={40} placeholder='Search Products'/>
            </View>
        </View>
        </View>
      <SliderBox  images={sliderImgs} dotColor="red" sliderBoxHeight={400} autoplay circleloop resizeMode={'cover'}/>
      {/* Category Images  */}
      <View style={S.categoryImagesBox}>
        <FlatList 
        data={categoryImages}
        renderItem={({item}) => {
            return <TouchableOpacity><Image  source={item} style={{width: 100 , height: 100}} /></TouchableOpacity>
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* Trending Products  */}
      <View style={S.productGrid}>
      <FlatList 
        data={trendingProducts}
        renderItem={({item}) => {
            return <ProductCard  productTitle={item?.name} productImage={item?.images[0]} productPrice={item?.price}/>
        }}
        numColumns={2}
        />

      </View>
    </ScrollView>
  )
}

// Move to external file later
const S = StyleSheet.create({
    productGrid: {
         flex: 1,
        flexDirection: 'row', // This creates a row layout
        flexWrap: 'wrap', // This allows items to wrap to the next row
        justifyContent: 'space-between', // Di
        paddingHorizontal: 10
    }
    ,
searchBox: {
paddingVertical: 7,
paddingHorizontal: 20,
display: 'flex',
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center'
}
,
darkModeBox: {
    width: '10%',
    marginRight: 10
}
,
inputWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    width:'90%',
},
input: {
    width: '80%',
    height: '100%',
    paddingTop: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    fontFamily: "Roboto",
    backgroundColor: '#ebebeb'
},
categoryImagesBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
}
})