import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView,TouchableOpacity, Alert  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native';

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [usuario, setUsuario] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [repetirContrasena, setRepetirContrasena] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [respuestaSeguridad, setRespuestaSeguridad] = useState('');
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  const [error, setError] = useState('');

  const securityQuestions = [
    { id: 1, question: "¿Cuál es tu canción favorita?" },
    { id: 2, question: "¿Cuál es el nombre de tu escuela primaria?" },
    { id: 3, question: "¿En qué ciudad naciste?" },
    { id: 4, question: "¿Cuál fue tu primer empleo?" },
    { id: 5, question: "¿Cuál es el ex que más te ha dolido?" },
  ];

  const handleSubmit = () => {
    if (!aceptarTerminos) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones.');
      return;
    }

    // Lógica de validación y envío de datos
    console.log('Datos enviados');
  };

  return (
    <SafeAreaView style={styles.container}>
        <Header imageUrl="https://viajesramos.s3.us-east-2.amazonaws.com/logo.png" />
        <ScrollView>

        
        <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta </Text>

      <View style={styles.inputGroup}>
        <Text>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Apellido Paterno</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellido Paterno"
          value={apellidoPaterno}
          onChangeText={setApellidoPaterno}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Apellido Materno</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellido Materno"
          value={apellidoMaterno}
          onChangeText={setApellidoMaterno}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={usuario}
          onChangeText={setUsuario}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Fecha de nacimiento</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de nacimiento"
          value={edad}
          onChangeText={setEdad}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Contraseña</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Contraseña"
          value={contrasenia}
          onChangeText={setContrasenia}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Confirmar Contraseña</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Confirmar Contraseña"
          value={repetirContrasena}
          onChangeText={setRepetirContrasena}
        />
      </View>

      <View style={styles.inputGroup}>
      <Text>Pregunta de seguridad</Text>
      <Picker
        selectedValue={selectedQuestion}
        onValueChange={(itemValue) => setSelectedQuestion(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona una pregunta de seguridad" value="" />
        {securityQuestions.map((question) => (
          <Picker.Item key={question.id} label={question.question} value={question.id} />
        ))}
      </Picker>
    </View>

      <View style={styles.inputGroup}>
        <Text>Respuesta de seguridad</Text>
        <TextInput
          style={styles.input}
          placeholder="Respuesta"
          value={respuestaSeguridad}
          onChangeText={setRespuestaSeguridad}
        />
      </View>

      <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setAceptarTerminos(!aceptarTerminos)}>
            <Text style={styles.checkbox}>
              {aceptarTerminos ? '☑' : '☐'} Acepto los términos y condiciones
            </Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.buttonContainer}>
          <Button title="Registrar" onPress={handleSubmit} />
        </View>
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    marginBottom: 15,
    padding: 15,
  },
  checkbox: {
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
   margin: 15,
    padding: 10,
    borderRadius: 5,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 5,
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
 
});

export default Registro;
