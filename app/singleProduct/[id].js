import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Stack, useSearchParams } from 'expo-router'
import StackScreen from '../../components/stackScreen';
import axios from 'axios';
import Loader from '../../utils/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';
import {SliderBox} from 'react-native-image-slider-box';
import { useSelector } from 'react-redux';

function singleProductScreen() {
  const {id} = useSearchParams();

  const [products ,  setProducts] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [companyURL , setCompanyURL] = useState("");

  // theme
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);

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

let single = products[0]
let images = single?.images || [];
let numFormat = new Intl.NumberFormat();


if(isLoading) return <Loader size={'large'} color={'#000'}/>
if (!products) return null;
  return (
    <SafeAreaView style={{flex: 1}}>
    <Stack.Screen 
      options={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: theme.bg},
        contentStyle: {backgroundColor: theme.bg},
        headerRight: () => {
            return <View style={{display: 'flex' , flexDirection: 'row' , alignItems: 'center'}}>
                <TouchableOpacity>
                    {
                        !isDarkMode ? <Image  source={require("../../icons/search.png")} style={{width: 22 , height: 22 }}/> : <Image  source={require("../../icons/dark_search.png")} style={{width: 22 , height: 22 }}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity>
                    {
                        isDarkMode ? <Image  source={require("../../assets/dark_shopping.png")} style={{width: 25 , height: 25 , marginLeft: 20}}/> : <Image  source={require("../../assets/shopping-bag.png")} style={{width: 25 , height: 25 , marginLeft: 20}}/>
                    }
                </TouchableOpacity>
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
       <View style={{paddingHorizontal: 8}}>
        <Text style={{fontSize: 20 , marginVertical: 7}}>{single?.company.toUpperCase()}</Text>
        <Text style={{fontSize: 20 , marginVertical: 7}}>{single?.name}</Text>
        <View style={{display: 'flex' , flexDirection: 'row' , alignItems: 'center'}}>
        <Image source={require("../../icons/star.png")} style={{width: 25 , height: 25, marginRight: 10 }}/>
        <Text>{single?.rating}</Text>
        <Text style={{marginLeft: 14}}>{numFormat.format(single?.reviews)} Reviews</Text>
        </View>
        <View>
            <View style={{display : 'flex' , flexDirection:'row' , alignItems: 'center'}}>
            <Text style={{fontSize: 27, textDecorationLine:"line-through", fontWeight: 'bold'}}>₹{numFormat.format(parseInt(single?.price))}</Text>
            <Text style={{fontSize: 27,marginLeft: 20 ,fontWeight: 'bold'}}>₹{numFormat.format(parseInt(single?.price) - 120)}</Text>
            </View>
        </View>
        <View>
            <View style={{display : 'flex' , flexDirection:'row' , alignItems: 'center'}}>
            <Text style={{fontSize: 27, textDecorationLine:"line-through", fontWeight: 'bold'}}>₹{numFormat.format(parseInt(single?.price))}</Text>
            <Text style={{fontSize: 27,marginLeft: 20 ,fontWeight: 'bold'}}>₹{numFormat.format(parseInt(single?.price) - 120)}</Text>
            </View>
        </View>
       </View>
        
        </ScrollView>
        {/* Bottom bar  */}
        <View style={S.bottomBar}>
            <TouchableOpacity style={{display: 'flex' , alignItems: 'center', flexDirection: 'row'}}>
                <Image source={require("../../assets/shopping-bag.png")} style={{width: 25 , height: 25, marginRight: 10 }}/>
                <Text style={{fontSize: 18}}>Add to Bag</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const S = StyleSheet.create({
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff', // Set your desired background color
      borderTopWidth: 1,
      borderTopColor: '#ccc', // Set your desired border color
      flexDirection: 'row', // or 'column' depending on your design
      justifyContent: 'space-around', // Adjust as needed
      alignItems: 'center', // Adjust as needed
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
  });

export default singleProductScreen