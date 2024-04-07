import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useFonts } from 'expo-font';
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';
import React from 'react';
import { Lantern } from '../../assets/images';

const SplashScreen = ({ navigation }) => {
  const windowHeight = Dimensions.get('window').height;
  const [fontsLoaded] = useFonts({
    Bold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Medium: require('../../assets/fonts/Poppins-Medium.ttf'),
    Regular: require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { height: windowHeight }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <View>
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          style={styles.image}
          source={Lantern}
        />
      </View>
      <View style={styles.viewContainer}>
        <Animated.Text
          entering={FadeInLeft.delay(200).duration(1000).springify()}
          style={styles.title}
        >
          Pray 10 last day of Ramadhan
        </Animated.Text>
        <Animated.Text entering={FadeInRight.delay(200).duration(1000).springify()} style={styles.subTitle}>
          Push your limit to get the highest rank on Jannah
        </Animated.Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('mainapp')}>
        <Animated.View entering={FadeInDown.delay(200).duration(2000).springify()} style={styles.viewButton}>
          <Text style={styles.textTest}>Go Get it</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: '#627254' },
  image: {
    width: 269,
    height: 269,
    marginTop: 50,
    marginBottom: 70,
    marginLeft: 18,
  },
  title: {
    fontSize: 40,
    width: 370,
    marginBottom: 20,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'Bold',
  },
  subTitle: { fontSize: 20, color: '#fff', fontFamily: 'Regular' },
  viewContainer: { marginHorizontal: 10, marginVertical: 40 },
  viewButton: {
    backgroundColor: '#76885B',
    marginHorizontal: 30,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  textTest: { color: '#fff', fontFamily: 'Medium' },
});
