import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import StartGame from './screens/StartGame';
import Header from './components/Header';
import GameOver from './screens/GameOver';
import Game from './screens/Game';

const App = () => {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  function handlerConfigureNewGame() {
    setGuessRounds(0);
    setUserNumber(null);
  }

  function handlerStartGame(selectedNumber) {
    setUserNumber(selectedNumber);
  }

  function handleGameOver(numOfRounds) {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGame onStartGame={handlerStartGame} />;

  if (userNumber && guessRounds <= 0) {
    content = <Game userChoice={userNumber} onGameOver={handleGameOver} />;
  } else if (guessRounds > 0) {
    content = (
      <GameOver
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={handlerConfigureNewGame}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
