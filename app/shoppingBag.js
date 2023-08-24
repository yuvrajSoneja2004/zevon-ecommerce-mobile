import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import StackScreen from '../components/stackScreen'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../utils/Loader'
import CartCard from '../components/CartCard'
import { useRouter } from 'expo-router'

export default function shoppingBag() {
    const isDarkMode = useSelector(state => state.theme.isDarkMode);
    const theme = useSelector(state => isDarkMode ? state.theme.darkTheme : state.theme.lightTheme);
    const [isLoading , setIsLoading] = useState(false)
    const [cartItems , setCartItems] = useState([]);
    const [isCartEmpty , setIsCartEmpty] = useState(true);
    const [totalCartAmt , setTotalCartAmt] = useState(0);
      // user Info data
  const userDetails = useSelector(state => state.userInfo);
  const navigate = useRouter();
  const numFormat = new Intl.NumberFormat()



    useEffect(() => {
        const getData = async (req , res) => {
            setIsLoading(true)
            try {
                const fetchData = await axios.get(`https://purple-anemone-veil.cyclic.app/getCartData/${userDetails._id}`);
                const res = fetchData.data;
                console.log(res , 'this is cart res value');
                setCartItems(res);
               
    
            } catch (error) {
                alert("error at the time of fetching data" + error);
            }
            finally {
                setIsLoading(false)
                if(cartItems.length > 1){
                    setIsCartEmpty(false);
                }
            }
        }
    getData();
    } , [])

    const totalCartAmtFun = () => {
       
        const amount = cartItems?.userCart?.reduce((total, product) => {
            console.log(product); // Log the product to check its structure
            return total + (product?.productPrice || 0);
          }, 0);
          console.log(amount); // Log the calculated amount
          setTotalCartAmt(amount)
        
    }
//   // Adding cart amounts
useEffect(() => {
   totalCartAmtFun() 
}, [cartItems]); // Only trigger the effect when cartItems change



    console.log(cartItems?.userCart ,'this is cartitems state');

    let cartI = cartItems?.userCart;


  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 10}}>
        <StackScreen />
        <ScrollView showsVerticalScrollIndicator={false}>
           {
            !cartItems.length === 0 ? (
                <View style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center', height: Dimensions.get("window").height - 100}}>
                <Image  source={require("../assets/empty_cart.png")} style={{width: "100%" , height: 340}}/>
                <Text style={{color: theme.fontsCol, fontSize: 28}}>No items in Cart 😞</Text>
                <TouchableOpacity style={{backgroundColor: "#B977FE" , borderRadius: 5 , marginTop: 15}}>
                    <Text style={{color: theme.fontsCol , paddingVertical: 10 , paddingHorizontal: 25}}>Add Products</Text>
                </TouchableOpacity>
            </View>
            ) : !isLoading ? (
                <View>
                <FlatList
                data={cartI}
                renderItem={({item}) => (
                    <TouchableOpacity><CartCard  data={item}/></TouchableOpacity>
                )}
                />
            </View>
            ) : <View style={{height: Dimensions.get("window").height}}><Loader size={'large'} /></View>
           }
        </ScrollView>
        {/* Bottom Bar  */}
        <View style={S.bottomBar}>
            {/* left side  */}
           <View style={{display: 'flex' , alignItems: 'center',justifyContent: 'center'}}>
            <Text style={{fontSize: 22 , fontWeight: 'bold'}}>Total</Text>
            <Text style={{fontSize: 16}}>₹{numFormat.format(totalCartAmt)}</Text>
           </View>
           {/* Right Side  */}
           <TouchableOpacity style={{backgroundColor: '#B977FE' , paddingHorizontal: 50, paddingVertical: 15}}>
            <Text>Checkout</Text>
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
})