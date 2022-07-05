import { StyleSheet, Text, View,TextInput, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from '../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bg from '../assets/jaro.png';
import Toast from 'react-native-toast-message';
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from 'expo-linear-gradient';


export default function Login({navigation}) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    

    

    const userLogin = async () => {
        const res = axios.post('login', {
            username,
            password
        });
        const result = await res;
        console.log(result);
       
        if(!result == false){
            Toast.show({
                type: 'success',
                text1: 'Login Success!',
               
              });
            const {data} = result;
            
              console.log(data);
            AsyncStorage.setItem('employee_id',data.employee_id);
            AsyncStorage.setItem('pass',data.dpass);

            
            navigation.navigate('Home')
           
        }else{
            console.log('error');
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
      <LinearGradient 
      colors={['rgba(94,206,228,1)','rgba(0,138,255,1)','rgba(98,100,232,1)']}
      locations={[.1,.47,.83]}
      style={{height : '100vh', position : 'absolute',alignItems : 'center',justifyContent : 'center'}}
      >
       
       <Image 
        source = {bg}
        style = {{width : '100%', height : 350,position : 'absolute',top: 0,left:0}}
         />
      <Text style={styles.title}>LGU- Contract Tracing App</Text>
      <Text style={[styles.login_text,{marginBottom : 20}]}>User Login</Text>
      <View style={styles.login_box}>
        <Text style={styles.login_text}>Employee No.</Text>
        <TextInput name='empno' value={username} onChangeText={setUsername} style={styles.login_input} />
        
        <Text style={styles.login_text}>Password</Text>
        <TextInput name='pass'  value={password} secureTextEntry={true} onChangeText={setPassword} style={styles.login_input} />
        <TouchableOpacity onPress={userLogin} style={styles.login_button}>
            <Text style={styles.login_button_text}>Login</Text>
        </TouchableOpacity>
           
      </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        
        alignItems: 'center',
        justifyContent: 'center',
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
        color : '#DBDFFD',
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
            color : 'white',
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
            backgroundColor : '#646FD4',
           

        },
        login_button_text : {
            fontSize : 20,
            fontWeight : 'bold',
            color : 'white',
            textTransform : 'uppercase',

        }
})