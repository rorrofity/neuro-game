import React from 'react';
import Game from './components/Game';

const App = () => {
  return (
    <div style={styles.container}>
      <Game />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F0F0F0',
  },
};

export default App;
