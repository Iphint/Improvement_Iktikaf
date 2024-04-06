import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions, Alert } from 'react-native';
import TabelIktikaf from '../components/TabelIktikaf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { SwipeablePanel } from 'rn-swipeable-panel';

const Iktikaf = () => {
  const [jumlahDoa, setJumlahDoa] = useState({});
  const [malamDoa, setMalamDoa] = useState(null);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [fontsLoaded, error] = useFonts({
    Bold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Medium: require('../../assets/fonts/Poppins-Medium.ttf'),
    Regular: require('../../assets/fonts/Poppins-Regular.ttf'),
    SchBold: require('../../assets/fonts/ScheherazadeNew-Bold.ttf'),
    SchMedium: require('../../assets/fonts/ScheherazadeNew-Medium.ttf'),
    SchRegular: require('../../assets/fonts/ScheherazadeNew-Regular.ttf'),
    SchSemiBold: require('../../assets/fonts/ScheherazadeNew-SemiBold.ttf'),
  });
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('jumlahDoa');
        if (savedData !== null) {
          setJumlahDoa(JSON.parse(savedData));
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadData();
  }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('jumlahDoa', JSON.stringify(jumlahDoa));
    } catch (e) {
      console.error(e);
    }
  };

  const tambahDoa = () => {
    if (malamDoa === null) {
      Alert.alert(
        'Pilih Malam',
        'Silakan pilih malam berapa sebelum menambah doa.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        { cancelable: false }
      );
    } else {
      setJumlahDoa((prevState) => {
        const newState = {
          ...prevState,
          [malamDoa]: (prevState[malamDoa] || 0) + 1,
        };
        saveData(newState);
        return newState;
      });
    }
  };

  const resetDoa = async () => {
    if (malamDoa) {
       setJumlahDoa(async (prevState) => {
         const newState = { ...prevState };
         delete newState[malamDoa];
         try {
           await AsyncStorage.setItem('jumlahDoa', JSON.stringify(newState));
         } catch (e) {
           console.error(e);
         }
         return newState;
       });
       setMalamDoa(null);
    }
   };

  const simpanDoa = (malam) => {
    setMalamDoa(malam);
  };

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { height: windowHeight }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.doaContainer}>
        <Text style={styles.doaTitle}>Doa Lailatul Qodr</Text>
        <Text style={styles.doaText}>
          اَللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ اَلْعَفْوَ فَاعْفُ عَنِّي
        </Text>
      </View>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          Ayo gas 1000x : {malamDoa && `(Malam ${malamDoa})`}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity style={styles.button} onPress={tambahDoa}>
            <Text style={styles.buttonText}>Tambah Doa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openPanel}>
            <Text style={styles.buttonText}>Pilih malam berapa</Text>
          </TouchableOpacity> 
        </View>
        <TouchableOpacity style={styles.buttonReset} onPress={resetDoa}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableContainer}>
        <TabelIktikaf malamDoa={malamDoa} jumlahDoa={jumlahDoa} />
      </View>
      <SwipeablePanel
        fullWidth
        onlySmall
        showCloseButton
        onClose={closePanel}
        onPressCloseButton={closePanel}
        isActive={isPanelActive}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {Array.from({ length: 10 }, (_, i) => i + 21).map((malam) => (
              <TouchableOpacity
                key={malam}
                style={styles.modalButton}
                onPress={() => {
                  simpanDoa(malam);
                  closePanel();
                }}
              >
                <Text style={styles.modalButtonText}>Malam {malam}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SwipeablePanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  doaContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 20,
  },
  doaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Medium',
  },
  doaText: {
    fontSize: 30,
    fontFamily: 'SchMedium',
    textAlign: 'right',
  },
  counterContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  counterText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonReset: {
    backgroundColor: '#F6995C',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Medium',
  },
  tableContainer: {
    flex: 1,
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  modalButtonText: {
    color: 'white',
  },
});

export default Iktikaf;