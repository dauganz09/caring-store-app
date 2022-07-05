import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from '../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-toast-message';

export default function ChangePass({navigation}) {

    const [empid,setEmpid] = React.useState('');
    const [pass,setPass] = React.useState('');
    const [newpass,setNewpass] = React.useState('');
    const [confirmpass,setConfirmpass] = React.useState('');
    

    
    useEffect(() => {
        AsyncStorage.getItem('employee_id').then(value => {
          setEmpid(value);
        }).catch(err => {});

        AsyncStorage.getItem('pass').then(value => {
            setPass(value);
          }).catch(err => {});
  
      } , []);

    
   
    



    const changePass = async () => {
        console.log({empid,newpass});
        const res = axios.post('changePass', {
            empid : empid,
            newpass: newpass
            
        });
        const result = await res;
        console.log(result);
       
        if(!result == false){
            Toast.show({
                type: 'success',
                text1: 'Change Password Success!',
               
              });

      
        AsyncStorage.setItem('pass',newpass);

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
      
      
      <View style={styles.login_box}>
        <Text style={styles.login_text}>Old Password</Text>
        <TextInput  value={pass}   style={styles.login_input} />
        
        <Text style={styles.login_text}>New Password</Text>
        <TextInput   value={newpass}  onChangeText={setNewpass} style={styles.login_input} />
        <Text style={styles.login_text}>Confirm New Password</Text>
        <TextInput   value={confirmpass}  onChangeText={setConfirmpass} style={styles.login_input} />
        <TouchableOpacity onPress={changePass} style={styles.login_button}>
            <Text style={styles.login_button_text}>Change Password</Text>
        </TouchableOpacity>
           
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#242F9B',
        flex: 1,
        
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#EEEEEE',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

      },
      login_box : {
        display : 'flex',
        height:500,
        width : 300,
        flexDirection : 'column',
        justifyContent : 'space-evenly',
        alignItems : 'center',
       

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