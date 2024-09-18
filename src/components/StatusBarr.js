import { StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'

export default function StatusBarr({backgroundColor,barStyle}) {
  return (
    <StatusBar
    barStyle={barStyle?barStyle:"light-content"} 
    backgroundColor={backgroundColor?backgroundColor:Colors.Primary} 
  />
  )
}

const styles = StyleSheet.create({})