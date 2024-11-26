import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import PaymentForm from './PaymentForm';

const ConfirmacionCompraScreen: React.FC = () => {
  const router = useRouter();
  const { origen, destino, fecha, hora, precio, asientoSeleccionado } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  const handleConfirmarCompra = () => {
    setPaymentModalVisible(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentModalVisible(false);
    setIsPaymentConfirmed(true);
    setTimeout(() => {
      setIsPaymentConfirmed(false);
      router.push('Screens/Boletos');
    }, 3000);
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.infoValue}>{precio}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Asiento Seleccionado:</Text>
          <Text style={styles.infoValue}>{asientoSeleccionado}</Text>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmarCompra}>
          <Text style={styles.confirmButtonText}>Confirmar Compra</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={paymentModalVisible} onBackdropPress={() => setPaymentModalVisible(false)}>
        <View style={styles.modalContent}>
          <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
        </View>
      </Modal>

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
