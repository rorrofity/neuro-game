import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Arrow from './Arrow';

const Board = ({ currentArrow }) => {
  return (
    <View style={styles.board}>
      {[...Array(16)].map((_, i) => (
        <Arrow
          key={i}
          direction={currentArrow && currentArrow.position === i ? currentArrow.direction : null}
          color={currentArrow && currentArrow.position === i ? currentArrow.color : '#E0E0E0'}
          active={currentArrow && currentArrow.position === i}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: '1%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxWidth: 600,
    maxHeight: 600,
    margin: 'auto',
  },
});

export default Board;
