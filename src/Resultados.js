import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mapeamento de candidatos (id → nome e avatar)
const candidatosMap = {
  '1': { name: 'Aksa Tamara (Terrestres)', avatar: '/avatars/avatar_aksa.png' },
  '2': { name: 'Aline Cardoso (Aquáticas)', avatar: '/avatars/avatar_aline.png' },
  '3': { name: 'Ana Pantera (Terrestres)', avatar: '/avatars/avatar_pantera.png' },
  '4': { name: 'Bianca Hayashi (Aquáticas)', avatar: '/avatars/avatar_bianca.png' },
  '5': { name: 'Eder Braga (Terrestres)', avatar: '/avatars/avatar_eder.png' },
  '6': { name: 'Emilly Saglária (Aquáticas)', avatar: '/avatars/avatar_emilly.png' },
  '7': { name: 'Isac Miranda (Operacional)', avatar: '/avatars/avatar_isac.png' },
  '8': { name: 'Isis da Paz (Terrestres)', avatar: '/avatars/avatar_isis.png' },
  '9': { name: 'Karina Andrade ((Aquáticas)', avatar: '/avatars/avatar_karina.png' },
  '10': { name: 'Marjorie Ozaki (Terrestres)', avatar: '/avatars/avatar_marjorie.png' },  
  '11': { name: 'Michele Ayancan (Terrestres)', avatar: '/avatars/avatar_michele.png' },
  '12': { name: 'Nycholas Sousa (Terrestres)', avatar: '/avatars/avatar_nycholas.png' },
  '13': { name: 'Pamela Vitorino (Operacional)', avatar: '/avatars/avatar_pamela.png' },
  '14': { name: 'Rafael Nascimento (Aquáticas)', avatar: '/avatars/avatar_rafael.png' },
  '15': { name: 'Ramiro Vilela (Terrestres)', avatar: '/avatars/avatar_ramiro.png' },
  '16': { name: 'Samira França (Operacional)', avatar: '/avatars/avatar_samira.png' },
  '17': { name: 'Samuel Pereira (Terrestres)', avatar: '/avatars/avatar_samuel.png' },
  '18': { name: 'Sara França (Operacional)', avatar: '/avatars/avatar_sara.png' },
  
};

export default function Resultados() {
  const [resultados, setResultados] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const res = await fetch("http://localhost:4000/votos");
        const votos = await res.json();

        const agrupados = {};
        votos.forEach(voto => {
          const { categoria, candidatoId, nota } = voto;
          if (!agrupados[categoria]) agrupados[categoria] = {};
          if (!agrupados[categoria][candidatoId])
            agrupados[categoria][candidatoId] = { total: 0, count: 0 };
          agrupados[categoria][candidatoId].total += nota;
          agrupados[categoria][candidatoId].count += 1;
        });

        const resultadosFinal = {};
        for (const categoria in agrupados) {
          resultadosFinal[categoria] = Object.entries(agrupados[categoria])
            .map(([candidatoId, data]) => ({
              id: candidatoId,
              nome: candidatosMap[candidatoId]?.name || 'Desconhecido',
              avatar: candidatosMap[candidatoId]?.avatar || '/avatars/default.png',
              media: data.total / data.count,
              total: data.total,
            }))
            .sort((a, b) => b.media - a.media)
            .slice(0, 10);
        }

        setResultados(resultadosFinal);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar resultados:", err);
        setLoading(false);
      }
    };

    fetchResultados();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Carregando resultados...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <img
        src="/logo/logotrofeu.png"
        alt="Prêmio Melhores do Ano 2025"
        className="mx-auto w-[60%] mb-6"
      />
      <h1 className="text-4xl font-bold text-[#C59E33] text-center mb-10">
        Resultado Final da Votação
      </h1>

      {Object.entries(resultados).map(([categoria, candidatos]) => (
        <section key={categoria} className="mb-12">
          <h2 className="text-2xl font-bold text-[#C59E33] mb-6 text-center">
            {categoria} - Top 10
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {candidatos.map((candidato, index) => (
              <div
                key={candidato.id}
                className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg border border-zinc-700 relative"
              >
                <img
                  src={candidato.avatar}
                  alt={candidato.nome}
                  className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-[#C59E33]"
                />
                <span className="font-bold text-lg text-center">{candidato.nome}</span>
                <span className="text-[#C59E33] text-sm mt-1">#{index + 1} Lugar</span>
                <span className="text-zinc-300 text-sm">Pontos Totais: {candidato.total}</span>
                <span className="text-zinc-300 text-sm">Média: {candidato.media.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <button
        onClick={() => {
          localStorage.removeItem('auth');
          navigate('/login');
        }}
        className="mt-8 px-6 py-2 bg-red-500 text-white rounded-lg font-semibold"
      >
        Sair
      </button>
    </div>
  );
}
