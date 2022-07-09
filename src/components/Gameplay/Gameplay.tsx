import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import questions from '../../api/questions.json';
import totalWin from '../../api/totalWin.json';
import { GameOver } from '../GameOver/GameOver';
import './Gameplay.scss';

export const Gameplay: React.FC = () => {
  const [questionId, setQuestionId] = useState(0);
  const [question, setQuestion] = useState(questions[0]);
  const [selectedAnswer, setSeletcedAnswer] = useState('');

  const [gameOver, setGameOver] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeletcedAnswer(event.target.value);
    if (event.target.value !== question.trueAnswer) {
      setTimeout(() => {
        (setGameOver(true));
      }, 2000);
    } else {
      setQuestionId((current) => {
        return current + 1;
      });
      setSeletcedAnswer('');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setQuestion(questions[questionId]);
    }, 2000);
  }, [questionId]);

  return (
    <>
      {!gameOver ? (
        <div className="gameplay">

          <img
            src="menu.svg"
            alt="menu"
            className="gameplay__menu-opener"
            onClick={() => {
              setOpenMenu(true);
            }}
            role="presentation"
          />

          <h2 className="gameplay__title">{question.title}</h2>

          <div className="gameplay__buttons">
            {question.answers.map(answer => (
              <label
                key={answer}
                htmlFor={answer}
                className="gameplay__label"
              // style={{
              //   backgroundImage: 'url(button.svg)',
              // }}
              >
                <p className="gameplay__answer">{answer}</p>
                <input
                  type="radio"
                  name="answer"
                  id={answer}
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={handleSelect}
                />
              </label>
            ))}
          </div>

          <div className={cn('gameplay__total-win', { 'gameplay__total-win--active': openMenu })}>

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
              {totalWin.reverse().map(amout => (
                <li key={amout.id} className="gameplay__win-item">{amout.win}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <GameOver />
      )}
    </>
  );
};
