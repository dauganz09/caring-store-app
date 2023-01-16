import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Questions from './Questions';
import Results from './Results';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
  <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen name="Home" component={Home} options={{
        title : 'Share your experience to:',
        headerStyle :{backgroundColor : '#4649FF'},
        headerTitleStyle : {color : 'white'},
        headerTitleAlign : 'center'}} />
    <Stack.Screen name="Questions" component={Questions} options={({ route }) => ({ 
        title: route.params.name,
        headerStyle : {backgroundColor : '#4649FF' },
        headerTitleStyle : {color : 'white'},
        headerTitleAlign : 'center',
        headerTintColor : 'white'
 })} />
 <Stack.Screen name="Results" component={Results} options={({ route }) => ({ 
        title: route.params.name,
        headerStyle : {backgroundColor : '#4649FF' },
        headerTitleStyle : {color : 'white'},
        headerTitleAlign : 'center',
        headerTintColor : 'white',
        headerLeft: null,
 })} />

 </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})