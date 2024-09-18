import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './src/routes/AppNavigator'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <NavigationContainer>
     <AppNavigator />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
