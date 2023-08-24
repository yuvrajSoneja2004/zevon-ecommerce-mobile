import { View, Text, SafeAreaView, ScrollView, TextInput, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import StackScreen from '../components/stackScreen'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import axios from 'axios';
import Loader from '../utils/Loader';
import { useRouter } from 'expo-router';

export default function searchScreen() {

    const isDarkMode = useSelector(state => state.theme.isDarkMode);
    const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);
    const [isLoading , setIsLoading] = useState(false)
    const [products , setProducts] = useState([]);
    const [searchInput , setSearchInput] = useState("");
    const navigate = useRouter();


    useEffect(() => {
        const getData = async (req , res) => {
            setIsLoading(true)
            try {
                const fetchData = await axios.get("https://purple-anemone-veil.cyclic.app/sale");
                const res = fetchData.data;
                console.log(res)
                setProducts(res);
    
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
    <SafeAreaView style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
        <StackScreen />
       <View style={{width: '90%', paddingVertical: 30, borderRadius: 5, display: 'flex' , flexDirection: 'row' ,alignItems: 'center'}}>
       <TextInput  style={S.input} numberOfLines={1} maxLength={40} placeholder='Search Products' value={searchInput} onChangeText={(text) => {setSearchInput(text)}}/>
       <TouchableOpacity style={{backgroundColor:'#fff' , height:'100%', width: 40, borderTopRightRadius: 10, borderBottomRightRadius: 10, }} onPress={() => {navigate.push(`/searchResults/${searchInput}`)}}><Image source={require("../icons/search.png")} style={{width: 22 , height: 22 }}/></TouchableOpacity>
       </View>
      <ScrollView>
        <Text style={{color:theme.fontsCol , fontSize: 24, marginVertical: 30, paddingLeft: 20}}>People also Buy</Text>
        <View>
        {
            isLoading ? <Loader /> : (
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
      </ScrollView>
    </SafeAreaView>
  )
}


const S = StyleSheet.create({
    input: {
        width: '90%',
        height: 47,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        paddingTop: 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        fontFamily: "Roboto",
        backgroundColor: '#ebebeb'
    }
})