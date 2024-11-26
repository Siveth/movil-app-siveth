import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window');

const sliderData = [
  { imageUrl: 'https://viajesramos.s3.us-east-2.amazonaws.com/1721975090370.png' },
  { imageUrl: 'https://viajesramos.s3.us-east-2.amazonaws.com/1721975032484.png' },
  { imageUrl: 'https://viajesramos.s3.us-east-2.amazonaws.com/1721974991663.png' },
];

const ImageCarousel: React.FC = () => {
  return (
    <Carousel
      width={screenWidth}
      height={300}
      data={sliderData}
      autoPlay
      autoPlayInterval={3000}
      renderItem={({ item }: any) => (
        <View style={styles.sliderItem}>
          <Image source={{ uri: item.imageUrl }} style={styles.sliderImage} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  sliderItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ImageCarousel;
