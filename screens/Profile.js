import { SafeAreaView, StyleSheet, Text,Image, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {

  const [fullname,setFullname] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('fullname').then(value => {
      if(value !== null || value !== undefined){
        setFullname(value)
        console.log(value)
      }
    }).catch(err => {});

    AsyncStorage.getItem('email').then(value => {
      if(value !== null || value !== undefined){
        setEmail(value)
        console.log(value)
      }
    }).catch(err => {});

    AsyncStorage.getItem('pass').then(value => {
      if(value !== null || value !== undefined){
        setPassword(value)
        console.log(value)
      }
    }).catch(err => {});
  
    
  }, [])
  
  

  return (
    <SafeAreaView style={{flex : 1}}>
      <View style={{display: 'flex',flexDirection : 'row',justifyContent:'center',alignItems:'center'}}>
       <Image 
        source = {'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'}
        style = {{width : '200px', height : '200px'}}
         />
         </View>
         <View style={{width: '100%',height: 2,backgroundColor: 'black'}}></View>
         <View style={{width: '100%',display: 'flex',flexDirection : 'row',justifyContent:'space-evenly',alignItems:'center',marginBottom:10}}>
            <Text style={{fontSize: 20}}>Name: </Text>
            <Text style={{fontSize: 20}}>{fullname}</Text>
          </View>

          <View style={{width: '100%',display: 'flex',flexDirection : 'row',justifyContent:'space-evenly',alignItems:'center',marginBottom:10}}>
            <Text style={{fontSize: 20}}>Email: </Text>
            <Text style={{fontSize: 20}}>{email}</Text>
          </View>
          <View style={{width: '100%',display: 'flex',flexDirection : 'row',justifyContent:'space-evenly',alignItems:'center',marginBottom:10}}>
            <Text style={{fontSize: 20}}>Password: </Text>
            <Text style={{fontSize: 20}}>{password}</Text>
          </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})