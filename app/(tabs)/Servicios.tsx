import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Button } from "react-native";
import { Asset } from 'expo-asset';
import Header from "@/components/Header";
import { useRouter } from 'expo-router';

const Servicio: React.FC = () => {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    (async () => {
      const image1 = Asset.fromModule(require('../../assets/images/Monterrey.jpeg'));
      await image1.downloadAsync();
      setImage(image1);
      setReady(true);
    })();
  }, []);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const navigateToDetail = () => {
    router.push("Screens/Boletos");
  };

  
  const navigateViajes = () => {
    router.push("Screens/Viajes"); 
  };

  const formatDate = (dateString: string) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header imageUrl="https://viajesramos.s3.us-east-2.amazonaws.com/logo.png" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {ready && image && (
          <View style={styles.card}>
            <Text style={styles.date}>{formatDate("2023-10-17")}</Text>
            <Image
              source={{ uri: image.localUri || image.uri }}
              style={styles.cardImage}
            />
            <Text style={styles.title}>Venta de boletos turisticos</Text>
            <Text style={styles.description}>
              {expanded ? 'Viajes especiales ramos te ofrece un posibilida de recorrer tu bonito México a tráves de los diferentes destinos turisticos que tenemos para ti dale clic al botón y comienza a viajar con ¡Viajes especiales Ramos! Viajar nunca fue tan facil' : 'Viajes especiales Ramos te ofrece...'}
              <TouchableOpacity onPress={toggleDescription}>
                <Text style={styles.toggleText}>{expanded ? 'Ver menos' : 'Ver más'}</Text>
              </TouchableOpacity>
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="¡Comprar ahora!" onPress={navigateToDetail} />
            </View>
          </View>
        )}

{ready && image && (
          <View style={styles.card}>
            <Text style={styles.date}>{formatDate("2023-10-17")}</Text>
            <Image
              source={{ uri: image.localUri || image.uri }}
              style={styles.cardImage}
            />
            <Text style={styles.title}>Mudanza</Text>
            <Text style={styles.description}>
              {expanded ? 'Viajes especiales Ramos te ofrece la disponibilidad de poder transladar tus cosas a través de la republica, con Viajes especiales Ramos nunca fue tan facil mudarse' : 'Viajes especiales Ramos te ofrece la disponibilidad ...'}
              <TouchableOpacity onPress={toggleDescription}>
                <Text style={styles.toggleText}>{expanded ? 'Ver menos' : 'Ver más'}</Text>
              </TouchableOpacity>
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Comienza a cotizar ahora" onPress={navigateToDetail} />
            </View>
          </View>
        )}

{ready && image && (
          <View style={styles.card}>
            <Text style={styles.date}>{formatDate("2023-10-17")}</Text>
            <Image
              source={{ uri: image.localUri || image.uri }}
              style={styles.cardImage}
            />
            <Text style={styles.title}>Paqueteria</Text>
            <Text style={styles.description}>
              {expanded ? 'Con viajes especiales Ramos puedes enviar paquetes de manera segura seguinedo las recomendaciones, envia tus paqutes de manera rapida y seguro cpn viajes especiales ramos, enviara paquetes nunca fue tan facil' : 'Con viajes especiales Ramos puedes enviar...'}
              <TouchableOpacity onPress={toggleDescription}>
                <Text style={styles.toggleText}>{expanded ? 'Ver menos' : 'Ver más'}</Text>
              </TouchableOpacity>
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Comienza a cotizar ahora" onPress={navigateToDetail} />
            </View>
          </View>
        )}

{ready && image && (
          <View style={styles.card}>
            <Text style={styles.date}>{formatDate("2023-10-17")}</Text>
            <Image
              source={{ uri: image.localUri || image.uri }}
              style={styles.cardImage}
            />
            <Text style={styles.title}>Viaje particular</Text>
            <Text style={styles.description}>
              {expanded ? 'Realiza vaijes a toda la republica con viajes Especiales Ramos, vive la experincia con tu familia contando copn diferentes tipos de autmoviles para disponibilidad al numero de personas, que esperas para comenzar a tener aventuras con Viajes especiales Ramos  ' : 'Realiza vaijes a toda la...'}
              <TouchableOpacity onPress={toggleDescription}>
                <Text style={styles.toggleText}>{expanded ? 'Ver menos' : 'Ver más'}</Text>
              </TouchableOpacity>
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Comienza a cotizar ahora" onPress={navigateViajes} />
            </View>
          </View>
        )}
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
  },
  date: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  toggleText: {
    color: '#1E90FF',
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
});

export default Servicio;
