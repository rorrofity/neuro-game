import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Board from './Board';
import ControlButton from './ControlButton';
import Sidebar from './Sidebar';
import Timer from './Timer';

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentArrow, setCurrentArrow] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [arrows, setArrows] = useState(Array(16).fill({ direction: null, color: '#E0E0E0' }));
  const [colorHistory, setColorHistory] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500'];

  const startGame = () => {
    setGameStarted(true);
    setCurrentPosition(0);
    setColorHistory([]);
    setTimerActive(true);
    if (currentLevel === 2) {
      setArrows(generateInitialArrows());
    }
    generateNewArrow(); // Activate the first arrow immediately
  };

  const finishGame = () => {
    setGameStarted(false);
    setCurrentArrow(null);
    setCurrentPosition(0);
    setArrows(Array(16).fill({ direction: null, color: '#E0E0E0' }));
    setTimerActive(false);
  };

  const generateInitialArrows = () => {
    const directions = ['Up', 'Down', 'Left', 'Right'];
    return Array(16).fill(null).map(() => ({
      direction: directions[Math.floor(Math.random() * directions.length)],
      color: '#E0E0E0',
      active: false
    }));
  };

  const generateNewColor = () => {
    let newColor;
    do {
      newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (
      colorHistory.length >= 2 &&
      colorHistory[colorHistory.length - 1] === newColor &&
      colorHistory[colorHistory.length - 2] === newColor
    );

    const newColorHistory = [...colorHistory, newColor];
    if (newColorHistory.length > 16) newColorHistory.shift();
    setColorHistory(newColorHistory);

    return newColor;
  };

  const generateNewArrow = () => {
    if (currentPosition < 16) {
      const newColor = generateNewColor();

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
    }
    // Remove the automatic finishGame() call here
  };

  const handleLevelSelect = (level) => {
    setCurrentLevel(level);
    finishGame();
  };

  useEffect(() => {
    // Remove this effect as we no longer want to automatically finish the game
  }, []);

  return (
    <View style={styles.container}>
      <Sidebar currentLevel={currentLevel} onLevelSelect={handleLevelSelect} />
      <View style={styles.gameArea}>
        <View style={styles.boardAndTimer}>
          <Board
            currentArrow={currentLevel === 1 ? currentArrow : null}
            arrows={currentLevel === 2 ? arrows : null}
          />
          <Timer active={timerActive} onFinish={setFinalTime} />
        </View>
        <View style={styles.buttonContainer}>
          {!gameStarted && (
            <ControlButton
              title="Iniciar"
              onPress={startGame}
              color="#4ECDC4"
              style={styles.startButton}
            />
          )}
          {gameStarted && (
            <>
              <ControlButton
                title="Terminar"
                onPress={finishGame}
                color="#FF6B6B"
                style={styles.finishButton}
              />
              <ControlButton
                title={currentPosition === 16 ? "Terminar" : "Siguiente Flecha"}
                onPress={currentPosition === 16 ? finishGame : generateNewArrow}
                color="#45B7D1"
                style={styles.nextButton}
              />
            </>
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
  boardAndTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 600,
    height: 50,
    marginTop: 20,
  },
  startButton: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  finishButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  nextButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default Game;
