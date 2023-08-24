import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import ProductCard from '../ProductCard/ProductCard'
import axios from 'axios'
import Loader from '../../utils/Loader'
import { SafeAreaView } from 'react-native'
import { contactUsIcons, contactUsIconsDark } from '../../utils/contactUsIcons'
import { categoryImages } from '../../utils/categoryImages'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../slices/theme'


export default function HomeComp() {

    // Trending Products State
    const [trendingProducts , setTrendingProducts] = useState([]);
    const [isLoadingTrending , setIsLoadingTrending] = useState(false)

    const navigate = useRouter();


// Slider Images
const sliderImgs = [
    require("../../assets/slider-images/1.png"),
    require("../../assets/slider-images/2.png"),
    require("../../assets/slider-images/3.png"),
]

// USing global theme
const isDarkMode = useSelector(state => state.theme.isDarkMode);
const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);
const dispatch = useDispatch();

console.log(theme, 'this is the theme state');


//testing
const userDetails = useSelector(state => state.userInfo);



// Special offers
const specialOffers = [
    require("../../assets/1.png"),
    require("../../assets/2.png"),
]

// Contact us Icons

useEffect(() => {
    const getData = async (req , res) => {
        setIsLoadingTrending(true)
        try {
            const fetchData = await axios.get("https://purple-anemone-veil.cyclic.app/sale");
            const res = fetchData.data;
            console.log(res)
            setTrendingProducts(res);

        } catch (error) {
            alert("error at the tine of fetching data" + error);
        }
        finally {
            setIsLoadingTrending(false)
        }
    }
getData();
} , [])


useEffect(() => {
    console.log(userDetails , 'redux user  details')
})

  return (
   <SafeAreaView style={{flex: 1, backgroundColor: theme.bg }}>
     <ScrollView showsVerticalScrollIndicator={false}>
        <View style={S.searchBox}>
        <View style={S.darkModeBox}><TouchableOpacity onPress={() => {dispatch(toggleTheme())}}>{
            !isDarkMode ? (
                <Image source={require("../../assets/night.png")} style={{width: 25 , height: 25}}  />
            ) : (
                <Image source={require("../../assets/sun.png")} style={{width: 25 , height: 25 }}  />
            )
        }</TouchableOpacity>
        </View>
        <View style={S.inputWrapper}>
            <View style={{width: '100%' , display: 'flex' , justifyContent: 'center' , alignItems: 'center',     backgroundColor: '#ebebeb'
, flexDirection: 'row' , borderRadius: 200}} >
                <Image  source={require("../../icons/search.png")}  style={{width: 22 , height: 22 ,marginRight: 3}}/>
          <TouchableOpacity style={{width: '80%' , height: 47}} onPress={() => {navigate.push("/searchScreen")}}>
          <TextInput  style={S.input} numberOfLines={1} maxLength={40} placeholder='Search Products' editable={false} />
          </TouchableOpacity>
            </View>
        </View>
        </View>
      <SliderBox  images={sliderImgs} dotColor="#000" sliderBoxHeight={400} autoplay circleloop resizeMode={'cover'}/>
      {/* Category Images  */}
      <View style={S.categoryImagesBox}>
        <FlatList 
        data={categoryImages}
        renderItem={({item}) => {
            return <TouchableOpacity onPress={() => {navigate.push(`/singleCategoryScreen/${item.query}`)}}><Image  source={item.img} style={{width: 100 , height: 100}} /></TouchableOpacity>
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* Trending Products  */}
      <View style={S.productGrid(isLoadingTrending)}>
        <Text style={S.trendingText(theme.fontsCol)}>Trending Products</Text>
     {
        isLoadingTrending ? <Loader size="large" color="#000"/> : (
            <FlatList 
            data={trendingProducts.slice(0 ,6)}
            renderItem={({item , index}) => {
                return <ProductCard  productTitle={item?.name} productImage={item?.images[0]} productPrice={item?.price} productID={item?._id}/>
            }}
            numColumns={2}
            />
        )
     }
     </View>
     {/* Lookdown 2023 and etc */}
     <View style={{paddingHorizontal: 10}}> 
     <Text style={S.trendingText}>Some Special Offers</Text>
     {/* img 1  */}
    <FlatList 
    data={specialOffers}
    renderItem={({item}) => {
        return  <View style={{width: 300 , height: 200 , margin: 5}}><Image source={item} style={{width: '100%' , height: '100%'}} resizeMode="cover" /></View>
    }}
    horizontal
    showsHorizontalScrollIndicator={false}
     />
     </View>
       {/* Best Seller Products  */}
       <View style={S.productGrid(isLoadingTrending)}>
        <Text style={S.trendingText}>Best Seller</Text>
     {
        isLoadingTrending ? <Loader size="large" color="#000"/> : (
            <FlatList 
            data={trendingProducts.filter((curProduct) => {
                return curProduct.isBestSeller === true;
            })}
            renderItem={({item , index}) => {
                return <ProductCard  productTitle={item?.name} productImage={item?.images[0]} productPrice={item?.price} isBestSeller={item?.isBestSeller} productID={item?._id}/>
            }}
            numColumns={2}
            />
        )
     }
     </View>
     <View style={S.contactUs}> 
        <FlatList
        data={!isDarkMode ? contactUsIcons : contactUsIconsDark}
        renderItem={({item}) => (
            <View style={{paddingVertical: 30}}>
                <Image  source={item.icon}  style={{width: 25, height: 25}}/>
                <Text style={{color: theme.fontsCol}}>{item.title}</Text>
                <Text style={{color: theme.fontsCol}}>{item.desc}</Text>
            </View>
        )}
        />
     </View>
    </ScrollView>
   </SafeAreaView>
  )
}

// Move to external file later
const S = StyleSheet.create({

contactUs : {
    width: "100%",
     display: 'flex' ,
      justifyContent: 'center' ,
       alignItems: 'center'
}
,
    productGrid: (isLoadingTrending) => (
        {
            flex: 1,
           paddingHorizontal: 10,
           height: isLoadingTrending ? 300 : "auto",
           
       }
    )
    ,
    trendingText: (color) => (
        {
            marginTop: 10,
            marginBottom: 15,
            fontSize: 20,
            color: color,
            fontFamily: 'Inco'
        }
    ),
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
    width: '100%',
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