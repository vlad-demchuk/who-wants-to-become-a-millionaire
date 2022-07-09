import React, { useState } from 'react';
import './App.scss';
import { Gameplay } from './components/Gameplay/Gameplay';

export const App: React.FC = () => {
  const [startGame, setStartGame] = useState(false);

  return (
    <div className="App">
      {!startGame ? (
        <>
          <h1>Who wants to be a millionaire?</h1>
          <button
            type="button"
            onClick={() => {
              setStartGame(true);
            }}
          >
            Start
          </button>
        </>

      ) : (
        <Gameplay />
      )}
    </div>
  );
};
