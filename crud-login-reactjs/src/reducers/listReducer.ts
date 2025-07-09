import { TaskItem } from "@/types/TaskItem";

// Ações possíveis no reducer

// Adiciona uma nova tarefa
type AddAction = {
  type: "addTask";
  payload: {
    text: string;
  };
};

// Edita o texto de uma tarefa existente
type EditAction = {
  type: "editTask";
  payload: {
    id: number;
    newText: string;
  };
};

// Marca ou desmarca uma tarefa como concluída
type ToogleAction = {
  type: "toogleDoneTask";
  payload: {
    id: number;
  };
};

// Remove uma tarefa da lista
type RemoveAction = {
  type: "removeTask";
  payload: {
    id: number;
  };
};

// Limpa todas as tarefas
type ClearAction = {
  type: "clearAllTasks";
};

// Tipo unificado para todas as ações
type ListAction = AddAction | EditAction | ToogleAction | RemoveAction | ClearAction;

// Reducer da lista de tarefas
export const listReducer = (listTask: TaskItem[], action: ListAction) => {
  switch (action.type) {
    // Adiciona nova tarefa à lista
    case "addTask":
      return [
        ...listTask,
        {
          id: Date.now(),          // Gera ID baseado na data atual
          label: action.payload.text,
          checked: false           // Começa como não concluída
        }
      ];

    // Edita o texto de uma tarefa específica
    case "editTask":
      return listTask.map((item) =>
        item.id === action.payload.id
          ? { ...item, label: action.payload.newText }
          : item
      );

    // Alterna o estado de conclusão da tarefa
    case "toogleDoneTask":
      return listTask.map((item) =>
        item.id === action.payload.id
          ? { ...item, checked: !item.checked }
          : item
      );

    // Remove uma tarefa pelo ID
    case "removeTask":
      return listTask.filter((item) => item.id !== action.payload.id);

    // Limpa todas as tarefas da lista
    case "clearAllTasks":
      return [];

    // Caso não reconheça a ação, retorna a lista original
    default:
      return listTask;
  }
};
