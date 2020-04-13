import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

import StylesText from '../constants/styles-text';
import Colors from '../constants/colors';

const StartGame = (props) => {
  const [enteredNumber, setEnteredNumber] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const handleNumberInput = (inputText) => {
    setEnteredNumber(inputText.replace(/[^0-9]/g, ''));
  };

  const handleResetInput = () => {
    setEnteredNumber('');
    setConfirmed(false);
  };

  const handleConfirmInput = () => {
    const chosenNumber = parseInt(enteredNumber, 0);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number', 'Try Again', [
        {text: 'Okay', style: 'destructive', onPress: handleResetInput},
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredNumber('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text style={StylesText.bodyText}>You selected</Text>
        <View>
          <NumberContainer>{selectedNumber}</NumberContainer>
          <MainButton
            onPress={() => props.onStartGame(selectedNumber)}
            style={{width: 115}}>
            Start Game
          </MainButton>
        </View>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.screen}>
        <Text style={StylesText.bodyTitle}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text style={StylesText.bodyText}>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="1 ~ 99"
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={handleNumberInput}
            value={enteredNumber}
            color={Colors.accent}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonContent}>
              <MainButton
                style={{backgroundColor: Colors.accent}}
                onPress={handleResetInput}>
                Reset
              </MainButton>
            </View>
            <View style={styles.buttonContent}>
              <MainButton onPress={handleConfirmInput}>Confirm</MainButton>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  buttonContent: {
    width: 85,
    height: 36,
    color: 'white',
    borderRadius: 6,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    width: '60%',
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGame;
