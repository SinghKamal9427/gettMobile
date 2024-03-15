import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Entypo , Octicons , MaterialIcons , FontAwesome } from '@expo/vector-icons';
import axios from 'axios';/* 
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'; */

export default function BootomSheetModalContent() {

    const dotIcons = [1,2,3]

    const Url = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
    
    const [origin , setOrigin] = useState('')
    const [destination , setDestination] = useState('')

    const [inputFields , setInputFields] = useState([
      {
        placeholder : 'Choose Location',
        value:'origin',
      },
      {
        placeholder : 'Choose Destination',
        value: 'destination',
      }
    ])


    const [inputFieldsIcons , setInputFieldsIcons] = useState([
        <MaterialIcons name="trip-origin" size={24} color="black" />,
        <Entypo name="location-pin" size={24} color="black" />
    ])

    const toggleFieldLocation = () => {
        setInputFields([...inputFields].reverse())
        setInputFieldsIcons([...inputFieldsIcons].reverse())
    }
 
    const handleSearchText = (fieldValue, val) => {
  if(fieldValue === 'origin'){
     setOrigin(val)
    }else{
      setDestination(val)
    }

  /*   try{
      const {data} = axios.post(Url, {
        params:{
          query : val,
          key: "AIzaSyCIzAKymHkOopghukYuCWV0rFy8HLhGGsk"
        }
      })
      console.log(data)
    }catch(e){
      console.error(e)
    } */
    }


    console.log(origin)
  return (
    <View className="flex-1 w-[100%]">
        <View className="px-4">
                <View className="flex-row items-center justify-center space-x-2">
                    <View className = "items-center justify-center space-y-1">
                    {inputFieldsIcons[0]}
             {dotIcons.map((_,i)=>
                <Octicons name="dot" size={10} color="black" key={i}/>
                )}
               {inputFieldsIcons[1]}
                </View>
                    <View className="space-y-4 w-[80%]">
                    {inputFields.map((field, i) =>
                    <TextInput key={i} className = "bg-transparent w-full p-4 rounded-xl border-2 border-gray-200" placeholder={field.placeholder} value={field.value === 'origin' ? origin : destination} onChangeText={(val)=>handleSearchText(field.value , val)}/>
                    )}
      </View>
      <View>
        <Pressable onPress={toggleFieldLocation}>
      <FontAwesome name="sort" size={34} color="black" />
      </Pressable>
      </View>
      </View>

    {/*   <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyCIzAKymHkOopghukYuCWV0rFy8HLhGGsk',
        language: 'en',
      }}
    /> */}
      </View>
    </View>
  )
}