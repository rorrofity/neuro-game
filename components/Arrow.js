import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

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

  const getArrowPath = () => {
    switch (direction) {
      case 'Up':
        return 'M25,75 L50,25 L75,75 L62.5,75 L62.5,100 L37.5,100 L37.5,75 Z';
      case 'Down':
        return 'M25,25 L75,25 L50,75 L25,25 M37.5,25 L37.5,0 L62.5,0 L62.5,25 Z';
      case 'Left':
        return 'M75,25 L25,50 L75,75 L75,62.5 L100,62.5 L100,37.5 L75,37.5 Z';
      case 'Right':
        return 'M25,25 L75,50 L25,75 L25,62.5 L0,62.5 L0,37.5 L25,37.5 Z';
      default:
        return '';
    }
  };

  return (
    <Animated.View
      style={[
        styles.arrowContainer,
        { transform: [{ scale: scaleAnim }], backgroundColor: color },
      ]}
    >
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Path d={getArrowPath()} fill="#FFFFFF" />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Arrow;
