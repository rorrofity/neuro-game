import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Board from './Board';
import ControlButton from './ControlButton';
import Sidebar from './Sidebar';

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentArrow, setCurrentArrow] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [arrows, setArrows] = useState(Array(16).fill({ direction: null, color: '#E0E0E0' }));

  const startGame = () => {
    setGameStarted(true);
    setCurrentPosition(0);
    setCurrentArrow(null);
    if (currentLevel === 2) {
      setArrows(generateInitialArrows());
    }
  };

  const finishGame = () => {
    setGameStarted(false);
    setCurrentArrow(null);
    setCurrentPosition(0);
    setArrows(Array(16).fill({ direction: null, color: '#E0E0E0' }));
  };

  const generateInitialArrows = () => {
    const directions = ['Up', 'Down', 'Left', 'Right'];
    return Array(16).fill(null).map(() => ({
      direction: directions[Math.floor(Math.random() * directions.length)],
      color: '#E0E0E0'
    }));
  };

  const generateNewArrow = () => {
    if (currentPosition < 16) {
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
      const newColor = colors[Math.floor(Math.random() * colors.length)];

      if (currentLevel === 1) {
        const directions = ['Up', 'Down', 'Left', 'Right'];
        const newArrow = {
          direction: directions[Math.floor(Math.random() * directions.length)],
          color: newColor,
          position: currentPosition,
        };
        setCurrentArrow(newArrow);
      } else {
        const newArrows = [...arrows];
        newArrows[currentPosition] = { ...newArrows[currentPosition], color: newColor };
        setArrows(newArrows);
      }

      setCurrentPosition(currentPosition + 1);
    } else {
      finishGame();
    }
  };

  const handleLevelSelect = (level) => {
    setCurrentLevel(level);
    finishGame();
  };

  return (
    <View style={styles.container}>
      <Sidebar currentLevel={currentLevel} onLevelSelect={handleLevelSelect} />
      <View style={styles.gameArea}>
        <Board
          currentArrow={currentLevel === 1 ? currentArrow : null}
          arrows={currentLevel === 2 ? arrows : null}
        />
        <View style={styles.buttonContainer}>
          <ControlButton
            title={gameStarted ? 'Terminar' : 'Iniciar'}
            onPress={gameStarted ? finishGame : startGame}
            color={gameStarted ? '#FF6B6B' : '#4ECDC4'}
          />
          {gameStarted && (
            <ControlButton
              title="Siguiente Flecha"
              onPress={generateNewArrow}
              color="#45B7D1"
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  gameArea: {
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
