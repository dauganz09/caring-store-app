import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scan from './screens/Scan';
import Login from './screens/Login';
import Home from './screens/Home';
import Signup from './screens/Signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient, QueryClientProvider} from 'react-query';

import Toast from 'react-native-toast-message';
// import AddVaccine from './screens/AddVaccine';
import ChangePass from './screens/ChangePass';

import Dashboard from './screens/Dashboard';
import { ToastProvider } from 'react-native-toast-notifications'


const Stack = createNativeStackNavigator();



export default function App() {

  const [islogin, setIslogin] = useState(false)

useEffect(()=>{
  AsyncStorage.getItem('user_id').then(value => {
    if(value !== null || value !== undefined){
      setIslogin(!islogin)
      console.log(value)
    }
  }).catch(err => {});
  

},[])


// const checkUserSignedIn = async ()=>{
      
//   try {
//      const value = await AsyncStorage.getItem('isLogin');
//      if (value == 1){
//       console.log(value)
//       setIslogin(!islogin);
//      }
   
//   } catch (error) {
//     // Error retrieving data
//   }
// }
  
  return (
    <ToastProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName={islogin ? 'Dashboard' : 'Login'}>
       <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="Scan" component={Scan}   />
      <Stack.Screen name='Dashboard' component={Dashboard} options={{headerShown: false}}    /> 
      
      <Stack.Screen name="ChangePass" component={ChangePass}  />
      <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
      {/* <Stack.Screen name="AddVaccine" component={AddVaccine}  /> */}

      
    </Stack.Navigator>
  </NavigationContainer>
  </ToastProvider>
  );
}

