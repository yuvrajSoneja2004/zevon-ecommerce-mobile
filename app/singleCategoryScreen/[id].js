import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import RegisterComp from '../../components/RegisterComp/RegisterComp'
import { Stack, useSearchParams } from 'expo-router'
import StackScreen from '../../components/stackScreen';
import axios from 'axios';
import Loader from '../../utils/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';

function singleidScreen() {
  const {id} = useSearchParams();

  const [products ,  setProducts] = useState({});
  const [isLoading , setIsLoading] = useState(false)
  useEffect(() => {
    const getData = async () => {
        setIsLoading(true)
        try {
            const fetchData = await axios.get(`https://purple-anemone-veil.cyclic.app/categoryProduct?type=${id === "women" ? "women-cloths&type=women-shoes&type=women-fashion&type=women-perfume" : id === "men" ? "men-clothes&type=men-fashcare&type=men-perfume&type=men-shoes" : id === "footwear" ? "women-shoes&type=men-shoes" : id === "perfumes" ? "men-perfume&type=women-perfume" : id === "tech" ? "phone&type=laptop&type=watch" : null}`);
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
        {
        isLoading ? <Loader size="large" color="#000"/> : (
            <FlatList 
            data={products}
            renderItem={({item , index}) => {
                return <ProductCard  productTitle={item?.name} productImage={item?.images[0]} productPrice={item?.price} productID={item?._id}/>
            }}
            numColumns={2}
            />
        )
     }
      
    </SafeAreaView>
  )
}

export default singleidScreen