import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
import Header from '../../components/Header';
import ImageCarousel from '../../components/Carrusel';
import InfoCard from '../../components/Cards';
import { Image } from 'expo-image';

const HomeScreen = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('https://back-end-siveth-g8vc.vercel.app/api/records');
      if (response.status === 200) {
        setRecords(response.data);
        setIsLoading(false);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
      setIsLoading(false);
    }
  };

  const cardImages = [
    'https://viajesramos.s3.us-east-2.amazonaws.com/1721802084252.jpeg',
    'https://viajesramos.s3.us-east-2.amazonaws.com/1721797996542.jpeg',
    'https://viajesramos.s3.us-east-2.amazonaws.com/image3.jpg',
    'https://viajesramos.s3.us-east-2.amazonaws.com/image4.jpg',
    'https://viajesramos.s3.us-east-2.amazonaws.com/image5.jpg',
    'https://viajesramos.s3.us-east-2.amazonaws.com/image6.jpg',
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header imageUrl="https://viajesramos.s3.us-east-2.amazonaws.com/logo.png" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageCarousel />
        {records.map((record, index) => (
          <View key={record.id} style={styles.card}>
            <Image 
              source={{ uri: cardImages[index % cardImages.length] }} 
              style={styles.cardImage} 
              resizeMode="cover" 
            />
            <Text style={styles.cardTitle}>{record.title}</Text>
            <Text style={styles.cardDescription}>{record.description}</Text>
          </View>
        ))}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;
