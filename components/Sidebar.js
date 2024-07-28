import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Sidebar = ({ currentLevel, onLevelSelect }) => {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Niveles</Text>
      <TouchableOpacity
        style={[styles.levelButton, currentLevel === 1 && styles.activeLevel]}
        onPress={() => onLevelSelect(1)}
      >
        <Text style={styles.levelText}>Nivel 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.levelButton, currentLevel === 2 && styles.activeLevel]}
        onPress={() => onLevelSelect(2)}
      >
        <Text style={styles.levelText}>Nivel 2</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 150,
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  levelButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  activeLevel: {
    backgroundColor: '#4ECDC4',
  },
  levelText: {
    fontSize: 16,
  },
});

export default Sidebar;
