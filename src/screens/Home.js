import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '../utils/Colors';
import MapView, {
  Animated,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import VectorIcon from '../utils/VectorIcon';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import {apiKey} from '../utils/Keys/Keys';
import {useNavigation} from '@react-navigation/native';
import { getDistance } from 'geolib';

export default function Home({route}) {
  const destination = route?.params?.details;
  const fromMetersTokms=route?.params?.fromMetersTokms

  const geometry = destination?.geometry;
  const location = geometry?.location;
  const latitude = location?.lat;
  const longitude = location?.lng;

  const [isRideSelected,setRideSelected]=useState(false)
  const [captain,setCaptain]=useState([])
  const [rideData,setrideData]=useState([])

  

  // ############################
  console.log(captain,'-----------caption')
  const captainData=[
    {id:1,lat:37.3821571,long:-122.0923715,name:'Person 1'},
    {id:2,lat:37.3887415,long:-122.0923717,name:'Person 2'},
    {id:3,lat:37.3827878,long:-122.077937,name:'Person 3'},
    {id:4,lat:37.3782852,long:-122.0866501,name:'Person 4'},
    {id:5,lat:37.3770582,long:-122.0816042,name:'Person 5'},


  ]

  const formatted_address = destination?.formatted_address;

  // console.log(destination,'destincation from Home')
  console.log(latitude, longitude, 'destincation from Home', formatted_address);

  const navigation = useNavigation();
  const mapRef = useRef();
  const [userLocation, setUserLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  // console.log('Parmod Location',userLocation)
  const [origin, setOrigin] = useState(null);
  useEffect(() => {
    const getLocation = async () => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 50000,
        maximumAge: 10000,
      })
        .then(async location => {
          console.log(location, 'Current Loaction');
          setUserLocation({
            latitude: location.latitude,
            longitude: location.longitude,
          });
          if (mapRef) {
            mapRef.current.animateToRegion({
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }
          // const {data}=await axios.get()
          const {data} = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${apiKey}`,
          );
          // console.log('Parmod kumar address...',data.results[0].formatted_address)
          console.log(
            'data.results[0].formatted_address',
            data.results[0].formatted_address,
          );
          setOrigin(data.results[0].formatted_address);
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (longitude && latitude) {
      const coordinate = [
        {latitude: userLocation?.latitude, longitude: userLocation?.longitude},
        {latitude: latitude, longitude: longitude},
      ];
      mapRef.current.fitToCoordinates(coordinate, {
        edgePadding: {top: 50, left: 50, right: 50, bottom: 50},
        animated: true,
      });
    }
  }, [longitude, latitude, userLocation]);

  const coordinate = [
    {latitude: userLocation?.latitude, longitude: userLocation?.longitude},
    {latitude: latitude, longitude: longitude},
  ];

  const handleGetCaptain=({title,getRiderModePrice})=>{
    // console.log(title + " " + getRiderModePrice)
    setrideData({title:title,getRiderModePrice:getRiderModePrice})
    let closedCaptain=null
    let minDistance=Infinity
    captainData.forEach(captain=>{
      const distacne=getDistance({latitude:captain.lat,longitude:captain.long},
        {latitude:userLocation?.latitude,longitude:userLocation?.longitude},

       
      )
      if(distacne<minDistance){
            minDistance=destination
            closedCaptain=captain
      }
      console.log(closedCaptain,"closed caption.............")
    })
    setRideSelected(true)
    setCaptain(closedCaptain)
  }


  const getOtp=()=>{
    const otp=Math.floor(Math.random()*900)+1000
    return otp.toString()
  }
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <View style={{flex: 0.7}}>
        {/* ####################################### */}
        <MapView
          ref={mapRef}
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={false}
          showsMyLocationButton={false}
          initialRegion={{
            latitude: userLocation ? userLocation?.latitude : 37.78825,
            longitude: userLocation ? userLocation?.longitude : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: userLocation?.latitude,
              longitude: userLocation?.longitude,
            }}
          />

          {longitude && latitude && (
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              pinColor="green"
            />
          )}
          {
            captainData && captainData.map((item,index)=>(
              <Marker
              key={index}
              coordinate={{
                latitude: item?.lat,
                longitude: item?.long,
              }}
              pinColor="yellow"
            />
            ))
          }
          {longitude && latitude && (
            <Polyline
              coordinates={coordinate}
              strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={[
                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              ]}
              strokeWidth={1.3}
            />
          )}
        </MapView>
        {/* ######################################### */}
        <View
          style={{
            position: 'absolute',
            top: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(2),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.White,
              width: responsiveWidth(10),
              height: responsiveWidth(10),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: responsiveWidth(10),
              borderWidth: 0.5,
              borderColor: 'rgba(0,0,0,.5)',
            }}
            onPress={() => {
              Alert.alert('ALertt ');
            }}>
            <VectorIcon
              type={'Ionicons'}
              name={'menu'}
              size={27}
              color={Colors.Black}
            />
          </TouchableOpacity>

          <View
            style={{
              paddingHorizontal: responsiveWidth(2),
              backgroundColor: Colors.White,
              borderWidth: 0.5,
              borderColor: 'rgba(0,0,0,.5)',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: responsiveWidth(2),
              borderRadius: 30,
            }}>
            <VectorIcon
              type={'Entypo'}
              name={'circle'}
              size={18}
              color={'green'}
            />

            <TextInput
              value={origin ? origin : ' A-186 Shiv Vihar Delhi 110094 '}
              placeholder="Search..."
              placeholderTextColor={Colors.Black}
              style={{
                flex: 1,
                paddingVertical: responsiveScreenHeight(0.7),
                color: Colors.Black,
                fontSize: responsiveFontSize(1.9),
                marginLeft: responsiveWidth(1),
              }}
            />
            <TouchableOpacity
              onPress={() => {
                Alert.alert('ALertt ');
              }}>
              <VectorIcon
                type={'Ionicons'}
                name={'menu'}
                size={30}
                color={Colors.Black}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{backgroundColor: Colors.White, flex: 0.4}}>
        <View
          style={{
            backgroundColor: 'lightgray',
            padding: responsiveWidth(2),
            flex: 1,
            marginHorizontal: responsiveScreenWidth(4),
            marginVertical: responsiveScreenWidth(6),
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Destinaction');
            }}
            activeOpacity={0.8}
            style={{
              borderRadius: 10,
              borderWidth: 0.7,
              borderColor: 'rgba(0,0,0,.1)',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: responsiveWidth(1),
              backgroundColor: Colors.White,
            }}>
            <VectorIcon
              type={'Ionicons'}
              name={'search'}
              size={27}
              color={Colors.Black}
            />
            <TextInput
              editable={false}
              placeholder="Where are you going ? "
              placeholderTextColor={Colors.Gray}
              value={formatted_address}
              style={{
                color: Colors.Black,
                fontSize: responsiveFontSize(2),
                flex: 1,
                paddingVertical: responsiveHeight(1),
                paddingVertical: responsiveHeight(0.7),
              }}
            />
          </TouchableOpacity>
          {
            longitude&&latitude&& !isRideSelected &&(            <View style={{
              // flexDirection:'row',justifyContent:'space-between',
              padding:10}}>
              <RiderOption name={'bicycle'} title={'Bike'} fromMetersTokms={fromMetersTokms} onpress={handleGetCaptain}/>
              <RiderOption name={'car-sport-sharp'} title={'Car'} fromMetersTokms={fromMetersTokms} onpress={handleGetCaptain}/>
              <RiderOption name={'car'} title={'Auto'} fromMetersTokms={fromMetersTokms} onpress={handleGetCaptain}/>

  
            </View>
            )
          } 

{
  isRideSelected && 
  <View>
    <Text style={{textAlign:'center',fontSize:responsiveFontSize(2.5),color:Colors.Black,fontWeight:'600'}}>Ride Assigned to: {captain?.name}</Text>
    <Text style={{textAlign:'center',fontSize:responsiveFontSize(2.5),color:Colors.Black,fontWeight:'600'}}>Ride Price: $ {rideData?.getRiderModePrice}</Text>
    <Text style={{textAlign:'center',fontSize:responsiveFontSize(2.5),color:Colors.Black,fontWeight:'600'}}>Ride mode: {rideData?.title}</Text>
    <Text style={{textAlign:'center',fontSize:responsiveFontSize(2.5),color:Colors.Black,fontWeight:'600'}}>Ride Otp: {getOtp()}</Text>



    </View>
}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

const RiderOption = ({title, onpress, name,fromMetersTokms}) => {
  const getRiderModePrice=()=>{
    if(title=='Bike'){
      return Math.round(9*fromMetersTokms)
    }else if(title=='Car'){
      return Math.round(25*fromMetersTokms)
    }else if(title=='Auto'){
      return Math.round(20*fromMetersTokms)

    }
  }
  return (
    <TouchableOpacity
    onpress={()=>onpress({title:title,getRiderModePrice:getRiderModePrice})}
      style={{
       backgroundColor:Colors.White,
       margin:5,
       borderRadius:10,
       paddingHorizontal:10,
       flexDirection:'row',
       alignItems:'center',
       gap:10,
       padding:10,
       justifyContent:'space-between'
      }}>
       <View style={{flexDirection:'row',alignItems:'center',gap:10,}}>
          <VectorIcon 
          name={name} 
          type={'Ionicons'}
          size={20}
          color={Colors.Gray}
          />
         <Text style={{color:Colors.Gray,fontSize:responsiveFontSize(2)}}>{title}</Text>

        </View>
         <Text style={{color:Colors.Gray,fontSize:responsiveFontSize(2)}}>$ {getRiderModePrice()?getRiderModePrice():'00'}</Text>
      </TouchableOpacity>
  );
};
