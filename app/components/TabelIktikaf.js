import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';

const TabelIktikaf = ({ jumlahDoa, setJumlahDoa }) => {
  const dataMalam = [];
  for (let i = 21; i <= 30; i++) {
    dataMalam.push({
      malam: `Malam ${i}`,
      jumlahDoa: jumlahDoa[i] || 0,
    });
  }

  const resetMalamDoa = (malam) => {
    Alert.alert(
      'Reset Doa',
      `Anda yakin ingin mereset jumlah doa Malam ${malam}?`,
      [
        {
          text: 'Batal',
          onPress: () => console.log('Reset dibatalkan'),
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: () => {
            setJumlahDoa((prevState) => {
              const newState = { ...prevState };
              delete newState[malam];
              try {
                AsyncStorage.setItem('jumlahDoa', JSON.stringify(newState));
              } catch (e) {
                console.error(e);
              }
              return newState;
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Malam</Text>
        <Text style={styles.headerText}>Jumlah Doa</Text>
      </View>
      {dataMalam.map((item, index) => {
        let backgroundColor;
        if (item.jumlahDoa >= 1000) {
          backgroundColor = 'blue';
          Alert.alert(
            'Selamat !!!',
            `Anda telah membaca 1000 kali doa Lailatul Qodar pada Malam ${item.malam}, tetapi tetap semangat untuk besok.`,
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              },
            ],
            { cancelable: false }
          );
        } else if (item.jumlahDoa >= 600) {
          backgroundColor = 'green';
        } else if (item.jumlahDoa >= 200) {
          backgroundColor = 'orange';
        } else {
          backgroundColor = 'white';
        }

        return (
          <TouchableOpacity
            key={index}
            style={[styles.row, { backgroundColor }]}
            onPress={() => resetMalamDoa(index + 21)}
          >
            <Text style={styles.cell}>{item.malam}</Text>
            <Text style={styles.cell}>{item.jumlahDoa}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default TabelIktikaf;

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
 },
 header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
 },
 headerText: {
    flex: 1,
    fontWeight: 'bold',
 },
 row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
 },
 cell: {
    flex: 1,
 },
});