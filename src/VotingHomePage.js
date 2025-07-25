import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail } from 'lucide-react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VotingHomePage() {
  const navigate = useNavigate(); // Corrigido para dentro do componente

  const categories = [
    {
      title: 'Melhores do Ano',
      candidates: [
        { id: '1', name: 'Aksa Tamara', avatar: '/avatars/a.png' },
        { id: '2', name: 'Aline Cardoso', avatar: '/avatars/b.png' },
        { id: '3', name: 'Ana Pantera', avatar: '/avatars/b.png' },
        { id: '4', name: 'Bianca Hayashi', avatar: '/avatars/b.png' },
        { id: '5', name: 'Emilly Saglária', avatar: '/avatars/b.png' },
        { id: '6', name: 'Isac Miranda', avatar: '/avatars/b.png' },
        { id: '7', name: 'Isis da Paz', avatar: '/avatars/b.png' },
        { id: '8', name: 'Karina Andrade', avatar: '/avatars/b.png' },
        { id: '9', name: 'Marjorie Ozaki', avatar: '/avatars/b.png' },
        { id: '10', name: 'Mauricio Braga', avatar: '/avatars/b.png' },
        { id: '11', name: 'Michele Ayancan', avatar: '/avatars/b.png' },
        { id: '12', name: 'Nycholas Sousa', avatar: '/avatars/b.png' },
        { id: '13', name: 'Pamela Vitorino', avatar: '/avatars/b.png' },
        { id: '14', name: 'Rafael Nascimento', avatar: '/avatars/b.png' },
        { id: '15', name: 'Ramiro Vilela', avatar: '/avatars/b.png' },
        { id: '16', name: 'Samira França', avatar: '/avatars/b.png' },
        { id: '17', name: 'Samuel Pereira', avatar: '/avatars/b.png' },
        { id: '18', name: 'Sara França', avatar: '/avatars/b.png' },
        { id: '19', name: 'Stephanie Matos', avatar: '/avatars/b.png' },
      ],
    },
    {
      title: 'Revelação do Ano',
      candidates: [
        { id: '20', name: 'Aksa Tamara', avatar: '/avatars/a.png' },
        { id: '21', name: 'Aline Cardoso', avatar: '/avatars/b.png' },
        { id: '22', name: 'Ana Pantera', avatar: '/avatars/b.png' },
        { id: '23', name: 'Bianca Hayashi', avatar: '/avatars/b.png' },
        { id: '24', name: 'Emilly Saglária', avatar: '/avatars/b.png' },
        { id: '25', name: 'Isac Miranda', avatar: '/avatars/b.png' },
        { id: '26', name: 'Isis da Paz', avatar: '/avatars/b.png' },
        { id: '27', name: 'Karina Andrade', avatar: '/avatars/b.png' },
        { id: '28', name: 'Marjorie Ozaki', avatar: '/avatars/b.png' },
        { id: '29', name: 'Mauricio Braga', avatar: '/avatars/b.png' },
        { id: '30', name: 'Michele Ayancan', avatar: '/avatars/b.png' },
        { id: '31', name: 'Nycholas Sousa', avatar: '/avatars/b.png' },
        { id: '32', name: 'Pamela Vitorino', avatar: '/avatars/b.png' },
        { id: '33', name: 'Rafael Nascimento', avatar: '/avatars/b.png' },
        { id: '34', name: 'Ramiro Vilela', avatar: '/avatars/b.png' },
        { id: '35', name: 'Samira França', avatar: '/avatars/b.png' },
        { id: '36', name: 'Samuel Pereira', avatar: '/avatars/b.png' },
        { id: '37', name: 'Sara França', avatar: '/avatars/b.png' },
        { id: '38', name: 'Stephanie Matos', avatar: '/avatars/b.png' },
      ],
    },
  ];

  const [email, setEmail] = useState('');
  const [scores, setScores] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

  const handleVote = () => {
    if (!email || !email.includes('@')) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    if (!allScoresFilled()) {
      alert('Por favor, atribua notas de 0 a 10 para todos os candidatos.');
      return;
    }
    console.log('Votando com e-mail:', email);
    console.log('Notas:', scores);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
        <CheckCircle className="text-yellow-400 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold">Voto Registrado com Sucesso!</h1>
        <p className="text-lg mt-2">Obrigado por participar da premiação.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white p-4 sm:p-6">
      <header className="text-center mb-10">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-yellow-400"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Prêmio Melhores do Ano 2025
        </motion.h1>
        <p className="text-zinc-300 mt-2 text-lg">Vote nos seus favoritos da Cristal Acquacenter!</p>
      </header>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-yellow-400 text-yellow-300 px-4 py-2 rounded-lg font-semibold transition"
        >
          <Lock className="w-5 h-5" />
          Resultados da Votação
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {categories.map((cat) => (
          <section key={cat.title}>
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-6 text-center">{cat.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {cat.candidates.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col items-center p-4 rounded-xl border border-zinc-700 bg-zinc-800 bg-opacity-50"
                >
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-yellow-400"
                  />
                  <span className="font-semibold text-center">{c.name}</span>
                  <label className="mt-2 text-sm text-zinc-300">Pontos (0-10)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={scores[cat.title]?.[c.id] ?? ''}
                    onChange={(e) => handleScoreChange(cat.title, c.id, e.target.value)}
                    className="mt-1 w-20 px-2 py-1 rounded bg-zinc-900 text-white border border-zinc-600 focus:border-yellow-400 focus:outline-none text-center"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 max-w-xl mx-auto">
        <label className="block text-zinc-300 mb-2 text-lg flex items-center gap-2">
          <Mail className="w-5 h-5" /> Seu E-mail:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seuemail@exemplo.com"
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:border-yellow-400 focus:outline-none"
        />
        <button
          onClick={handleVote}
          className="mt-4 w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-300 transition"
        >
          Enviar Voto
        </button>
      </div>
    </div>
  );
}
