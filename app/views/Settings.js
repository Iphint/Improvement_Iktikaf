import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Settings = () => {
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleResetCounter = () => {
    setResetConfirmation(true);
  };

  return (
    <View style={styles.container}>
      <Text>This feature will comming soon 🙏🙏🙏</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
