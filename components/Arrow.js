import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Arrow = ({ direction, color, active }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (active) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [active]);

  const getIconName = () => {
    switch (direction) {
      case 'Up':
        return 'caretup';
      case 'Down':
        return 'caretdown';
      case 'Left':
        return 'caretleft';
      case 'Right':
        return 'caretright';
      default:
        return 'minus';
    }
  };

  return (
    <Animated.View
      style={[
        styles.arrowContainer,
        { transform: [{ scale: scaleAnim }], backgroundColor: color },
      ]}
    >
      <AntDesign name={getIconName()} size={48} color="#FFFFFF" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    width: '23%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: '1%',
  },
});

export default Arrow;
