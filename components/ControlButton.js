import React from 'react';

const ControlButton = ({ title, onPress, color, style }) => {
  const gradientColors = color === '#4ECDC4' ? ['#4ECDC4', '#45B7D1'] :
                         color === '#FF6B6B' ? ['#FF6B6B', '#FF8E8E'] :
                         ['#45B7D1', '#4ECDC4'];

  const buttonStyle = {
    ...styles.button,
    ...style,
    background: `linear-gradient(to bottom right, ${gradientColors[0]}, ${gradientColors[1]})`,
  };

  return (
    <button onClick={onPress} style={buttonStyle}>
      <span style={styles.buttonText}>{title}</span>
    </button>
  );
};

const styles = {
  button: {
    borderRadius: '25px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 20px',
    minWidth: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default ControlButton;
