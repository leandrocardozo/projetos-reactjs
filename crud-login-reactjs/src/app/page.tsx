"use client"; // Indica que o componente será renderizado no client-side (Next.js App Router)

import Link from "next/link";
import { useRouter } from "next/navigation"; // Hook de navegação no Next.js App Router
import { useState } from "react";

export default function Login() {
  // Estados para armazenar dados dos inputs
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  // Estados para controlar exibição de mensagens de sucesso/erro
  const [showLoginSuccess, setShowloginSuccess] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);

  const router = useRouter(); // Usado para redirecionar o usuário

  const STORAGE_KEY = 'users'; // Chave usada no localStorage

  // Função chamada ao clicar no botão "Entrar"
  const handleLogin = () => {
    const storedUsers = localStorage.getItem(STORAGE_KEY); // Recupera lista de usuários salvos

    if (storedUsers) {
      const users = JSON.parse(storedUsers); // Converte string em array de usuários

      // Busca por um usuário com email e senha que correspondem
      const user = users.find((item: { email: string, senha: string }) =>
        item.email === email.trim() && item.senha === senha
      );

      if (user) {
        // Login válido
        setShowloginSuccess(true); // Exibe mensagem de sucesso
        setEmail("");
        setSenha("");
        localStorage.setItem("logado", "true"); // Seta flag indicando que usuário está logado

        // Redireciona para a página de tarefas após 2 segundos
        setTimeout(() => {
          setShowloginSuccess(false);
          router.push("/tasks");
        }, 2000);
      } else {
        // Login inválido
        setShowLoginError(true);
        setTimeout(() => {
          setShowLoginError(false);
        }, 2000);
      }

    } else {
      // Nenhum usuário cadastrado
      console.log("Nenhum usuário cadastrado!");
      setShowLoginError(true);
      setTimeout(() => {
        setShowLoginError(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-wallpaper min-h-screen flex items-center justify-center p-6">
      {/* Container visual do formulário */}
      <div className="rounded-md shadow-lg p-8 w-full max-w-md border shadow-black backdrop-blur-lg">
        <h1 className="text-gray-600 text-3xl font-bold mb-6 text-center">Login</h1>

        {/* Campo de e-mail */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-gray-700 w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Campo de senha */}
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="text-gray-700 w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Botão de login */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>

        {/* Link para a tela de cadastro */}
        <Link href="/Register" className="text-blue-900 mt-2 block text-center">
          Ainda não tem cadastro?
        </Link>

        {/* Alerta de sucesso */}
        {showLoginSuccess && (
          <div className="shadow-black fixed top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-md animate-fadeInUp">
            Login efetuado com sucesso!
          </div>
        )}

        {/* Alerta de erro */}
        {showLoginError && (
          <div className="shadow-black fixed top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded shadow-md animate-fadeInUp">
            Email ou senha inválidos!
          </div>
        )}
      </div>
    </div>
  );
}
