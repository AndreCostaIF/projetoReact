import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, WebView } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';


import Apod from './apod';
import Login from './login';

Icon.loadFont();

const mainNavigation = createMaterialBottomTabNavigator(
  {
    Apod: {
      screen: Apod,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon name="rocket" size={20} color={focused ? '#fff' : '#ddd'} />
        ),
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon name="lock" size={20} color={focused ? '#fff' : '#ddd'} />
        ),
      }),
    },
  },
  {
    barStyle: {
      backgroundColor: '#7159c1',
    },
  },
);

export default createAppContainer(mainNavigation);

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#000',
    alignItems:'center',
    justifyContent:'center',
  },
  text:{
    color:'#fff',
    fontSize:15,
    padding:10
 }
});   






 

