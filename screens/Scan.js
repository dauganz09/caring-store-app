import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Vibration } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {axios1} from '../utils/axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from '../utils/appStore';
import {Audio} from 'expo-av';
import Toast from 'react-native-toast-message';

export default function Scan({navigation,route}) {
    
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('');
    const [name,setName] = useState('');
    
    const [sound, setSound] = useState();
    
    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
         require('../assets/beep.mp3')
      );
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync(); }

  
    useEffect(() => {
      
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    useEffect(() => {
      AsyncStorage.getItem('employee_id').then(value => {
        setName(value);
      }).catch(err => {});

    } , []);

    React.useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);


    


   

  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      const newData = data.split(',');
      
      console.log(newData);
      console.log(name);
  
          axios.post('scanqr',{
        empid : name,
        uid : newData[0]

        
        
      }).then(res => {
        console.log(res.data)
         
            Toast.show({
                type: 'success',
                text1: 'Scan Success!',
            });
            Vibration.vibrate(1000);
            playSound();

            setTimeout(() => {
                setScanned(false);
               
            } , 3000);

            
      }).catch(err => {
        console.log(err)
      })
  
      
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>LGU-CTS</Text>
        
        <BarCodeScanner
           type={BarCodeScanner.Constants.Type.back}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            height: 600,
            width: 500,
            borderColor: 'green',
            borderWidth : 1,
            
          }}
        />
        <View style={styles.textbox}>
          <Text style={styles.welcome}>Scan QR Code </Text>
          <Text style={styles.footer}>{text}</Text>
        </View>
        
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#242F9B',
      flex: 1,
      
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading : {
      fontSize : 20,
      fontWeight : 'bold',
      color : 'white',
      
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
  