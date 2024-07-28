import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ active }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [active]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const hundredths = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    marginLeft: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Timer;
