import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';

const TabelIktikaf = ({ jumlahDoa }) => {
 const dataMalam = [];
 for (let i = 21; i <= 30; i++) {
    dataMalam.push({
      malam: `Malam ${i}`,
      jumlahDoa: jumlahDoa[i] || 0,
    });
 }

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
         'Congratulation !!!',
         `You've passed 1000 times reading du'a, but you should be more spirit tommorow, keep spirit`,
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
       <View key={index} style={[styles.row, { backgroundColor }]}>
         <Text style={styles.cell}>{item.malam}</Text>
         <Text style={styles.cell}>{item.jumlahDoa}</Text>
       </View>
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
