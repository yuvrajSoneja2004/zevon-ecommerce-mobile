import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import ProductCard from '../ProductCard/ProductCard'
import axios from 'axios'
import Loader from '../../utils/Loader'
import { SafeAreaView } from 'react-native'
import { contactUsIcons } from '../../utils/contactUsIcons'
import { categoryImages } from '../../utils/categoryImages'
import { useRouter } from 'expo-router'


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
            alert("error at the tine of fetching data" + error)
        }
        finally {
            setIsLoadingTrending(false)
        }
    }
getData();
} , [])


  return (
   <SafeAreaView style={{flex: 1}}>
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
        <Text style={S.trendingText}>Trending Products</Text>
     {
        isLoadingTrending ? <Loader size="large" color="#000"/> : (
            <FlatList 
            data={trendingProducts.slice(0 ,6)}
            renderItem={({item , index}) => {
                return <ProductCard  productTitle={item?.name} productImage={item?.images[0]} productPrice={item?.price}/>
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
                return <ProductCard  productTitle={item?.name} productImage={item?.images[0]} productPrice={item?.price} isBestSeller={item?.isBestSeller}/>
            }}
            numColumns={2}
            />
        )
     }
     </View>
     <View style={S.contactUs}> 
        <FlatList
        data={contactUsIcons}
        renderItem={({item}) => (
            <View style={{paddingVertical: 30}}>
                <Image  source={item.icon}  style={{width: 25, height: 25}}/>
                <Text>{item.title}</Text>
                <Text>{item.desc}</Text>
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
    trendingText: {
        marginTop: 10,
        marginBottom: 15,
        fontSize: 20,
        fontFamily: 'Inco'
    },
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