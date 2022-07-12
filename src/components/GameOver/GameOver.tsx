import React from 'react';
import './GameOver.scss';

type Props = {
  onReset: () => void,
  score: string,
};

export const GameOver: React.FC<Props> = ({ onReset, score }) => {
  return (
    <div className="over">
      <div className="over__page">
        <div>
          <p className="over__score">Total score:</p>
          <h2 className="over__money">{`${score} earned`}</h2>
        </div>
        <button
          className="over__button"
          type="button"
          onClick={() => {
            onReset();
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
};
