import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Stack, useSearchParams } from 'expo-router'
import StackScreen from '../../components/stackScreen';
import axios from 'axios';
import Loader from '../../utils/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';
import {SliderBox} from 'react-native-image-slider-box';

function singleProductScreen() {
  const {id} = useSearchParams();

  const [products ,  setProducts] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [companyURL , setCompanyURL] = useState("");
  const sliderImgs = [
    require("../../assets/slider-images/1.png"),
    require("../../assets/slider-images/2.png"),
    require("../../assets/slider-images/3.png"),
]

let width = Dimensions.get("window").width;

  useEffect(() => {
    const getData = async () => {
        setIsLoading(true)
        try {
            const fetchData = await axios.get(`https://purple-anemone-veil.cyclic.app/singleProduct/${id}`);
            const res = fetchData.data;
            console.log(res)
            setProducts(res);

        } catch (error) {
            alert("error at the tine of fetching data" + error)
            console.log(error)
        }
        finally {
          setIsLoading(false)
        }
    }


    
getData();
} , [])

useEffect(() => {
    const getCompanyLogo = async () => {
        try {
            let options = {
                
            }
            let fetchData = await axios.get(`https://api.api-ninjas.com/v1/logo?name=${products[0]?.company != undefined ? products[0].company : "Google"}` , {
                headers: {
                    'X-Api-Key' : 'HjlflNrfltAlAm6bwLj+EQ==HBP8QZiRFzatJNZ2'
                }
            });

            let res = await fetchData.data;
            console.log(res , 'tu he meri duniya')
            setCompanyURL(res)
        } catch (error) {
            console.log(error , "FUCK")
        }
    }
    getCompanyLogo()

} ,[companyURL])
console.log(companyURL , 'the com url')

let onlyCom = products?.company;
let single = products[0]
let images = single?.images || []

if(isLoading) return <Loader size={'large'} color={'#000'}/>
if (!products) return null;
  return (
    <SafeAreaView style={{flex: 1}}>
    <Stack.Screen 
      options={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerRight: () => {
            return <View style={{display: 'flex' , flexDirection: 'row' , alignItems: 'center'}}>
                <TouchableOpacity><Image  source={require("../../icons/search.png")} style={{width: 25 , height: 25 }}/></TouchableOpacity>
                <TouchableOpacity><Image  source={require("../../assets/shopping-bag.png")} style={{width: 25 , height: 25 }}/></TouchableOpacity>
            </View>
        },
        headerTitle: () => {
            return <Image source={{uri: companyURL[0]?.image}} style={{width: 50 , height: 50 , resizeMode: 'contain'}} />
        }

        
        
      }}
      />
        <ScrollView>
        <SliderBox  images={images} dotColor="#000" sliderBoxHeight={500} autoplay circleloop resizeMode={'cover'}/>
        {/* <View style={{width: "100%" , height: '100%'}}>
            <FlatList 
            data={single?.images}
            renderItem={({item}) => (
                <Image  source={{uri: item}} style={{width:width , height: 600}} resizeMode='contain' />
            )}
            horizontal
            />
        </View> */}
        <Text>{single?.name}</Text>
        <Text>{companyURL[0]?.image}</Text>
        
        </ScrollView>
      
    </SafeAreaView>
  )
}

export default singleProductScreen