import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';

const Header: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0D92F4" />
      <Image source={{ uri: imageUrl }} style={styles.headerImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: Platform.OS === 'android' ? StatusBar.currentHeight + 60 : 60,
    backgroundColor: '#0D92F4',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  headerImage: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
});

export default Header;
