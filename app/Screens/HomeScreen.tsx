import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Header from '../../components/Header'; // Ajusta la ruta según tu estructura de carpetas
import ImageCarousel from '../../components/Carrusel'; // Ajusta la ruta según tu estructura de carpetas
import InfoCard from '../../components/Cards'; // Ajusta la ruta según tu estructura de carpetas

const HomeScreen: React.FC = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('https://back-end-siveth-g8vc.vercel.app/api/records');
      if (response.status === 200) {
        setRecords(response.data);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  // URLs de las imágenes para las tarjetas
  const cardImages = [
    'https://viajesramos.s3.us-east-2.amazonaws.com/1721802084252.jpeg',
    'https://viajesramos.s3.us-east-2.amazonaws.com/1721797996542.jpeg',
    'https://viajesramos.s3.us-east-2.amazonaws.com/image3.jpg',
    'https://viajesramos.s3.us-east-2.amazonaws.com/image4.jpg',
    'https://viajesramos.s3.us-east-2.amazonaws.com/image5.jpg',
    'https://viajesramos.s3.us-east-2.amazonaws.com/image6.jpg',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header imageUrl="https://viajesramos.s3.us-east-2.amazonaws.com/logo.png" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageCarousel />
        {records.map((record: any, index: number) => (
          <InfoCard
            key={record.id}
            id={record.id}
            title={record.title}
            description={record.description}
            date={record.date}
            imageUrl={cardImages[index % cardImages.length]} // Usa las URLs de las imágenes especificadas
          />
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
});

export default HomeScreen;
