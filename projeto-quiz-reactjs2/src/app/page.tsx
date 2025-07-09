"use client"; // Indica que este componente roda no cliente (usado em projetos com Next.js App Router)

// Importação dos componentes e dados necessários
import { QuestionItem } from "@/components/QuestionItem";
import { Results } from "@/components/Results";
import { questions } from "@/data/questions";
import { useState } from "react";

const Page = () => {
  const title = "Quiz Reactjs";

  // Estado para armazenar as respostas do usuário (índices)
  const [answers, setAnswers] = useState<number[]>([]);
  // Define se a tela de resultado deve ser exibida
  const [showResult, setShowResult] = useState(false);
  // Controla a pergunta atual
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Avança para a próxima pergunta ou exibe o resultado
  const loadNextQuestion = () => {
    if (questions[currentQuestion + 1]) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  // Quando o usuário responde uma pergunta
  const handleAnswered = (answer: number) => {
    setAnswers([...answers, answer]);
    loadNextQuestion();
  };

  // Reinicia o quiz
  const handleRestartButton = () => {
    setAnswers([]);
    setShowResult(false);
    setCurrentQuestion(0);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-sky-800">
      <div className="w-full max-w-xl bg-white rounded-md text-black shadow shadow-black">
        {/* Título do quiz */}
        <div className="p-5 font-bold text-3xl shadow shadow-gray-300 rounded-md">{title}</div>
        
        {/* Conteúdo: pergunta ou resultado */}
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

        {/* Rodapé com contagem ou botão de reinício */}
        <div className="p-5 border-t-2 text-center">
          {!showResult && 
            `${currentQuestion + 1} de ${questions.length} pergunta${questions.length > 1 ? 's' : ''}`
          }
          {showResult &&
          <button onClick={handleRestartButton} className="px-2 py-2 bg-blue-700 text-white rounded-md">
            Reiniciar Quiz
          </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
