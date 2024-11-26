import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Button } from 'react-native';
import Modal from 'react-native-modal';
import { useRouter, useLocalSearchParams } from 'expo-router';

const asientos = Array(40).fill(null).map((_, index) => ({
  id: index + 1,
  ocupado: Math.random() > 0.7, // Simula asientos ocupados aleatoriamente
}));

const SeleccionAsientoScreen = () => {
  const router = useRouter();
  const { viaje } = useLocalSearchParams();
  const viajeData = JSON.parse(viaje);
  const [asientoSeleccionado, setAsientoSeleccionado] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSeleccionarAsiento = (asiento) => {
    if (asiento.ocupado) {
      Alert.alert('Asiento Ocupado', 'Este asiento ya está ocupado. Por favor, selecciona otro.');
    } else {
      setAsientoSeleccionado(asiento.id);
      setModalIsOpen(true);
    }
  };

  const confirmarAsiento = () => {
    setModalIsOpen(false);
    router.push({
      pathname: 'Screens/Confirmacion',
      params: { 
        ...viajeData,
        asientoSeleccionado
      }
    });
  };

  const renderRow = (startIndex) => (
    <View style={styles.row}>
      {asientos.slice(startIndex, startIndex + 2).map((asiento) => (
        <TouchableOpacity
          key={asiento.id}
          style={[
            styles.asiento,
            asiento.ocupado && styles.asientoOcupado,
            asiento.id === asientoSeleccionado && styles.asientoSeleccionado,
          ]}
          onPress={() => handleSeleccionarAsiento(asiento)}
        >
          <Text style={styles.asientoText}>{asiento.id}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.pasillo} />
      {asientos.slice(startIndex + 2, startIndex + 4).map((asiento) => (
        <TouchableOpacity
          key={asiento.id}
          style={[
            styles.asiento,
            asiento.ocupado && styles.asientoOcupado,
            asiento.id === asientoSeleccionado && styles.asientoSeleccionado,
          ]}
          onPress={() => handleSeleccionarAsiento(asiento)}
        >
          <Text style={styles.asientoText}>{asiento.id}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Selecciona tu Asiento</Text>
      <View style={styles.busContainer}>
        {Array(Math.ceil(asientos.length / 4)).fill().map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {renderRow(rowIndex * 4)}
          </React.Fragment>
        ))}
      </View>

      <Modal isVisible={modalIsOpen} onBackdropPress={() => setModalIsOpen(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>¿Confirmar Asiento {asientoSeleccionado}?</Text>
          <Button title="Confirmar" onPress={confirmarAsiento} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  busContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  pasillo: {
    width: 20, // Espacio para el pasillo
  },
  asiento: {
    width: 50,
    height: 50,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 5,
  },
  asientoOcupado: {
    backgroundColor: '#FF6347',
  },
  asientoSeleccionado: {
    backgroundColor: '#32CD32',
  },
  asientoText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default SeleccionAsientoScreen;
