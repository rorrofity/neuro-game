import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Board from './Board';
import ControlButton from './ControlButton';
import Sidebar from './Sidebar';
import Timer from './Timer';

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [currentArrow, setCurrentArrow] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [arrows, setArrows] = useState(Array(16).fill({ direction: null, color: '#E0E0E0', active: false }));
  const [colorHistory, setColorHistory] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500'];

  const startGame = () => {
    setGameStarted(true);
    setGameFinished(false);
    setCurrentPosition(0);
    setColorHistory([]);
    setTimerActive(false);
    setTimerKey(prevKey => prevKey + 1); // This will reset the timer
    setArrows(generateInitialArrows());
    if (currentLevel === 1) {
      setTimeout(() => setTimerActive(true), 0);
      generateNewArrow(); // Activate the first arrow immediately for level 1
    }
  };

  const finishGame = () => {
    setGameStarted(false);
    setGameFinished(true);
    setCurrentArrow(null);
    setCurrentPosition(0);
    setArrows(Array(16).fill({ direction: null, color: '#E0E0E0' }));
    setTimerActive(false);
    // We don't reset the timer here, allowing it to display the final time
  };

  const restartGame = () => {
    setGameFinished(false);
    setFinalTime(0);
    startGame();
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
        newArrows[currentPosition] = { ...newArrows[currentPosition], color: newColor, active: true };
        setArrows(newArrows);
        
        // Start the timer when the first arrow is activated in level 2
        if (currentPosition === 0) {
          setTimerActive(true);
        }
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
          <Timer active={timerActive} onFinish={setFinalTime} timerKey={timerKey} gameFinished={gameFinished} />
        </View>
        <View style={styles.buttonContainer}>
          {!gameStarted && !gameFinished ? (
            <ControlButton
              title="Iniciar"
              onPress={startGame}
              color="#4ECDC4"
              style={styles.startButton}
            />
          ) : gameFinished ? (
            <ControlButton
              title="Reiniciar"
              onPress={restartGame}
              color="#4ECDC4"
              style={styles.startButton}
            />
          ) : (
            <>
              <ControlButton
                title="Terminar"
                onPress={finishGame}
                color="#FF6B6B"
                style={styles.gameButton}
              />
              <ControlButton
                title={currentPosition === 16 ? "Terminar" : "Siguiente Flecha"}
                onPress={currentPosition === 16 ? finishGame : generateNewArrow}
                color="#45B7D1"
                style={styles.gameButton}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  boardAndTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    maxWidth: 600,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    paddingHorizontal: 10, // Add padding to account for the board's padding
  },
  startButton: {
    width: '100%',
  },
  gameButton: {
    flex: 1,
  },
});

export default Game;
