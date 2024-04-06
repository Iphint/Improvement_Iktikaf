import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  ScrollView,
  Text,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Fasting = () => {
  const [selected, setSelected] = useState('');
  const [agenda, setAgenda] = useState({});
  const [agendaText, setAgendaText] = useState('');
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    loadAgenda();
  }, []);

  useEffect(() => {
    saveAgenda();
  }, [agenda]);

  const loadAgenda = async () => {
    try {
      const savedAgenda = await AsyncStorage.getItem('@agenda');
      if (savedAgenda !== null) {
        setAgenda(JSON.parse(savedAgenda));
      }
    } catch (error) {
      console.error('Error loading agenda:', error);
    }
  };

  const saveAgenda = async () => {
    try {
      // Convert agenda state to JSON and save it to local storage
      await AsyncStorage.setItem('@agenda', JSON.stringify(agenda));
    } catch (error) {
      console.error('Error saving agenda:', error);
    }
  };

  const handleDayPress = (day) => {
    setSelected(day.dateString);
    const selectedAgenda = agenda[day.dateString];
    setAgendaText(selectedAgenda || '');
  };

  const handleAgendaChange = (text) => {
    setAgendaText(text);
  };

  const handleSubmit = () => {
    if (selected === '') {
      Alert.alert('Pilih Tanggal', 'Mohon pilih tanggal terlebih dahulu.');
    } else {
      const updatedAgenda = { ...agenda, [selected]: agendaText };
      setAgenda(updatedAgenda);
      Alert.alert(
        'Agenda Disimpan',
        `Agenda untuk tanggal ${selected} telah disimpan.`
      );
    }
  };

  const handleDelete = () => {
    if (selected === '') {
      Alert.alert('Pilih Tanggal', 'Mohon pilih tanggal terlebih dahulu.');
    } else {
      const { [selected]: deleted, ...rest } = agenda;
      setAgenda(rest);
      setAgendaText('');
      Alert.alert(
        'Agenda Dihapus',
        `Agenda untuk tanggal ${selected} telah dihapus.`
      );
    }
  };

  const renderMarkedDates = () => {
    const markedDates = {};
    for (const date in agenda) {
      markedDates[date] = { marked: true, dotColor: 'orange' };
    }
    return markedDates;
  };

  return (
    <ScrollView>
      <View style={[styles.container, { height: windowHeight }]}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            ...renderMarkedDates(),
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: 'orange',
            },
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Tambahkan agenda..."
          onChangeText={handleAgendaChange}
          value={agendaText}
          multiline
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 30,
          }}
        >
          <View style={[styles.button, { backgroundColor: '#A7D397' }]}>
            <Text onPress={handleSubmit}>Submit</Text>
          </View>
          <View style={styles.button}>
            <Text onPress={handleDelete} style={styles.buttonText}>
              Delete
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Fasting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,
    padding: 10,
    height: 150,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});