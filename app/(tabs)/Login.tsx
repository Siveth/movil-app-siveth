    import React, { useState, useEffect } from 'react';
    import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
    import Axios from 'axios';
    import { useRouter } from 'expo-router';
    import Header from '../../components/Header';
    import { SafeAreaView } from 'react-native-safe-area-context';

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
            Alert.alert('Éxito', 'Inicio de sesión exitoso.');
            router.push(responseData.redirectUrl);
          } else {
            Alert.alert('Error', 'Error en el inicio de sesión.');
          }
        } catch (error) {
          
          Alert.alert('Error', 'Inicio de sesión fallido.');
          setAttemptCount((prevCount) => prevCount + 1);
        }
      };

      return (
        <SafeAreaView style={styles.container1}>
          <Header imageUrl="https://viajesramos.s3.us-east-2.amazonaws.com/logo.png" />
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.innerContainer}>
              <Text style={styles.title}>{title}</Text>
              <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={[styles.input, !passwordValid && { borderColor: 'red' }]}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              {!passwordValid && (
                <Text style={styles.error}>La contraseña debe tener al menos 8 caracteres</Text>
              )}
              {attemptCount >= 3 && (
                <Text style={styles.error}>Botón bloqueado por {timeLeft} segundos</Text>
              )}
              <TouchableOpacity
                style={[styles.button, disableButton && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={disableButton}
              >
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }

    const styles = StyleSheet.create({
      container1: {
        flex: 1,
        backgroundColor: '#f5f5f5',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
        
      },
      innerContainer: {
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
      },
      button: {
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        margin: 15,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 15,
      
      },
      buttonDisabled: {
        backgroundColor: '#ccc',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
      error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
      },
      scrollContainer: {
        alignItems: 'center',
        paddingVertical: 20,
      },
    }); 
