import { CardField, CardFieldInput, useStripe } from '@stripe/stripe-react-native';
import UseStore from '../components/store/useStore';
import { ActivityIndicator, View } from 'react-native';

export default function PaymentScreen() {

  const {setCardInfo , loaderCard} = UseStore();
    const { confirmPayment } = useStripe();

    const handleCardInput = (cardDetails) => {
      if(cardDetails.complete){
        setCardInfo(cardDetails)
      }else{
        setCardInfo(null)
      }
    }

    return (
      <View className = "flex-1 px-4 bg-white">
        <CardField
      postalCodeEnabled={false}
      placeholders={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderRadius: 8,
        fontSize: 14,
        fontFamily: 'Macondo-Regular',
      }}
      style={{
        width: '100%',
    height: 50,
    marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        handleCardInput(cardDetails)
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
    {loaderCard &&  <ActivityIndicator size="large" />}
    </View>
    );
  }


