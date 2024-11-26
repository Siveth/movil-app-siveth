import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

interface InfoCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  image: any; // Cambiado de string a any para admitir imágenes locales
}

const InfoCard: React.FC<InfoCardProps> = ({ id, title, description, date, image }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const formatDate = (dateString: string) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{formatDate(date)}</Text>
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
        {expanded ? description : `${description.slice(0, 100)}...`}
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.toggleText}>{expanded ? 'Ver menos' : 'Ver más'}</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#ddd',
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
});

export default InfoCard;
