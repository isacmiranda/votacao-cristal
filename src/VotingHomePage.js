import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VotingHomePage() {
  const navigate = useNavigate(); 

  const categories = [
    {
      title: 'Melhores do Ano',
      candidates: [
        { id: '1', name: 'Aksa Tamara', avatar: '/avatars/avatar_aksa.png' },
        { id: '2', name: 'Aline Cardoso', avatar: '/avatars/avatar_aline.png' },
        { id: '3', name: 'Ana Pantera', avatar: '/avatars/avatar_pantera.png' },
        { id: '4', name: 'Bianca Hayashi', avatar: '/avatars/avatar_bianca.png' },
        { id: '5', name: 'Emilly Saglária', avatar: '/avatars/avatar_emilly.png' },
        { id: '6', name: 'Isac Miranda', avatar: '/avatars/avatar_isac.png' },
        { id: '7', name: 'Isis da Paz', avatar: '/avatars/avatar_isis.png' },
        { id: '8', name: 'Karina Andrade', avatar: '/avatars/avatar_karina.png' },
        { id: '9', name: 'Marjorie Ozaki', avatar: '/avatars/avatar_marjorie.png' },
        { id: '10', name: 'Mauricio Braga', avatar: '/avatars/avatar_mauricio.png' },
        { id: '11', name: 'Michele Ayancan', avatar: '/avatars/avatar_michele.png' },
        { id: '12', name: 'Nycholas Sousa', avatar: '/avatars/avatar_nycholas.png' },
        { id: '13', name: 'Pamela Vitorino', avatar: '/avatars/avatar_pamela.png' },
        { id: '14', name: 'Rafael Nascimento', avatar: '/avatars/b.png' },
        { id: '15', name: 'Ramiro Vilela', avatar: '/avatars/avatar_ramiro.png' },
        { id: '16', name: 'Samira França', avatar: '/avatars/avatar_samira.png' },
        { id: '17', name: 'Samuel Pereira', avatar: '/avatars/avatar_samuel.png' },
        { id: '18', name: 'Sara França', avatar: '/avatars/avatar_sara.png' },
        { id: '19', name: 'Stephanie Matos', avatar: '/avatars/b.png' },
      ],
    },
  ];

  const [nome, setNome] = useState('');
  const [scores, setScores] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const BACKEND_URL = 'http://localhost:4000'; // ajuste se necessário

  const handleScoreChange = (category, candidateId, value) => {
    const numericValue = Math.max(0, Math.min(10, Number(value)));
    setScores((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [candidateId]: numericValue,
      },
    }));
  };

  const allScoresFilled = () => {
    return categories.every((cat) =>
      cat.candidates.every((c) => scores[cat.title]?.[c.id] !== undefined)
    );
  };

  const handleVote = async () => {
    if (!nome || nome.length < 3) {
      alert('Por favor, insira seu nome completo.');
      return;
    }
    if (!allScoresFilled()) {
      alert('Por favor, atribua notas de 0 a 10 para todos os candidatos.');
      return;
    }

    try {
      // Monta um array com todos os votos
      const votos = [];
      categories.forEach((cat) => {
        cat.candidates.forEach((c) => {
          votos.push({
            nome,
            categoria: cat.title,
            candidatoId: c.id,
            nota: scores[cat.title][c.id],
          });
        });
      });

      // Envia todos os votos em um único POST
      const response = await fetch(`${BACKEND_URL}/votar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ votos }), // backend precisa aceitar { votos: [...] }
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Erro ao registrar votos. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar votos:', error);
      alert('Ocorreu um erro ao registrar o voto. Tente novamente.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
        <CheckCircle className="text-[#C59E33] w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold">Voto Registrado com Sucesso!</h1>
        <p className="text-lg mt-2">Obrigado por participar da votação.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white p-4 sm:p-6">
      <header className="text-center mb-10">
        <motion.img
          src="logo/logotrofeu.png"
          alt="Prêmio Melhores do Ano 2025"
          className="mx-auto w-[60%] mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      </header>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-[#C59E33] text-[#C59E33] px-4 py-2 rounded-lg font-semibold transition"
        >
          <Lock className="w-5 h-5" />
          Resultados da Votação
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {categories.map((cat) => (
          <section key={cat.title}>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#C59E33] mb-6 text-center">{cat.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {cat.candidates.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col items-center p-4 rounded-xl border border-zinc-700 bg-zinc-800 bg-opacity-50"
                >
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-[#C59E33]"
                  />
                  <span className="font-semibold text-center">{c.name}</span>
                  <label className="mt-2 text-sm text-zinc-300">Pontos (0-10)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={scores[cat.title]?.[c.id] ?? ''}
                    onChange={(e) => handleScoreChange(cat.title, c.id, e.target.value)}
                    className="mt-1 w-20 px-2 py-1 rounded bg-zinc-900 text-white border border-zinc-600 focus:border-[#C59E33] focus:outline-none text-center"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 max-w-xl mx-auto">
        <label className="block text-zinc-300 mb-2 text-lg flex items-center gap-2">
          <User className="w-5 h-5" /> Nome Completo:
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome completo"
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:border-[#C59E33] focus:outline-none"
        />
        <button
          onClick={handleVote}
          className="mt-4 w-full bg-[#C59E33] text-black font-bold py-2 rounded-lg hover:bg-[#C59E33] transition"
        >
          Enviar Voto
        </button>
      </div>
    </div>
  );
}
