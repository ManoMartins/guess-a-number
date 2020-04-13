import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native';

import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

import StylesText from '../constants/styles-text';
import Colors from '../constants/colors';

function generateRandomBetween(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min;

  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
}

export default function Game({userChoice, onGameOver}) {
  const initialGuess = generateRandomBetween(1, 100, 0);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver, pastGuesses.length]);

  function handlerNextGuess(direction) {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie !!", 'You know that this is wrong ...', [
        {text: 'Sorry', style: 'cancel'},
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((currentPastGuesses) => [nextNumber, ...currentPastGuesses]);
  }

  return (
    <View style={styles.screen}>
      <Text style={StylesText.bodyTitle}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          onPress={handlerNextGuess.bind(this, 'lower')}
          style={{backgroundColor: Colors.accent}}>
          Lower
        </MainButton>
        <MainButton onPress={handlerNextGuess.bind(this, 'greater')}>
          Greater
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}>
          {pastGuesses.map((guess, index) => (
            <View key={guess} style={styles.listItem}>
              <Text style={styles.listText}>#{pastGuesses.length - index}</Text>
              <Text style={styles.listText}>-</Text>
              <Text style={styles.listText}>{guess}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '90%',
  },
  listContainer: {
    flex: 1,
    width: '80%',
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: Colors.primary,
    padding: 18,
    width: '63%',
  },
  listText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.accent,
  },
});
