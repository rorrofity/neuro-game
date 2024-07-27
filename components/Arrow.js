import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Arrow = ({ direction, color, active }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (active) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
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
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <AntDesign name={getIconName()} size={24} color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    width: '22%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    margin: '1.5%',
  },
});

export default Arrow;
