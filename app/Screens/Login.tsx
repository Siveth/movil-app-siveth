import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import Axios from 'axios';
import { useRouter } from 'expo-router';

export default function Login({ title }: { title: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [disableButton, setDisableButton] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (attemptCount >= 3) {
      setDisableButton(true);
      setTimeLeft(30);
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [attemptCount]);

  useEffect(() => {
    if (timeLeft === 0) {
      setDisableButton(false);
      setAttemptCount(0);
    }
  }, [timeLeft]);

  const handleSubmit = async () => {
    const isValidPassword = password.length >= 8;
    setPasswordValid(isValidPassword);
    if (!isValidPassword || password.trim() === '') {
      return;
    }
    try {
      const loginResponse = await Axios.post(
        'https://back-end-siveth-g8vc.vercel.app/api/logueo',
        {
          correo: email,
          contrasenia: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const responseData = loginResponse.data;
      if (loginResponse.status === 200 && responseData.status === 'success') {
        router.push(responseData.redirectUrl);
      } else {
        Alert.alert('Error', 'Error en el inicio de sesión.');
      }
    } catch (error) {
      Alert.alert('Error', 'Inicio de sesión fallido.');
      setAttemptCount((prevCount) => prevCount + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Iniciar sesión</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={[styles.input, !emailValid && styles.inputError]}
              placeholder="correo, usuario, telefono"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            {!emailValid && (
              <Text style={styles.errorText}>Correo electrónico inválido</Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <View style={styles.flexBetween}>
              <Text style={styles.label}>Contraseña</Text>
              <TouchableOpacity onPress={openModal}>
                <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.input, !passwordValid && styles.inputError]}
              placeholder="****"
              secureTextEntry={!showPwd}
              value={password}
              onChangeText={setPassword}
              onKeyDown={handleKeyDown}
            />
            {!passwordValid && (
              <Text style={styles.errorText}>La contraseña debe tener al menos 8 caracteres</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, disableButton && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={disableButton}
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>¿Aún no tienes una cuenta?{' '}
              <TouchableOpacity onPress={() => router.push('/Registro')}>
                <Text style={styles.signupLink}>Regístrate Aquí</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  forgotPassword: {
    color: '#1E90FF',
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  signupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#555',
    fontSize: 14,
  },
  signupLink: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
