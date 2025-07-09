"use client";

import { listReducer } from "@/reducers/listReducer"; // Reducer para gerenciar o estado da lista de tarefas
import { TaskItem } from "@/types/TaskItem"; // Tipo da tarefa
import { useRouter } from "next/navigation"; // Hook para navegação programática do Next.js
import { useEffect, useReducer, useRef, useState } from "react";

const Page = () => {
  const router = useRouter(); // Instancia o roteador

  // Estado que contém a lista de tarefas, usando reducer para manipulação
  const [listTask, dispatch] = useReducer(listReducer, []);
  const [textInput, setTextInput] = useState(""); // Estado para o texto digitado no input

  // Guarda id da tarefa para deletar (usado para confirmar remoção, mas aqui está meio solto)
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  // Estado que controla a exibição do modal de confirmação para limpar todas as tarefas
  const [showConfirm, setShowConfirm] = useState(false);

  // Estado que controla a exibição do modal de sucesso (quando todas tarefas são concluídas)
  const [showSucessModal, setShowSucessModal] = useState(false);

  // Contagem de quantas tarefas estão marcadas como feitas (checked)
  const checkedCount = listTask.filter((item) => item.checked).length;

  // Referência para o input, para focar ele automaticamente após adicionar tarefa
  const inputRef = useRef<HTMLInputElement>(null);

  // Ref para guardar o estado anterior se todas as tarefas estavam marcadas, para evitar efeito disparado várias vezes
  const beforeAllTasksCheckedRef = useRef(false);

  // Função para adicionar tarefa na lista
  const handleAddTask = () => {
    const trimmedInput = textInput.trim(); // Remove espaços desnecessários

    if (!trimmedInput) return setTextInput(""); // Se estiver vazio, limpa input e sai (não adiciona nada)

    dispatch({
      type: "addTask",
      payload: {
        text: trimmedInput, // Texto da nova tarefa
      },
    });

    setTextInput(""); // Limpa o campo input
    inputRef.current?.focus(); // Retorna o foco para o input para facilitar digitação contínua
  };

  // Função para remover uma tarefa pelo seu id
  const handleDeleteTask = (id: number) => {
    dispatch({
      type: "removeTask",
      payload: { id },
    });
  };

  // Função para marcar ou desmarcar uma tarefa (toggle do checked)
  const toggleCheckboxItem = (id: number) => {
    dispatch({
      type: "toogleDoneTask",
      payload: { id },
    });
  };

  // Função para limpar todas as tarefas
  const handleClearTasks = () => {
    dispatch({ type: "clearAllTasks" });
  };

  // Função que permite adicionar tarefa ao pressionar Enter no input
  const handleKeyUpAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  // Confirma limpeza de todas as tarefas (chama clear e fecha o modal)
  const handleConfirmDelete = () => {
    handleClearTasks();
    setShowConfirm(false);
  };

  // Cancela a limpeza de tarefas (fecha o modal de confirmação)
  const handleCancelDelete = () => {
    setIdToDelete(null);
    setShowConfirm(false);
  };

  // Efeito para mostrar modal de sucesso quando todas as tarefas estiverem marcadas
  useEffect(() => {
    const allTasksChecked = checkedCount === listTask.length && listTask.length > 0;

    // Só mostra modal se mudou para todas marcadas (evita disparo repetido)
    if (allTasksChecked && !beforeAllTasksCheckedRef.current) {
      setShowSucessModal(true);
      setTimeout(() => {
        setShowSucessModal(false); // Fecha modal após 2s
      }, 2000);
    }

    beforeAllTasksCheckedRef.current = allTasksChecked; // Atualiza estado anterior
  }, [listTask]);

  // Função de logout: marca usuário como deslogado e redireciona para login
  const handleLogout = () => {
    localStorage.setItem("logado", "false");
    router.push("/");
  };

  return (
    <div className="container mx-auto">
      {/* Botão de logout no topo */}
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="mt-2 italic bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Espaço para título vazio - pode ser removido */}
      <h1 className="text-center mt-40 mb-4 text-4xl"></h1>

      {/* Container principal da lista de tarefas */}
      <div className="flex flex-col mx-auto p-5 rounded-md max-w-xl shadow-black shadow-xl border">

        {/* Input para nova tarefa e botões */}
        <div className="flex">
          <input
            ref={inputRef}
            onKeyUp={handleKeyUpAdd} // Adiciona ao apertar Enter
            value={textInput}
            onChange={(event) => setTextInput(event.target.value)} // Atualiza estado do texto
            className="w-full flex-1 mr-6 p-2 rounded-md text-gray-800 text-sm italic focus:outline-none bg-gray-300 focus:bg-gray-100"
            type="text"
            placeholder="O que tenho para fazer.."
          />
          <button
            onClick={handleAddTask}
            className="transition-all duration-200 hover:translate-x-1 shadow-md shadow-black border px-4 text-2xl rounded-md bg-green-600"
          >
            Adicionar
          </button>
          <button
            onClick={() => setShowConfirm(true)} // Abre modal para confirmar limpeza
            className="transition-all duration-200 hover:translate-x-1 shadow-md shadow-black border rounded-md text-sm ml-2 px-2 font-bold bg-red-600"
          >
            Limpar
          </button>
        </div>

        {/* Mensagem com quantidade de tarefas ou aviso que está vazio */}
        <div className="text-gray-800 text-center italic py-3">
          {listTask.length === 0
            ? "Nenhuma tarefa adicionada!"
            : `${listTask.length} ${listTask.length === 1 ? "tarefa" : "tarefas"} 
            adicionad${listTask.length === 1 ? "a" : "as"} com sucesso!`}
        </div>

        {/* Lista das tarefas */}
        <ul className="text-xl">
          {listTask.map((item) => (
            <li
              key={item.id}
              className="bg-orange-100 text-green-900 transition-all duration-200 hover:translate-x-1 hover:opacity-60 flex w-full justify-between items-center shadow-md shadow-black my-2 rounded-md px-2 py-3"
            >
              {/* Checkbox para marcar tarefa */}
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheckboxItem(item.id)}
              />

              {/* Texto da tarefa, riscado se marcada */}
              <span className={`flex-1 text-center ${item.checked ? "line-through text-black opacity-30" : ""}`}>
                {item.label}
              </span>

              {/* Botão para deletar tarefa */}
              <button className="text-black" onClick={() => handleDeleteTask(item.id)}>
                {/* Ícone de lixeira */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {/* Modal de confirmação para limpar todas as tarefas */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="animate-shake bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
              <p className="text-lg font-semibold text-gray-800 mb-4">
                Tem certeza que deseja limpar todas as tarefas?
              </p>
              <div className="flex justify-around mt-4">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sim, limpar
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de sucesso quando todas tarefas forem marcadas */}
        {showSucessModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="animate-shake bg-white rounded-lg p-6 shadow-lg animate-fadeInUp flex flex-col items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-green-600 animate-pop"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="currentColor"
                  strokeWidth={2}
                  d="M9 12l2 2l4-4"
                />
              </svg>
              <p className="text-lg font-semibold text-gray-600">Tarefas concluídas com sucesso!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
