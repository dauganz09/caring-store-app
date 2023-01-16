import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground,StyleSheet, Text, View,Vibration,SafeAreaView,TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from '../utils/axios';
import bg from '../assets/bgimage.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from '../utils/appStore';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Profile from './Profile';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();


export default function Dashboard() {
  return (
    
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeStack') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else {
              iconName = focused ? 'person' : 'person-outline';
            } 
            return <Ionicons name={iconName} size={size} color="#4649FF" />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
         
        }}>
        <Tab.Screen name="HomeStack" component={HomeStack} options = {{ tabBarLabel: 'Home' }}  />
        <Tab.Screen name="ProfileStack" component={ProfileStack} options = {{ tabBarLabel: 'Profile' }}/>
        
      </Tab.Navigator>
     
    
  )
}

const styles = StyleSheet.create({})