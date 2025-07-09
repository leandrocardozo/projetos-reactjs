import { Question } from "@/types/Question";
import { useState } from "react";

type Props = {
  question: Question;
  count: number;
  onAnswer: (answer: number) => void;
};

export const QuestionItem = ({ question, count, onAnswer }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<null | number>(null);

  const checkQuestion = (key: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(key);

      setTimeout(() => {
        onAnswer(key);
        setSelectedAnswer(null);
      }, 2000);
    }
  };

  return (
    <div>
      <div className="text-2xl pb-3 font-bold font">
        {count}. {question.question}
      </div>
      <div>
        {question.options.map((item, key) => (
          <div
            key={key}
            onClick={() => checkQuestion(key)}
            className={`border px-4 py-4 rounded-md mb-2 bg-blue-100 
                  ${selectedAnswer !== null ? "cursor-auto" : "cursor-pointer hover:opacity-60"} 
                  ${
                    selectedAnswer !== null &&
                    selectedAnswer === question.answer &&
                    selectedAnswer === key &&
                    "bg-green-100 border-green-300"
                  }
                  ${
                    selectedAnswer !== null &&
                    selectedAnswer !== question.answer &&
                    selectedAnswer === key &&
                    "bg-red-100 border-red-300"
                  }
                  `}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
