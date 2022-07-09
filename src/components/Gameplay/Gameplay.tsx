import React, { useEffect, useState } from 'react';
import questions from '../../api/questions.json';
import { GameOver } from '../GameOver/GameOver';

export const Gameplay: React.FC = () => {
  const [questionId, setQuestionId] = useState(0);
  const [question, setQuestion] = useState(questions[0]);
  const [selectedAnswer, setSeletcedAnswer] = useState('');

  const [gameOver, setGameOver] = useState(false);

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

  // eslint-disable-next-line no-console
  console.log(question, 'outside');

  return (
    <>
      {!gameOver ? (
        <div>
          <h1>Gameplay</h1>
          <h2>{question.title}</h2>
          <div>
            {question.answers.map(answer => (
              <label key={answer} htmlFor={answer}>
                <p>{answer}</p>
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
        </div>
      ) : (
        <GameOver />
      )}
    </>
  );
};
