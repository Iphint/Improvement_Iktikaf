import React, { useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Baca, Fasting, Praying, Rice, Salat } from '../../assets/images';
import Pr from '../components/Pr';

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

  const animatedStyles = (index) => {
    const translateY = useSharedValue(50);
    const opacity = useSharedValue(0);

    useEffect(() => {
      setTimeout(() => {
        translateY.value = withTiming(0, { duration: 1000 });
        opacity.value = withTiming(1, { duration: 1000 });
      }, index * 1000);
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
      };
    });

    return animatedStyle;
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewIntro}>
        <Animated.Text style={styles.title}>Welcome,</Animated.Text>
        <Animated.Text style={styles.subTitle}>
          {sentences[index]}
        </Animated.Text>
      </View>
      <View>
        <Animated.Text style={styles.titleAgenda}>
          Target Agenda Ramadhan
        </Animated.Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {agenda.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.5}
              onPress={() => handleCardPress(item.screen)}
            >
              <Animated.View
                style={[
                  styles.card,
                  animatedStyles(idx),
                ]}
              >
                <Image style={styles.image} source={item.image} />
                <Text style={styles.text}>{item.title}</Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View>
        <View style={styles.prButtonContainer}>
          <Text style={styles.titlePR}>Jangan lupa PR 13 nya</Text>
          <TouchableOpacity style={styles.prButton} onPress={() => setShowPr(!showPr)}>
            <Text style={styles.prButtonText}>{showPr ? 'X' : 'Open'}</Text>
          </TouchableOpacity>
        </View>
        {showPr && (
          <View style={{ marginTop: 10 }}>
            <Pr />
          </View>
        )}
      </View>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: { backgroundColor: '#627254', flex: 1 },
  previewIntro: { marginVertical: 30, marginHorizontal: 20 },
  title: { fontSize: 40, fontWeight: '500', color: '#fff', fontFamily: 'Bold' },
  subTitle: {
    fontSize: 20,
    fontWeight: '200',
    color: '#fff',
    fontFamily: 'Medium',
  },
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
    fontFamily: 'Regular',
  },
  titleAgenda: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
    marginLeft: 20,
    fontFamily: 'Regular',
  },
  titlePR: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'Regular',
  },
  prButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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