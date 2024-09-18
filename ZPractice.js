// import { StyleSheet, Text, View } from 'react-native'
// import React, { useMemo, useState } from 'react'

// export default function ZPractice() {
//     const [add,setAdd]=useState(0)
//     const [minus,setMinus]=useState(100)


//     const multiplaction=useMemo(function multiply(){
//             console.log('*************multiply*******************')
//             return add*10
//     },[add])

//   return (
//     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>



//       <Text style={{fontSize:20}}>{add}</Text>
//             <Text onPress={()=>
//                 setAdd(add+1)
//             } style={{padding:10,backgroundColor:'green',fontSize:30,paddingHorizontal:20,color:'white'}}>+</Text>
// <Text>
// {multiplaction}
// </Text>
//       <Text onPress={()=>
//             setMinus(minus-1)
//       } style={{padding:10,backgroundColor:'red',fontSize:30,paddingHorizontal:20,color:'white'}}>--</Text>
//       <Text style={{fontSize:20}}>{minus}</Text>

//     </View>
//   )
// }

// const styles = StyleSheet.create({})