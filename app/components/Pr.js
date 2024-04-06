import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import hadisData from '../data/PR.json';
import { useNavigation } from '@react-navigation/native';

const Pr = () => {
  const navigation = useNavigation()
  const [fontsLoaded] = useFonts({
    Bold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Medium: require('../../assets/fonts/Poppins-Medium.ttf'),
    Regular: require('../../assets/fonts/Poppins-Regular.ttf'),
    SchBold: require('../../assets/fonts/ScheherazadeNew-Bold.ttf'),
    SchMedium: require('../../assets/fonts/ScheherazadeNew-Medium.ttf'),
    SchRegular: require('../../assets/fonts/ScheherazadeNew-Regular.ttf'),
    SchSemiBold: require('../../assets/fonts/ScheherazadeNew-SemiBold.ttf'),
  });
  const windowHeight = Dimensions.get('window').height;
  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { height: windowHeight }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {hadisData.hadis.map((item, index) => (
          <View style={styles.card} key={index}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.arab}>{item.arab}</Text>
            <Text style={styles.praktek}>{item.praktek}</Text>
            <Text style={styles.subtitle}>Keutamaan:</Text>
            {item.keutamaan.map((keutamaan, idx) => (
              <Text style={styles.keutamaanItem} key={idx}>
                {keutamaan}
              </Text>
            ))}
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('detailpr')}>
                <View style={styles.count}>
                  <Text style={{ fontFamily: 'Medium' }}>12</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Pr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#627254',
    paddingBottom: 400,
  },
  card: {
    backgroundColor: '#76885B',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'Medium',
  },
  description: {
    marginBottom: 5,
  },
  arab: {
    marginBottom: 5,
    fontFamily: 'SchSemiBold',
    color: '#fff',
    fontSize: 20,
    textAlign: 'right'
  },
  praktek: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: 'Medium',
  },
  subtitle: {
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: 'Bold',
  },
  keutamaanItem: {
    marginLeft: 10,
    fontFamily: 'Regular',
    textAlign: 'justify',
  },
  count: {
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    width: 60,
    height: 60,
    justifyContent: 'center',
    borderRadius: 20,
  },
});
