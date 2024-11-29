import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import axios from 'axios';

const ConfirmacionCompraScreen: React.FC = () => {
  const router = useRouter();
  const { origen, destino, fecha, hora, precio, asientoSeleccionado, fk_usuario, Cantidad_Boletos, fk_viajes } = useLocalSearchParams();
  const numericPrice = parseFloat(precio); // Convertir precio a número
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  const handleConfirmarCompra = async () => {
    // Verificar que el precio sea un número válido
    if (isNaN(numericPrice) || numericPrice <= 0) {
      Alert.alert("Error", "El precio es inválido. Por favor, verifica el precio de tu compra.");
      return;
    }

    console.log("Precio antes de la solicitud:", numericPrice);

    try {
      setIsLoading(true);  // Activa el indicador de carga
      // Crear un intento de pago en tu backend
      const response = await axios.post(`https://back-end-siveth-g8vc.vercel.app/api/create-paymet-modal`, {
        amount: numericPrice * 100, // Asegurarse de que amount sea un número válido
      });

      const { client_secret } = response.data;
      console.log(client_secret);

      // Inicializa el Payment Sheet
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        merchantDisplayName: 'Viajes especiales ramos',
      });
      if (initError) throw initError;

      // Presenta el Payment Sheet
      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) throw paymentError;

      // Datos para el registro de la compra
      const data = {
        fk_usuario,
        Cantidad_Boletos,
        fk_viajes,
        Asiento: asientoSeleccionado,
        total: numericPrice * 100,
        session_id: client_secret.split('_secret')[0],
      };

      // Enviar los datos de la compra al backend
      await axios.post(`https://back-end-siveth-g8vc.vercel.app/api/register-paymet-modal`, data);
      Alert.alert('Compra realizada con éxito!');
      setIsPaymentConfirmed(true);
      setTimeout(() => {
        setIsPaymentConfirmed(false);
        router.push('Screens/Boletos');
      }, 3000);
    } catch (error) {
      console.error("Error durante el proceso de pago:", error);
      Alert.alert("Error durante el proceso de pago. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);  // Desactiva el indicador de carga
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={36} color="#1E90FF" />
        </View>
      )}
      <View style={styles.card}>
        <Text style={styles.title}>Confirmación de Compra</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Origen:</Text>
          <Text style={styles.infoValue}>{origen}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Destino:</Text>
          <Text style={styles.infoValue}>{destino}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Fecha:</Text>
          <Text style={styles.infoValue}>{fecha}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Hora:</Text>
          <Text style={styles.infoValue}>{hora}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Precio:</Text>
          <Text style={styles.infoValue}>${numericPrice}</Text> {/* Formatear precio */}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Asiento Seleccionado:</Text>
          <Text style={styles.infoValue}>{asientoSeleccionado}</Text>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmarCompra} disabled={isLoading}>
          <Text style={styles.confirmButtonText}>Confirmar Compra</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isPaymentConfirmed}>
        <View style={styles.modalContent}>
          <LottieView
            source={require('../../assets/checkmark.json')}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
          <Text style={styles.modalText}>¡Compra Confirmada!</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  lottie: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#32CD32',
  },
});

export default ConfirmacionCompraScreen;
