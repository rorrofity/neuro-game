import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ active, onFinish, timerKey, gameFinished }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!gameFinished) {
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [active, gameFinished, timerKey]);

  useEffect(() => {
    if (!active && gameFinished) {
      onFinish(time);
    }
  }, [active, gameFinished, onFinish, time]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const hundredths = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerLabel}>Tiempo:</Text>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    marginLeft: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  timerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ECDC4',
    fontFamily: 'Roboto',
  },
});

export default Timer;
