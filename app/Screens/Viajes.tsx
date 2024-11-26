import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../components/Header';
import { useRouter } from 'expo-router';

const Viajes: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [passengerCount, setPassengerCount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    Alert.alert("Formulario enviado, por favor espere mientras respondemos", 
    `\nTeléfono: ${phone}\nCalle: ${street}\nColonia: ${neighborhood}\nCódigo Postal: ${postalCode}\nCantidad de pasajeros: ${passengerCount}\nFecha: ${date.toLocaleDateString()}\nDescripción: ${description}\nOrigen: ${origin}\nDestino: ${destination}`);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header imageUrl="https://viajesramos.s3.us-east-2.amazonaws.com/logo.png" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          
        <Text style={styles.label}>Origen:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={origin}
              onValueChange={(itemValue) => setOrigin(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Huejutla" value="Huejutla" />
              <Picker.Item label="CDMX" value="CDMX" />
              <Picker.Item label="Monterrey" value="Monterrey" />
              <Picker.Item label="Guadalajara" value="GUadalajara" />
              <Picker.Item label="Tampico" value="Tampico" />
              <Picker.Item label="Oaxaca" value="Oaxaca" />
            </Picker>
          </View>
          <Text style={styles.label}>Destino:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={destination}
              onValueChange={(itemValue) => setDestination(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Huejutla" value="Huejutla" />
              <Picker.Item label="CDMX" value="CDMX" />
              <Picker.Item label="Monterrey" value="Monterrey" />
              <Picker.Item label="Guadalajara" value="GUadalajara" />
              <Picker.Item label="Tampico" value="Tampico" />
              <Picker.Item label="Oaxaca" value="Oaxaca" />
            </Picker>
          </View>

        
          <Text style={styles.label}>Calle:</Text>
          <TextInput
            style={styles.input}
            value={street}
            onChangeText={setStreet}
            placeholder="Ingresa tu calle"
          />
          <Text style={styles.label}>Colonia:</Text>
          <TextInput
            style={styles.input}
            value={neighborhood}
            onChangeText={setNeighborhood}
            placeholder="Ingresa tu colonia"
          />
          <Text style={styles.label}>Código Postal:</Text>
          <TextInput
            style={styles.input}
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="Ingresa tu código postal"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Cantidad de Pasajeros:</Text>
          <TextInput
            style={styles.input}
            value={passengerCount}
            onChangeText={setPassengerCount}
            placeholder="Ingresa la cantidad de pasajeros"
            keyboardType="numeric"
          />
            <Text style={styles.label}>Teléfono:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Ingresa tu teléfono"
            keyboardType="phone-pad"
          />
          <Text style={styles.label}>Fecha:</Text>
          <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          
         
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar cotización </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  dateButton: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#333',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Viajes;
