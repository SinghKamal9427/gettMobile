import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from '../../screens/payement';

export default function CardIndex() {
  return (
    <StripeProvider
    publishableKey="pk_test_51Op6rrSBnSkQvK6c0JT9Teu0PWYQm3vy6yB4QH9GoCc9YpnZzspTkA5p1HL1PBBH8j7R4iodFP3D1EfrHshzAI4X00ce8Ai16i"
  >
    <PaymentScreen/>
  </StripeProvider>
  )
}
