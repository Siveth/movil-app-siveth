// src/PaymentForm.tsx

import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import CheckoutForm from '../../components/CheckoutForm';

const PaymentForm: React.FC = () => {
  return (
    <StripeProvider publishableKey="pk_test_51PXpEyRsGpfyuevyAhGAnrDeVK6M8yeOUyIrcZsNA5dBUQWhMzVyPcFM042J30FJJdAlEX9fHUqOrKeimmrpDUTX00pZE2B86t">
      <CheckoutForm />
    </StripeProvider>
  );
};

export default PaymentForm;
