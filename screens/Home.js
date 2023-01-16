import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground,StyleSheet, Text, View,Vibration,SafeAreaView,TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from '../utils/axios';
import bg from '../assets/bgimage.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from '../utils/appStore';
import Toast from 'react-native-toast-message';


export default function Home({navigation}) {

    const [vevents,setVevents] = useState([]);
   
  
    useEffect(() => {
       
     
    }, []);



    const handlePress = (id) => {
            
        navigation.navigate('Scan',{id:id});
       

    }

    
  
    
  
   
  
    return (
        <SafeAreaView style={styles.container}>
          <ImageBackground source={bg} style={styles.image}>
       
               

              <View style={styles.btnContainer}>
             

               <TouchableOpacity onPress={()=> navigation.navigate('Questions',{ name: 'Accessibility',code : 1})}  style={styles.login_button}>
                  <Text style={styles.login_button_text}>Accessibility</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=> navigation.navigate('Questions',{ name: 'Empathy',code : 2 })}  style={styles.login_button}>
                  <Text style={styles.login_button_text}>Empathy</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=> navigation.navigate('Questions',{ name: 'Response Time',code : 3 })} style={styles.login_button}>
                  <Text style={styles.login_button_text}>Response Time</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=> navigation.navigate('Questions',{ name: 'Loyal Programs',code : 4 })}  style={styles.login_button}>
                  <Text style={styles.login_button_text}>Loyal Programs</Text>
               </TouchableOpacity>

              </View>
               
              </ImageBackground>
   
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
      
      alignItems: 'center',
      
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    image: {
      width : '100%',
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    btnContainer : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-evenly',
        alignItems : 'center',
        height : 400,
       
    },  

    login_button : {
      display :'flex',
      justifyContent : 'center',
      alignItems : 'center',
      height : 100,
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
      textAlign : 'center',
      fontSize : 30,
      fontWeight : 'bold',
      color : 'white',
      textTransform : 'uppercase',

  },
    heading : {
      fontSize : 40,
      fontWeight : 'bold',
      color : 'white',
      marginBottom :40,
      
    },
    title : {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EEEEEE',
        textTransform: 'uppercase',

    },
    widgettitle : {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#EEEEEE',
        textTransform: 'uppercase',
        textAlign : 'center',

    },
    box_text : {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#EEEEEE',
        textTransform: 'uppercase',
    },
    widgets: {
        borderRadius : 20,
        backgroundColor : '#FF8C32',
       display : 'flex',   
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',
        height:  150,
        width : '80%',
        marginBottom : 15,
        paddingHorizontal: 10,
    },
    footer : {
      fontSize : 35,
      fontWeight : 'bold',
      color : '#4FBDBA',
      textTransform : 'uppercase',
      textAlign: 'center',
    },
    welcome:{
      fontSize : 30,
      fontWeight : 'bold',
      color : 'white',
      textTransform : 'uppercase',
    },
    textbox :{
      display : 'flex',
      height: 120,
      flexDirection : 'column',
      justifyContent : 'center',
      alignItems : 'center',
    }
  });
  