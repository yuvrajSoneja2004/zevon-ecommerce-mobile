import { View, Text, StyleSheet, ImageBackground  , TextInput, Button, SafeAreaView, TouchableOpacity, Image, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { globalTheme } from '../../utils/theme';
import { useRouter } from 'expo-router';
import { baseServerUrl } from '../../utils/baseServerUrl';
import axios from 'axios';

export default function RegisterComp() {

const [isPassVisible , setIsPassVisible] = useState(false);
const [isLoginComponentVisible , setIsLoginComponentVisible] = useState(true);
const navigate = useRouter();


// Input States
const [userName , setUserName] = useState("");
const [userEmail , setUserEmail] = useState("");
const [userPass , setUserPass] = useState("");
const [conformUserPass , setConformUserPass] = useState("");


const [isLoading , setisLoading] = useState(false)




// Send Data to Backend
const handleRegister = async () => {
    if(userName.length === 0 || userEmail.length === 0 || userPass.length === 0 ){
        alert("⚠️ Fill all the input fields")
    } else if (!userEmail.includes("@")) {
        alert("⚠️ Enter a valid email")
    } else if (userPass.length < 6){
        alert("⚠️ Enter atlest 6 length of password")
    } else if (userPass !== conformUserPass){
        alert("⚠️ Password and conform password fields does'nt match")
    } else {
       

        // sending data to db
    
        setisLoading(true)
      try {
        const fetchDat = await axios.post("https://purple-anemone-veil.cyclic.app/register", {
            userName: userName,
            userEmail: userEmail,
            userPass: userPass
        });
        const resD =  fetchDat.data;
        console.log(resD);
        if(resD?.res == "ok"){
            console.log("👍🏿 success");
            navigate.push("/home")
            setisLoading(false)
            

        }
      } catch (error) {
        console.log(error)
        setisLoading(false)
        alert(" 😣 Error");
      }
      
       
    }
}
const handleLogin = async () => {
    if(userEmail.length === 0 || userPass.length === 0 ){
        alert("⚠️ Fill all the input fields")
    } else if (!userEmail.includes("@")) {
        alert("⚠️ Enter a valid email")
    } else if (userPass.length < 6){
        alert("⚠️ Enter atlest 6 length of password")
    } else {
       

        // sending data to db
    setisLoading(true)

      try {
        const fetchDat = await axios.post("https://purple-anemone-veil.cyclic.app/login", {
            userEmail: userEmail,
            userPass: userPass
        });
        const resD =  fetchDat.data;
        console.log(resD);
        if(resD?.res == "ok"){
            console.log("👍🏿 success");
            navigate.push("/home")
            setisLoading(false)
        }
        else {
            alert("Account with these details does'nt exists.")
            setisLoading(false)
        }
      } catch (error) {
        console.log(error)
        setisLoading(false)

        alert("Account with these details does'nt exists.");
      }
       
    }
}

  return (
<SafeAreaView style={S.whole}>
        <ImageBackground style={S.imageBG} source={require("../../assets/register-bg.jpg")}>
            {/* Inputs  */}
        {
            isLoginComponentVisible ? (
                <View style={S.loginForm}>
          <View style={S.inputWrapper}><TextInput style={S.input} placeholder='Enter Email' value={userEmail} onChangeText={(text) => {
            setUserEmail(text)
          }}></TextInput></View>
          <View style={S.passWrapper}><TextInput style={S.inputPass} placeholder='Enter Password' value={userPass} onChangeText={(text) => {
            setUserPass(text)
          }} secureTextEntry={isPassVisible}></TextInput>
          <TouchableOpacity style={S.showPass} onPress={() => {
            setIsPassVisible(!isPassVisible)
          }}>
          {
            isPassVisible ? (
                <Image  source={require("../../icons/view.png")} style={{resizeMode: 'contain' , width: 20, height: 20}}/>
            ) : (
                <Image  source={require("../../icons/hide.png")} style={{resizeMode: 'contain' , width: 20, height: 20}}/>
            )
          }
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={S.loginBtn} onPress={handleLogin}>
            {isLoading ? <ActivityIndicator /> : <Text style={{color: '#fff'}}>Login</Text>}
          </TouchableOpacity>
          {/* Dont have an account?  */}
          <View style={S.cen}>
         <Text>Don't have an account? <Text style={{fontWeight: 'bold'}} onPress={() => {
            setIsLoginComponentVisible(false)
            setIsPassVisible(false)
         }}>Create one here!</Text></Text>
         </View>
        </View>
            ) : <View style={S.registerForm}>
            <View style={S.inputWrapper}><TextInput style={S.input} placeholder='Enter Name' value={userName} onChangeText={(text) => {
                setUserName(text)
            }}></TextInput></View>
            <View style={S.inputWrapper}><TextInput style={S.input} placeholder='Enter Email' onChangeText={(text) => {
                setUserEmail(text)
            }}></TextInput></View>
            <View style={S.passWrapper}><TextInput style={S.inputPass} placeholder='Enter Password' secureTextEntry={isPassVisible} onChangeText={(text) => {
                setUserPass(text)
            }}></TextInput>
            <TouchableOpacity style={S.showPass} onPress={() => {
              setIsPassVisible(!isPassVisible)
            }}>
            {
              isPassVisible ? (
                  <Image  source={require("../../icons/view.png")} style={{resizeMode: 'contain' , width: 20, height: 20}}/>
              ) : (
                  <Image  source={require("../../icons/hide.png")} style={{resizeMode: 'contain' , width: 20, height: 20}}/>
              )
            }
            </TouchableOpacity>
            </View>
            <View style={S.passWrapper}><TextInput style={S.inputPass} placeholder='Conform Password' secureTextEntry={isPassVisible} onChangeText={(text) => {
                setConformUserPass(text)
            }}></TextInput>
            <TouchableOpacity style={S.showPass} onPress={() => {
              setIsPassVisible(!isPassVisible)
            }}>
            {
              isPassVisible ? (
                  <Image  source={require("../../icons/view.png")} style={{resizeMode: 'contain' , width: 20, height: 20}}/>
              ) : (
                  <Image  source={require("../../icons/hide.png")} style={{resizeMode: 'contain' , width: 20, height: 20}}/>
              )
            }
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={S.loginBtn} onPress={handleRegister}>
              <Text style={{color: '#fff'}}>Create Account</Text>
            </TouchableOpacity>
            {/* Dont have an account?  */}
            <View style={S.cen}>
           <Text>Already  have an account? <Text style={{fontWeight: 'bold'}} onPress={() => {
            setIsLoginComponentVisible(true)
            setIsPassVisible(false)
            setUserEmail("");
            setUserName("");
            setUserPass("");
           }}>Login Here!</Text></Text>
           </View>
          </View>
        }
        </ImageBackground>
    </SafeAreaView>
  )
}

const S = StyleSheet.create({
    showPass : {
        backgroundColor: globalTheme.buttons,
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%', // Adjust the width as needed
    height: '100%',
    },
    passTxt: {
        padding:2
    }
    ,

    passWrapper: {
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        marginTop: 10,
        marginBottom: 10
    }
,
    whole: {
        flex: 1,
    },
    cen : {
textAlign: 'center',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
marginTop: 20
    }
    ,
    imageBG: {
        flex: 1,
        justifyContent: 'flex-end',
    alignItems: 'flex-end',
    },
    loginForm: {
        width: '100%',
        backgroundColor: '#F0EEF1',
        height: 300,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
       
        
    },
    registerForm: {
        width: '100%',
        backgroundColor: '#F0EEF1',
        height: 450,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
       
        
    },
    inputWrapper: {
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        marginTop: 10,
        marginBottom: 10
    },
    input: {
        width: '100%',
        height: '100%',
        paddingTop: 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        fontFamily: "Roboto",
        backgroundColor: '#fff'
    },
    inputPass: {
        width: '90%',
        height: '100%',
        paddingTop: 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        fontFamily: "Roboto",
        backgroundColor: '#fff'
    },
    loginBtn: {
        backgroundColor: '#111111',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,

    }
})