import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import ImagePath from '../utils/ImagePath';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../utils/Colors';
import AppWapper from '../components/AppWapper';
import StatusBarr from '../components/StatusBarr';

export default function Splash({navigation}) {
  useEffect(()=>{
    setTimeout(()=>{
        navigation.replace('Home')
    },3000)
  },[])
  return (
    <AppWapper>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.PrimarySecondary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBarr backgroundColor={Colors.PrimarySecondary} />
        <Image
          source={ImagePath.Rapidoo}
          style={{width: responsiveWidth(100)}}
          resizeMode="center"
        />
        <Text
          style={{
            fontSize: responsiveFontSize(5),
            color: Colors.Primary,
            fontWeight: '600',
            position: 'absolute',
            bottom: responsiveScreenHeight(10),
          }}>
          ᴮⁱᵏᵉ ᵀᵉˣⁱ
        </Text>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            color: Colors.Primary,
            fontWeight: '600',
            position: 'absolute',
            bottom: responsiveScreenHeight(10),
          }}>
          𝚢𝚘𝚞𝚛 𝚠𝚊𝚢
        </Text>
      </View>
    </AppWapper>
  );
}

const styles = StyleSheet.create({});
