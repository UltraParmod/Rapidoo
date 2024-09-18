import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import Splash from '../screens/Splash'
import Destinaction from '../screens/Destinaction'
import ZPractice from '../../ZPractice'

const Stack=createNativeStackNavigator()
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
      {/* <Stack.Screen  name="ZPractice" component={ZPractice}/> */}

      <Stack.Screen  name="Home" component={Home}/>
      <Stack.Screen  name="Splash" component={Splash}/>
      <Stack.Screen  name="Destinaction" component={Destinaction}/>


    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})