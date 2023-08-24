import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Stack, useSearchParams } from 'expo-router'
import StackScreen from '../../components/stackScreen';
import axios from 'axios';
import Loader from '../../utils/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';
import {SliderBox} from 'react-native-image-slider-box';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';

function singleProductScreen() {
  const {id} = useSearchParams();

  const [products ,  setProducts] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [companyURL , setCompanyURL] = useState("");

  // user ID
  const userDetails = useSelector(state => state.userInfo);

  // theme
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);
  const [itemToAdd , setItemToAdd] = useState({})

  useEffect(() => {
    const getData = async () => {
        setIsLoading(true)
        try {
            const fetchData = await axios.get(`https://purple-anemone-veil.cyclic.app/singleProduct/${id}`);
            const res = await fetchData.data;
            console.log(res , "Caet data");
            setProducts(res);
          

        } catch (error) {
            console.log(error, "BCBCBCBCBCB")
            console.log(error)
            if(error.code === "ERR_NETWORK"){
                alert("Please connect to internet and try again :(")
            }
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

} ,[companyURL]);


useEffect(() => {
    const getUser = async () => {
        try {
            let fetchRes = await axios.get(`https://purple-anemone-veil.cyclic.app/getUserAccount/${userDetails.userEmail}`);
            console.log("fetch res man man man" , fetchRes?.data.userCart)
            setItemToAdd(fetchRes?.data.userCart)
        } catch (error) {
            
        }
    }
 getUser()   
})
console.log(companyURL , 'the com url')

let single = products[0]
// Product Images
let images = single?.images || [];
// Product Colors

let numFormat = new Intl.NumberFormat();

const [currentSelectedProductColor , setCurrentSelectedProductColor] = useState(single?.colors[0]);
const [isCartLoading , setIsCartLoading] = useState(false);
console.log(userDetails , 'Why my penis')

// Adding item to cart
const addToCart = async (PRODUCT_TO_ADD) => {
    setIsCartLoading(true)
    try {
        let postProduct = await axios.put(`https://purple-anemone-veil.cyclic.app/addToCart/${userDetails._id}` , {
           userCart: [
            ...itemToAdd,
           {
            productName: single?.name,
            productPrice: single?.price,
            productImage: single?.images[0] || "",
            productSelectedColor: currentSelectedProductColor
           }
           ]
        });

        let res =  postProduct.data;
        console.log(res , "Cart POST request data");
        if(res?.userCart){
            alert("Success!")
        }
    } catch (error) {
        console.log(error , "Error at the time of add to cart");
        alert(error)

    }
    finally {
        setIsCartLoading(false)
    }
}


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
        <Text style={{fontSize: 20 , marginVertical: 7 , color: theme.fontsCol}}>{single?.company.toUpperCase()}</Text>
        <Text style={{fontSize: 25 , marginVertical: 7 , color: theme.fontsCol}}>{single?.name}</Text>
        <View style={{display: 'flex' , flexDirection: 'row' , alignItems: 'center', marginVertical: 20}}>
        <Image source={require("../../icons/star.png")} style={{width: 25 , height: 25, marginRight: 10 }}/>
        <Text style={{color: theme.fontsCol}}>{single?.rating}</Text>
        <Text style={{marginLeft: 14 , color: theme.fontsCol}}>{numFormat.format(single?.reviews)} Reviews</Text>
        </View>
        <View>
            <View style={{display : 'flex' , flexDirection:'row' , alignItems: 'center' , marginBottom: 20}}>
            <Text style={{fontSize: 27, textDecorationLine:"line-through", fontWeight: 'bold' , color: theme.fontsCol}}>₹{numFormat.format(parseInt(single?.price))}</Text>
            <Text style={{fontSize: 27,marginLeft: 20 ,fontWeight: 'bold', color: theme.fontsCol}}>₹{numFormat.format(parseInt(single?.price) - 120)}</Text>
            </View>
            <Text style={{color: theme.fontsCol}}>Available Colors</Text>
            <View>
                <FlatList
                data={single?.colors}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={() => {
                        setCurrentSelectedProductColor(item)
                    }} style={S.selectProductColor(item , currentSelectedProductColor , index )}>
                        {/* <View style={{}}></View> */}
                    </TouchableOpacity>
                )}
                horizontal
                />
            </View>
            <Text style={{color: theme.fontsCol}}>Available Colors</Text>
            <Text style={{color: theme.fontsCol}}>Available Colors</Text>
            <Text style={{color: theme.fontsCol}}>Available Colors</Text>
            <Text style={{color: theme.fontsCol}}>Available Colors</Text>
            <Text style={{color: theme.fontsCol}}>Available Colors</Text>
            <Text style={{color: theme.fontsCol}}>Available Colors</Text>
        </View>
       </View>
        
        </ScrollView>
        {/* Bottom bar  */}
        <View style={S.bottomBar}>
            <TouchableOpacity style={{display: 'flex' , alignItems: 'center', flexDirection: 'row'}}>
               {
                !isCartLoading ? (
                    <TouchableOpacity style={{display: 'flex' , alignItems: 'center', flexDirection: 'row'}} onPress={addToCart}>
                    <Image source={require("../../assets/shopping-bag.png")} style={{width: 25 , height: 25, marginRight: 10 }}/>
                    <Text style={{fontSize: 18}}>Add to Bag</Text>
                    </TouchableOpacity>
                ) : <ActivityIndicator />
               }
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
    selectProductColor: (item , current , index) => (
        {
            borderWidth: 2,
            borderColor: item === current ? "#B977FE" : "black",
            width: 30 ,
             height: 30 ,
             backgroundColor: item ,
              borderRadius: 50,
               marginHorizontal:index === 0 ? 0 : 10 ,
               marginRight: index === 0 ? 0 : 0 ,
               marginVertical: 20
        }
    )
  });

export default singleProductScreen