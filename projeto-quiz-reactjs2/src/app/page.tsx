"use client";

import { QuestionItem } from "@/components/QuestionItem";
import { Results } from "@/components/Results";
import { questions } from "@/data/questions";
import { useState } from "react";

const Page = () => {
  const title = "Quiz Reactjs";

  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const loadNextQuestion = () => {
    if (questions[currentQuestion + 1]) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleAnswered = (answer: number) => {
    setAnswers([...answers, answer]);
    loadNextQuestion();
  };

  const handleRestartButton = () => {
    setAnswers([]);
    setShowResult(false);
    setCurrentQuestion(0);
  }

  //prettier-ignore
  return (
    <div className="w-full h-screen flex justify-center items-center bg-sky-800">
      <div className="w-full max-w-xl bg-white rounded-md text-black shadow shadow-black">
        <div className="p-5 font-bold text-3xl shadow shadow-gray-300 rounded-md">{title}</div>
        <div className="p-5">
          {!showResult &&
            <QuestionItem
              question={questions[currentQuestion]}
              count={currentQuestion + 1}
              onAnswer={handleAnswered}
            />
          }
          {showResult &&
            <Results questions={questions} answers={answers} />
          }
        </div>
        <div className="p-5 border-t-2 text-center">
          {!showResult && 
            `${currentQuestion + 1} de ${questions.length} pergunta${questions.length > 1 ? 's' : ''}`
          }
          {showResult &&
          <button onClick={handleRestartButton} className="px-2 py-2 bg-blue-700 text-white rounded-md">Reiniciar Quiz</button>
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
