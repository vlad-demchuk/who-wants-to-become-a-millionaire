import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import questions from '../../api/questions.json';
import totalWin from '../../api/totalWin.json';
import { GameOver } from '../GameOver';
import './Gameplay.scss';

export const Gameplay: React.FC = () => {
  const [questionId, setQuestionId] = useState(0);
  const [question, setQuestion] = useState(questions[0]);
  const [selectedAnswer, setSeletcedAnswer] = useState('');
  const [selectDelay, setSelectDelay] = useState(false);
  const [totalSum] = useState([...totalWin]);
  const [winStage, setWinStage] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeletcedAnswer(event.target.value);

    if (event.target.value !== question.trueAnswer) {
      setTimeout(() => {
        (setSelectDelay(true));
      }, 1000);

      setTimeout(() => {
        (setGameOver(true));
      }, 3000);
    } else {
      setTimeout(() => {
        (setSelectDelay(true));
      }, 1000);

      if (questionId !== 11) {
        setQuestionId((current) => {
          return current + 1;
        });
        setWinStage((current) => {
          return current + 1;
        });
      } else {
        setWinStage((current) => {
          return current + 1;
        });
        setTimeout(() => {
          setGameOver(true);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (questionId !== 0 || questionId <= 11) {
      setTimeout(() => {
        setQuestion(questions[questionId]);
        setSeletcedAnswer('');
        setSelectDelay(false);
      }, 3000);
    }
  }, [questionId]);

  const handleReset = () => {
    setGameOver(false);
    setQuestionId(0);
    setWinStage(0);
    setQuestion(questions[0]);
    setSeletcedAnswer('');
    setSelectDelay(false);
  };

  return (
    <>
      {!gameOver ? (
        <div className="gameplay">
          <div className="desctop-container">
            <img
              src="menu.svg"
              alt="menu"
              className="gameplay__menu-opener"
              onClick={() => {
                setOpenMenu(true);
              }}
              role="presentation"
            />

            <div className="gameplay__quiz">
              <h2 className="gameplay__title">{question.title}</h2>
              <div className="gameplay__buttons">
                {question.answers.map(answer => (
                  <label
                    key={answer}
                    htmlFor={answer}
                    className={classNames(
                      'gameplay__label',
                      { 'gameplay__label--selected': selectedAnswer === answer },
                      { 'gameplay__label--correct': answer === question.trueAnswer && selectDelay },
                      { 'gameplay__label--wrong': selectedAnswer === answer && answer !== question.trueAnswer && selectDelay },
                    )}
                  >
                    <p
                      className="gameplay__answer"
                    >
                      {answer}
                    </p>
                    <input
                      type="radio"
                      name="answer"
                      id={answer}
                      value={answer}
                      checked={selectedAnswer === answer}
                      onChange={handleSelect}
                      disabled={selectedAnswer !== ''}
                    />
                  </label>
                ))}
              </div>
            </div>

          </div>

          <div className={classNames('gameplay__total-win', { 'gameplay__total-win--active': openMenu })}>

            <img
              className="gameplay__menu-closer"
              src="menu-closer.svg"
              alt="menu-closer"
              onClick={() => {
                setOpenMenu(false);
              }}
              role="presentation"
            />

            <ul className="gameplay__winlist">
              {totalSum.reverse().slice(0, -1).map(amout => (
                <li
                  key={amout.id}
                  className={classNames(
                    'gameplay__win-item',
                    { 'gameplay__win-item--grey': question.id > amout.id },
                    { 'gameplay__win-item--active': question.id === amout.id },
                  )}
                >
                  {amout.win}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <GameOver
          onReset={handleReset}
          score={totalWin[winStage].win}
        />
      )}
    </>
  );
};
