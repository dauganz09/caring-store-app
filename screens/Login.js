import { StyleSheet, Text, View,TextInput, TouchableOpacity,Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {axios1} from '../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bg from '../assets/logo_caring.png';
import { useToast } from "react-native-toast-notifications";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from 'expo-linear-gradient';


export default function Login({navigation}) {
    const toast = useToast();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    
  

    const userLogin = async () => {
        const res = axios1.post('login', {
            email,
            password
        });
        const result = await res;
        console.log(result);
       
        if(!result.data == false){
          toast.show("Login Successfully!", {
            type: "success",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "slide-in",
          });
            const {data} = result;
            
              console.log(data);
            AsyncStorage.setItem('user_id',data.user_id);
            AsyncStorage.setItem('fullname',data.fullname);
            AsyncStorage.setItem('email',data.email);

            AsyncStorage.setItem('pass',data.cpass);
            AsyncStorage.setItem('isLogin',1);

            
            navigation.navigate('Dashboard')
           
        }else{
          toast.show("Invalid Credentials!", {
            type: "danger",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "slide-in",
          });
        }

    }

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('empid', jsonValue)
        } catch (e) {
          // saving error
        }
      }

      



  return (
    <SafeAreaView style={styles.container}>
      
       
       <Image 
        source = {bg}
        style = {{width : 200, height : 200,}}
         />
     
      <View style={styles.login_box}>
        <Text style={styles.login_text}>Email</Text>
        <TextInput  value={email} onChangeText={setEmail} style={styles.login_input} />
        
        <Text style={styles.login_text}>Password</Text>
        <TextInput  value={password} secureTextEntry={true} onChangeText={setPassword} style={styles.login_input} />
        <TouchableOpacity onPress={userLogin} style={styles.login_button}>
            <Text style={styles.login_button_text}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.smallText}>Dont't have an account? <TouchableOpacity onPress={()=>navigation.navigate('Signup')}><Text  style={styles.signUp}>Sign Up</Text></TouchableOpacity></Text>
           
      </View>
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : "white"
      },
      title: {
        width : '100vw',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#EEEEEE',
        textAlign : 'center',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex : 2000

      },
      login_box : {
        display : 'flex',
        height:300,
        width : 300,
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        zIndex : 2000
       

      },
      login_text:{
        fontSize : 20,
        marginTop : 5,
        fontWeight : 'bold',
        color : 'black',
        textTransform : 'uppercase',

      },
        login_input : {
            height : 60,
            width : 300,
            borderColor : '#DDDDDD',
            borderWidth : 1,
            borderRadius : 5,
            marginTop : 10,
            paddingLeft : 10,
            color : 'black',
            fontSize : 20,
            fontWeight : 'bold',
           
        },
        login_button : {
            display :'flex',
            justifyContent : 'center',
            alignItems : 'center',
            height : 70,
            width : 300,
            borderColor : 'white',
            borderWidth : 1,
            borderRadius : 5,
            marginTop : 15,
            paddingLeft : 10,
            color : 'white',
            fontSize : 20,
            fontWeight : 'bold',
            textTransform : 'uppercase',
            backgroundColor : '#4649FF',
           

        },
        login_button_text : {
            fontSize : 20,
            fontWeight : 'bold',
            color : 'white',
            textTransform : 'uppercase',

        },
        smallText : {
          marginTop : 10,
          fontSize : 16,
          fontWeight : "bold",
          color : 'black',
        },
        signUp : {
          color : "blue"
        }
})