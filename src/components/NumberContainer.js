import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Colors from '../constants/colors';

export default function NumberContainer({children}) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: Colors.accent,
    fontSize: 22,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});
