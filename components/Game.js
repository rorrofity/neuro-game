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

  const generateNewArrow = () => {
    const directions = ['Up', 'Down', 'Left', 'Right'];
    const colors = ['#FF6B6B', '#4ECDC4', '#FFA500', '#9B59B6'];
    const newArrow = {
      direction: directions[Math.floor(Math.random() * directions.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      position: Math.floor(Math.random() * 16),
    };
    setCurrentArrow(newArrow);
  };

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
