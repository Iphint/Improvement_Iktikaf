import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DetailPrCard from '../components/DetailPrCard';

const DetailPr = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>DetailPr page view</Text>
      <DetailPrCard />
    </View>
  );
};

export default DetailPr;

const styles = StyleSheet.create({});
