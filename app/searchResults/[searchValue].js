import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useSearchParams } from 'expo-router'
import StackScreen from '../../components/stackScreen';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../../utils/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useState } from 'react';
import axios from 'axios';

export default function searchValue() {




    const {searchValue} = useSearchParams();
    const isDarkMode = useSelector(state => state.theme.isDarkMode);
    const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);

    const [isLoading , setIsLoading] = useState(false)
    const [products , setProducts] = useState([]);
    const [noProductsFound , setNoProductsFound] = useState(false)

    useEffect(() => {
        const getData = async (req , res) => {
            setIsLoading(true)
            try {
                const fetchData = await axios.get(`https://purple-anemone-veil.cyclic.app/?name=${searchValue}`);
                const res = fetchData.data;
                console.log(res)
                setProducts(res);
               
                    if(res.length === 0){
                        setNoProductsFound(true)
                    }
                
    
            } catch (error) {
                alert("error at the time of fetching data" + error);
            }
            finally {
                setIsLoading(false)
            }
        }
    getData();
    } , [])

  return (
    <SafeAreaView>
        <StackScreen />
      <Text style={{color: theme.fontsCol}}>Search results for "{searchValue}"</Text>
      <View>
        {
            isLoading ? <Loader /> : noProductsFound ? <Text>No Products Found 😞</Text> : (
                <FlatList
        data={products}
        renderItem={({item}) => (
            <ProductCard  productTitle={item?.name} productImage={item?.images[0]} productPrice={item?.price} productID={item?._id}/>
        )}
        numColumns={2}
        />
            )
        }
        </View>
    </SafeAreaView>
  )
}