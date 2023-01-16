import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Questions from './Questions';
import Profile from './Profile';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
  <Stack.Navigator initialRouteName='Profile'>
    <Stack.Screen name="Profile" component={Profile} options={{
        title : 'Profile',
        headerStyle :{backgroundColor : '#4649FF'},
        headerTitleStyle : {color : 'white'},
        headerTitleAlign : 'center'}} />
    

 </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})