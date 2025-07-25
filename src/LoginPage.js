import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

 if (username === 'admin' && password === 'admin123') {
  localStorage.setItem('auth', 'true'); // salva estado de login
  navigate('/resultados');
}

  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <div className="absolute top-4 right-4">
  <button
    onClick={() => navigate('/')}
    className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition"
  >
    <ArrowLeft className="w-5 h-5" />
    Voltar
  </button>
</div>
      <form
        onSubmit={handleLogin}
        className="bg-zinc-800 p-8 rounded-xl shadow-lg max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Acesso Restrito
        </h1>

        {erro && (
          <p className="text-red-500 text-center mb-4">{erro}</p>
        )}

        <label className="block text-zinc-300 mb-1">Usuário:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:border-yellow-400"
          placeholder="Digite o usuário"
        />

        <label className="block text-zinc-300 mb-1">Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:border-yellow-400"
          placeholder="Digite a senha"
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
