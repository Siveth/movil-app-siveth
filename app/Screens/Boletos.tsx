import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

const destinos = [
  { id: 1, name: 'Ciudad de México' },
  { id: 2, name: 'Guadalajara' },
  { id: 3, name: 'Monterrey' },
  { id: 4, name: 'Cancún' },
];

const origenes = [
  { id: 1, name: 'Ciudad de México' },
  { id: 2, name: 'Guadalajara' },
  { id: 3, name: 'Monterrey' },
  { id: 4, name: 'Cancún' },
];

const fechas = [
  { id: 1, name: '2024-04-01' },
  { id: 2, name: '2024-04-02' },
  { id: 3, name: '2024-04-03' },
  { id: 4, name: '2024-04-04' },
];

const Boletos = () => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viajes, setViajes] = useState([]);
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');

  const handleBuscarViajes = () => {
    const viajesEncontrados = [
      { origen: 'Ciudad de México', destino: 'Guadalajara', fecha: '2024-04-01', hora: '8:00 AM', precio: '$100' },
      { origen: 'Monterrey', destino: 'Guadalajara', fecha: '2024-04-01', hora: '8:00 AM', precio: '$120' },
    ];
    setViajes(viajesEncontrados);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const elegirViaje = (viaje) => {
    setModalIsOpen(false);
    router.push({
      pathname: 'Screens/Asiento',
      params: {
        viaje: JSON.stringify(viaje)
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Compra de Boletos</Text>
        <Picker
          selectedValue={origen}
          onValueChange={(itemValue) => setOrigen(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona el Origen" value="" />
          {origenes.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>

        <Picker
          selectedValue={destino}
          onValueChange={(itemValue) => setDestino(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona el Destino" value="" />
          {destinos.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>

        <Picker
          selectedValue={fecha}
          onValueChange={(itemValue) => setFecha(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona la Fecha" value="" />
          {fechas.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.searchButton} onPress={handleBuscarViajes}>
          <Text style={styles.searchButtonText}>Buscar Viajes</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={modalIsOpen} onBackdropPress={closeModal}>
        <View style={styles.modalContent}>
          <ScrollView>
            {viajes.map((viaje, index) => (
              <View key={index} style={styles.viajeItem}>
                <Text>Origen: {viaje.origen}</Text>
                <Text>Destino: {viaje.destino}</Text>
                <Text>Fecha: {viaje.fecha}</Text>
                <Text>Hora: {viaje.hora}</Text>
                <Text>Precio: {viaje.precio}</Text>
                <TouchableOpacity onPress={() => elegirViaje(viaje)} style={styles.elegirButton}>
                  <Text style={styles.elegirButtonText}>Agregar viaje</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Sombra para iOS
    shadowOpacity: 0.25, // Sombra para iOS
    shadowRadius: 3.84, // Sombra para iOS
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  searchButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  viajeItem: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 }, // Sombra para iOS
    shadowOpacity: 0.22, // Sombra para iOS
    shadowRadius: 2.22, // Sombra para iOS
  },
  elegirButton: {
    marginTop: 10,
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  elegirButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Boletos;
