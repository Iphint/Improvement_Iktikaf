import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Path from './app/router/Path';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Path/>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#627254',
    flex: 1
 },
});
