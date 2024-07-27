import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Arrow from './Arrow';

const Board = ({ currentArrow }) => {
  const renderArrows = () => {
    const arrows = [];
    for (let i = 0; i < 16; i++) {
      arrows.push(
        <Arrow
          key={i}
          direction={currentArrow && currentArrow.position === i ? currentArrow.direction : null}
          color={currentArrow && currentArrow.position === i ? currentArrow.color : 'gray'}
          active={currentArrow && currentArrow.position === i}
        />
      );
    }
    return arrows;
  };

  return <View style={styles.board}>{renderArrows()}</View>;
};

const styles = StyleSheet.create({
  board: {
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: '2%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Board;
