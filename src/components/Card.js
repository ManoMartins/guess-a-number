import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Card({children, style}) {
  return <View style={{...styles.card, ...style}}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
  },
});
