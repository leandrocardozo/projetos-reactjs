import { Question } from "@/types/Question";
import { useState } from "react";

type Props = {
  question: Question; // Objeto com pergunta, opções e resposta correta
  count: number;      // Número da pergunta atual (ex: 1 de 10)
  onAnswer: (answer: number) => void; // Callback que recebe a resposta do usuário
};

export const QuestionItem = ({ question, count, onAnswer }: Props) => {
  // Estado para controlar qual opção o usuário selecionou
  const [selectedAnswer, setSelectedAnswer] = useState<null | number>(null);

  // Verifica se o usuário já respondeu, se não, registra a resposta e chama o callback após 2s
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
      {/* Pergunta com número */}
      <div className="text-2xl pb-3 font-bold font">
        {count}. {question.question}
      </div>

      {/* Lista de opções de resposta */}
      <div>
        {question.options.map((item, key) => (
          <div
            key={key}
            onClick={() => checkQuestion(key)}
            className={`border px-4 py-4 rounded-md mb-2 bg-blue-100 
              ${selectedAnswer !== null ? "cursor-auto" : "cursor-pointer hover:opacity-60"} 

              ${selectedAnswer !== null && selectedAnswer === question.answer && selectedAnswer === key && "bg-green-100 border-green-300"}

              ${selectedAnswer !== null && selectedAnswer !== question.answer && selectedAnswer === key && "bg-red-100 border-red-300"}
            `}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
