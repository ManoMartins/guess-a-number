import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import MainButton from '../components/MainButton';

import Colors from '../constants/colors';
import StylesText from '../constants/styles-text';

export default function GameOver({roundsNumber, userNumber, onRestart}) {
  return (
    <View style={styles.screen}>
      <Text style={StylesText.bodyTitle}>The Game is Over !!</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              'https://cdn.vox-cdn.com/thumbor/rSYdQZ8NrhavWV_6z59-CyDEqYY=/67x0:701x423/1400x1400/filters:focal(67x0:701x423):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/45788734/Screenshot_2015-02-27_19.57.49.0.0.png',
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <Text style={{...StylesText.bodyText, ...styles.bodyText}}>
          Your phone needed{' '}
          <Text style={styles.highlight}>{roundsNumber} </Text>
          rounds and the number was{' '}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
      </View>
      <View style={{width: '97%'}}>
        <MainButton onPress={onRestart} style={{width: '100%'}}>
          New Game
        </MainButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginBottom: 30,
    marginTop: 60,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 18,
  },
  highlight: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
