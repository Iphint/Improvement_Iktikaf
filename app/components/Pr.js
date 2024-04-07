import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import hadisData from '../data/PR.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pr = () => {
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
  const [hitungan, setHitungan] = useState([]);

  useEffect(() => {
    const loadHitunganFromStorage = async () => {
      try {
        const savedHitungan = await AsyncStorage.getItem('hitungan');
        if (savedHitungan !== null) {
          setHitungan(JSON.parse(savedHitungan));
        }
      } catch (error) {
        console.error('Error loading hitungan from storage:', error);
      }
    };

    loadHitunganFromStorage();
  }, []);

  const saveHitunganToStorage = async () => {
    try {
      await AsyncStorage.setItem('hitungan', JSON.stringify(hitungan));
    } catch (error) {
      console.error('Error saving hitungan to storage:', error);
    }
  };

  const handleHitung = (index) => {
    const newHitungan = [...hitungan];
    newHitungan[index] = (newHitungan[index] || 0) + 1;
    setHitungan(newHitungan);
  };

  const handleReset = (index) => {
    const newHitungan = [...hitungan];
    newHitungan[index] = 0;
    setHitungan(newHitungan);
  };

  useEffect(() => {
    saveHitunganToStorage();
  }, [hitungan]);

  const getCountBackgroundColor = (count) => {
    if (count > 100) {
      return '#C5E898';
    } else if (count > 50) {
      return '#CCD3CA';
    } else if (count > 30) {
      return '#FFA500';
    } else {
      return '#76885B';
    }
  };

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
          <TouchableOpacity style={[styles.card, { backgroundColor: getCountBackgroundColor(hitungan[index] || 0) }]} key={index} onPress={() => handleHitung(index)} activeOpacity={0.5}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.arab}>{item.arab}</Text>
            <Text style={styles.praktek}>{item.praktek}</Text>
            <Text style={styles.subtitle}>Keutamaan:</Text>
            {item.keutamaan.map((keutamaan, idx) => (
              <Text style={styles.keutamaanItem} key={idx}>
                {keutamaan}
              </Text>
            ))}
            <View style={styles.containerButton}>
              <View style={styles.count}>
                <Text style={{ fontFamily: 'Medium' }}>
                  {hitungan[index] || 0}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.resetPr}
                onPress={() => handleReset(index)}
              >
                <Text style={{ color: 'white', fontFamily: 'Medium' }}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
    textAlign: 'right',
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
    width: 70,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  resetPr: {
    width: 70,
    backgroundColor: '#9B4444',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  containerButton: {
    marginTop: 30,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
});
