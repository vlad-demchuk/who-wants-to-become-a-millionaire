import React, { useState } from 'react';
import './App.scss';
import { Gameplay } from './components/Gameplay/Gameplay';

export const App: React.FC = () => {
  const [startGame, setStartGame] = useState(false);

  return (
    <div className="App">
      {!startGame ? (
        <div className="container">
          <div className="start-menu">
            <div className="start-menu__logo">
              <img
                className="start-menu__img"
                src="main-img.svg"
                alt="main-img"
              />
            </div>
            <div className="title-container">
              <h1 className="start-menu__title">Who wants to be a millionaire?</h1>
              <button
                className="start-menu__button"
                type="button"
                onClick={() => {
                  setStartGame(true);
                }}
              >
                Start
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Gameplay />
      )}
    </div>
  );
};
