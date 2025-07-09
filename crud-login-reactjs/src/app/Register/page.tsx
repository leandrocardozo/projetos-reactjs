"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Register() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verifica se as senhas coincidem
    if (senha !== confirmaSenha) {
      setError("As senhas não conferem.");
      return;
    }

    setError("");

    type Usuario = {
      nome: string;
      email: string;
      senha: string;
    };

    const newUser = {
      nome: nome.trim(),
      email: email.trim(),
      senha
    };

    const STORAGE_KEY = 'users';
    // Recupera usuários cadastrados anteriormente
    const arrayUsers: Usuario[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    // Verifica se já existe um usuário com o mesmo e-mail
    const emailExiste = arrayUsers.some((item) => item.email === email.trim());
    if (emailExiste) {
      setError("Email já existe!");
      return;
    }

    // Adiciona novo usuário ao array e salva no localStorage
    arrayUsers.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arrayUsers));

    setShowSuccess(true);

    // Limpa os campos e redireciona para o login após 2 segundos
    setTimeout(() => {
      setNome("");
      setEmail("");
      setSenha("");
      setConfirmaSenha("");
      setShowSuccess(false);
      router.push("/");
    }, 2000);
  };

  return (
    <div className=" bg-wallpaper min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className=" rounded-md shadow-lg p-8 w-full max-w-md border shadow-black backdrop-blur-lg">
        <h1 className="text-gray-600 text-3xl font-bold mb-6 text-center">Cadastro</h1>

        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="text-gray-700 w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-gray-700 w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="text-gray-700 w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Confirme a senha"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            className="text-gray-700 w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
            Cadastrar
          </button>
        </form>

        <Link className="text-blue-900 text-xl hover:underline mt-2 block text-center" href={"/"}>
          Login
        </Link>

        {/* Mensagem temporária de sucesso */}
        {showSuccess && (
          <div className="shadow-black fixed top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-md animate-fadeInUp">
            Cadastro efetuado com sucesso!
          </div>
        )}
      </div>
    </div>
  );
}
