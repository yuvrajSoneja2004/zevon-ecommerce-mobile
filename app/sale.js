import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import StackScreen from '../components/stackScreen'
import { SliderBox } from 'react-native-image-slider-box'
import { FlatList } from 'react-native'
import axios from 'axios'
import Loader from '../utils/Loader'
import ProductCard from '../components/ProductCard/ProductCard'
import { ScrollView } from 'react-native'

export default function sale() {
    const images = [
        require("../assets/sale_images/1.png"),
        require("../assets/sale_images/2.png"),
        require("../assets/sale_images/3.png"),
    ];


    // products
    const [products, setProducts] = useState([]);
    const [isLoading , setIsLoading] = useState(false);



    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            try {
                const fetchData = await axios.get("https://purple-anemone-veil.cyclic.app/sale");
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
    console.log(products)
      return (
        <SafeAreaView style={{flex: 1}}>
         <StackScreen />
           <ScrollView>
           <SliderBox  images={images} dotColor="#000" sliderBoxHeight={400} autoplay circleloop resizeMode={'cover'}/>
           {
            isLoading ? <View style={{height: 400}}><Loader size="large" color="#000"/></View> : (
                <FlatList 
                data={products}
                renderItem={({item , index}) => {
                    return <ProductCard  productTitle={item?.name} productImage={item?.images[0]} productPrice={item?.price} productID={item?._id}/>
                }}
                numColumns={2}
                />
            )
         }
           </ScrollView>
          
        </SafeAreaView>
      )
    }
    