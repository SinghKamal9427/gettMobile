import { View, Text, Dimensions } from "react-native";
import {
  CountryButton,
  CountryPicker,
} from "react-native-country-codes-picker";
import React, { useState } from "react";
import UseStore from "../../components/store/useStore";

function ListHeaderComponent({ countries, lang, onPress }) {
  return (
    <View
      style={{
        marginBottom: 10,
        paddingBottom: 10,
      }}
      className="border-b-2 border-gray-200"
    >
      {countries?.map((country, index) => {
        return (
          <CountryButton
            key={index}
            item={country}
            name={country?.name?.[lang || "en"]}
            onPress={() => onPress(country)}
          />
        );
      })}
    </View>
  );
}

const { height } = Dimensions.get("window");

export default function CountryCode({navigation}) {

  const [modalToggle, setModalToggle] = useState(true)
    const { setCountryCode } = UseStore()

    const hanldePickerButton = async (item) => {
      setModalToggle(false)
       await setCountryCode(item.dial_code)
       navigation.navigate('welcomeSignup');
    }

  return (
    <View className="flex-1 bg-white pt-4">
      <CountryPicker
        show={modalToggle}
        disableBackdrop={true}
        inputPlaceholder="Search Country"
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={hanldePickerButton}
        enableModalAvoiding={false}
        style={{
          // Styles for whole modal [View]
          modal: {
            borderRadius: 0,
            top: 50,
            height: "100%",
            display: "block",
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            elevation: 0,
          },
          // Styles for modal backdrop [View]
          backdrop: {},
          // Styles for bottom input line [View]
          line: {
            display: "none",
          },
          // Styles for list of countries [FlatList]
          itemsList: {
            marginTop: 10,
          },
          // Styles for input [TextInput]
          textInput: {
            height: 50,
            borderRadius: 10,
            paddingLeft: 10,
          },
          // Styles for country button [TouchableOpacity]
          countryButtonStyles: {
            overflow: "hidden",
            flexDirection: "column-reverse",
            alignItems: "flex-start",
            height: "auto",
          },
          // Styles for search message [Text]
          searchMessageText: {},
          // Styles for search message container [View]
          countryMessageContainer: {},
          // Flag styles [Text]
          flag: {
            display: "none",
          },
          // Dial code styles [Text]
          dialCode: {
            color: "gray",
          },
          // Country name styles [Text]
          countryName: {},
        }}
        ListHeaderComponent={ListHeaderComponent}
        popularCountries={["gb", "il"]}
      />
    </View>
  );
}
