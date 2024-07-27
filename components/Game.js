import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Board from './Board';
import ControlButton from './ControlButton';

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentArrow, setCurrentArrow] = useState(null);

  const startGame = () => {
    setGameStarted(true);
    generateNewArrow();
  };

  const finishGame = () => {
    setGameStarted(false);
    setCurrentArrow(null);
  };

  const [currentPosition, setCurrentPosition] = useState(0);

  const generateNewArrow = () => {
    if (currentPosition < 16) {
      const directions = ['Up', 'Down', 'Left', 'Right'];
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
      const newArrow = {
        direction: directions[Math.floor(Math.random() * directions.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        position: currentPosition,
      };
      setCurrentArrow(newArrow);
      setCurrentPosition(currentPosition + 1);
    } else {
      finishGame();
    }
  };

  useEffect(() => {
    if (gameStarted) {
      generateNewArrow();
    }
  }, [gameStarted]);

  return (
    <View style={styles.container}>
      <Board currentArrow={currentArrow} />
      <View style={styles.buttonContainer}>
        <ControlButton
          title={gameStarted ? 'Finish' : 'Start'}
          onPress={gameStarted ? finishGame : startGame}
          color={gameStarted ? '#FF6B6B' : '#4ECDC4'}
        />
        {gameStarted && (
          <ControlButton
            title="Next Arrow"
            onPress={generateNewArrow}
            color="#45B7D1"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default Game;
