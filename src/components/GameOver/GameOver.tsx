import React from 'react';
import './GameOver.scss';
import totalWin from '../../api/totalWin.json';

type Props = {
  onReset: () => void,
  score: number,
};

export const GameOver: React.FC<Props> = ({ onReset, score }) => {
  return (
    <div className="over">
      <div className="over__page">
        <div>
          <p className="over__score">Total score:</p>
          <h2 className="over__money">{`${totalWin[score].win} earned`}</h2>
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
