import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { useStripe, CardField } from '@stripe/stripe-react-native';

interface CheckoutFormProps {
  onPaymentSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onPaymentSuccess }) => {
  const { confirmPayment } = useStripe();
  const [cardDetails, setCardDetails] = useState({});

  const handlePayPress = async () => {
    const billingDetails = { email: 'email@example.com' }; // Información de facturación opcional

    try {
      const { error, paymentIntent } = await confirmPayment('client_secret_from_backend', {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails,
        },
      });

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else if (paymentIntent) {
        Alert.alert('Success', 'The payment was confirmed successfully!');
        onPaymentSuccess();
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={false}
        placeholders={{ number: '4242 4242 4242 4242' }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => setCardDetails(cardDetails)}
      />
      <Button onPress={handlePayPress} title="Pay Now" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
    width: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
  },
});

export default CheckoutForm;
