import React from 'react';
import { View, StyleSheet } from 'react-native';
import Arrow from './Arrow';

const Board = ({ currentArrow, arrows }) => {
  return (
    <View style={styles.board}>
      {[...Array(4)].map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {[...Array(4)].map((_, colIndex) => {
            const index = rowIndex * 4 + colIndex;
            let arrowProps;

            if (arrows) {
              // Level 2: All arrows are visible
              arrowProps = {
                direction: arrows[index].direction,
                color: arrows[index].color !== '#E0E0E0' ? arrows[index].color : '#E0E0E0',
                active: arrows[index].color !== '#E0E0E0',
              };
            } else {
              // Level 1: Only current arrow is visible
              arrowProps = {
                direction: currentArrow && currentArrow.position === index ? currentArrow.direction : null,
                color: currentArrow && currentArrow.position === index ? currentArrow.color : '#E0E0E0',
                active: currentArrow && currentArrow.position === index,
              };
            }

            return (
              <View key={colIndex} style={styles.cell}>
                <Arrow {...arrowProps} />
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxWidth: 600,
    maxHeight: 600,
    margin: 'auto',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    margin: 2,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Board;
