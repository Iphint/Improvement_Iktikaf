import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import Fasting from '../../assets/images/fasting.png';
import Salat from '../../assets/images/salat.png';
import Baca from '../../assets/images/baca.png';
import Praying from '../../assets/images/praying.png';
import Rice from '../../assets/images/rice.png';
import Pr from '../components/Pr';
import { useNavigation } from '@react-navigation/native';

const Homepage = () => {
  const [index, setIndex] = useState(0);
  const [showPr, setShowPr] = useState(false);
  const navigation = useNavigation();
  const windowHeight = Dimensions.get('window').height;
  const sentences = [
    "It doesn't feel like Ramadan will end",
    'But we should make the most of it',
    'Keep your spirits up',
    'And cherish every moment',
  ];
  const [fontsLoaded] = useFonts({
    'Bold' : require('../../assets/fonts/Poppins-Bold.ttf'),
    'Medium' : require('../../assets/fonts/Poppins-Medium.ttf'),
    'Regular' : require('../../assets/fonts/Poppins-Regular.ttf'),
  })
  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { height: windowHeight }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const agenda = [
    {
      title: 'puasa',
      image: Fasting,
      screen: 'fasting',
    },
    {
      title: 'tarawih',
      image: Salat,
      screen: 'tarawih',
    },
    {
      title: 'tadarus',
      image: Baca,
      screen: 'tadarus',
    },
    {
      title: 'iktikaf dan lailatul qadr',
      image: Praying,
      screen: 'iktikaf',
    },
    {
      title: 'zakat',
      image: Rice,
      screen: 'zakat',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === sentences.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCardPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const togglePrList = () => {
    setShowPr(!showPr);
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewIntro}>
        <Text style={styles.title}>Wellcome,</Text>
        <Text style={styles.subTitle}>{sentences[index]}</Text>
      </View>
      {/*main home menu*/}
      <View>
        <Text style={styles.titleAgenda}>Target Agenda</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {agenda.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              onPress={() => handleCardPress(item.screen)}
            >
              <View style={styles.card} key={index}>
                <Image style={styles.image} source={item.image} />
                <Text style={styles.text}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* show PR */}
      {/* <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Text style={styles.titlePR}>Jangan lupa PR 13 nya</Text>
          <TouchableOpacity style={styles.prButton} onPress={togglePrList}>
            <Text style={styles.prButtonText}>{showPr ? 'X' : 'Open'}</Text>
          </TouchableOpacity>
        </View>
        {showPr && (
          <View>
            <View style={{ marginTop: 10 }}>
              <Pr />
            </View>
          </View>
        )}
      </View> */}
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: { backgroundColor: '#627254', flex: 1 },
  previewIntro: { marginVertical: 30, marginHorizontal: 20 },
  title: { fontSize: 40, fontWeight: '500', color: '#fff', fontFamily: "Bold" },
  subTitle: { fontSize: 20, fontWeight: '200', color: '#fff', fontFamily :"Medium" },
  card: {
    backgroundColor: '#76885B',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Regular'
  },
  titleAgenda: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
    marginLeft: 20,
    fontFamily: 'Regular'
  },
  titlePR: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'Regular'
  },
  prButton: {
    backgroundColor: '#76885B',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  prButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
