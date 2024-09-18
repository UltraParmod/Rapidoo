import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import VectorIcon from '../utils/VectorIcon';
import Colors from '../utils/Colors';
import StatusBarr from '../components/StatusBarr';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { apiKey } from '../utils/Keys/Keys';
import { getDistance } from 'geolib';

export default function Destinaction({route}) {
  const navigation=useNavigation()

  const userLocation=route?.params?.userLocation
  const {latitude,longitude}=userLocation
  console.log(latitude,longitude,"from origin")
  
   const handlePlaceClick=(data,details=null)=>{
    const {geometry}=details
    if (getDistance && geometry.location) {
        const {lat:destLat,Ing:destLong}=geometry.location
        const distance=getDistance({latitude:latitude,longitude:longitude},{
          latitude:destLat,longitude:destLong
        })
        // console.log(distance/1000,"kms")
        const fromMetersTokms=distance/1000
        if(fromMetersTokms<50){
          navigation.navigate('Home',{details,fromMetersTokms})
        }else{
          Alert.alert("The destincation is too far way ")
        }
    } 
   }
  return (
    <View style={{flex:1,backgroundColor:Colors.White}}>
      <StatusBarr backgroundColor={Colors.White} barStyle='dark-content'/>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>{
          navigation.goBack()
        }}>
        <VectorIcon 
          name={'chevron-back'}
          type={'Ionicons'}
          color={Colors.Black}
          size={30}
        />

        </TouchableOpacity>
        <Text style={{color:Colors.Black,fontSize:responsiveFontSize(2.5),fontWeight:'600'}}>Select Destination</Text>
        <Text></Text>
      </View>

{/* <View style={{borderWidth:.5,backgroundColor:'red'}}> */}
<GooglePlacesAutocomplete
      placeholder='Search'
      // onPress={(data, details = null) => {
      //   // 'details' is provided when fetchDetails = true
      //   navigation.navigate('Home',{details})
      //   console.log(data, details);
      // }}
      onPress={handlePlaceClick}
      styles={{
        textInputContainer: {
         width:'94%',
         alignSelf:'center',
         marginVertical:responsiveHeight(1)
        },
        textInput: {
          backgroundColor: 'whiteSmoke',
          borderWidth:.5,
          borderColor:'rgba(0,0,0,.5)',
          fontSize:responsiveFontSize(2),
         height:responsiveHeight(5.5)

        },
      }}
    
    
      query={{
        key: apiKey,
        language: 'en',
      }}
      fetchDetails
    />
</View>
   
    // </View>
  )
}

const styles = StyleSheet.create({})