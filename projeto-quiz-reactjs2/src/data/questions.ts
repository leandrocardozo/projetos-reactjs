import { Question } from "@/types/Question";

// Lista de perguntas do quiz, cada item possui:
// - question: texto da pergunta
// - options: array com 4 alternativas
// - answer: índice da opção correta (0 a 3)

export const questions: Question[] = [
  {
    question: "Para que serve a função setVariavel em um useState?",
    options: [
      "Para alterar o valor da state associada.",
      "Para criar uma nova variável global.",
      "Para resetar o componente.",
      "Para exportar o valor da variável.",
    ],
    answer: 0,
  },
  {
    question: "O que acontece quando se altera um state em React?",
    options: [
      "O componente é reprocessado (re-render).",
      "O componente é removido da árvore.",
      "Nada acontece até atualizar manualmente.",
      "O state se torna imutável.",
    ],
    answer: 0,
  },
  {
    question: "Qual é a forma correta de declarar um componente funcional em React?",
    options: [
      "const MeuComponente = () => { return <div>Olá</div>; };",
      "function = MeuComponente() { return 'Olá'; }",
      "component MeuComponente() { render <div /> }",
      "React.component MeuComponente() => <div>Olá</div>;",
    ],
    answer: 0,
  },
  {
    question: "Qual hook é utilizado para controlar valores que mudam ao longo do tempo?",
    options: [
      "useState",
      "useClass",
      "useChange",
      "useController",
    ],
    answer: 0,
  },
  {
    question: "O que deve conter dentro de um componente React?",
    options: [
      "JSX que define o que será exibido.",
      "Apenas arquivos CSS.",
      "Somente funções de API.",
      "Instruções SQL.",
    ],
    answer: 0,
  }
];
