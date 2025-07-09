import { Question } from "@/types/Question";

type Props = {
  questions: Question[]; // Lista de todas as perguntas do quiz
  answers: number[];     // Respostas fornecidas pelo usuário (índices)
};

// Componente que exibe o resultado do quiz após a conclusão
export const Results = ({ questions, answers }: Props) => {
  return (
    <div>
      {questions.map((item, key) => (
        <div key={key} className="mb-3">
          {/* Exibe a pergunta */}
          <div className="font-bold">{key + 1}. {item.question}</div>
          
          {/* Verifica se a resposta foi correta ou não */}
          <div>
            <span>
              ({item.answer === answers[key] ? 'Certa resposta!' : 'Resposta errada!'}) - 
            </span>
            {/* Mostra qual era a resposta correta */}
            {item.options[item.answer]}
          </div>
        </div>
      ))}
    </div>
  );
};
