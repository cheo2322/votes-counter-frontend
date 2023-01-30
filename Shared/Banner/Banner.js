import React from 'react';
import { Image, StyleSheet, Dimensions, View } from 'react-native';

var { width } = Dimensions.get('window');

const Banner = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/arts/banner.png')}
        style={styles.imageBanner}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageBanner: {
    height: width / 3,
    width: '100%',
  },
});

export default Banner;
