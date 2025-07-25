import React from 'react';

const resultados = {
  'Melhores do Ano': [
    { name: 'Aksa Tamara', avatar: '/avatars/a.png', total: 93 },
    { name: 'Samuel Pereira', avatar: '/avatars/b.png', total: 91 },
    { name: 'Karina Andrade', avatar: '/avatars/b.png', total: 90 },
    { name: 'Ana Pantera', avatar: '/avatars/b.png', total: 89 },
    { name: 'Bianca Hayashi', avatar: '/avatars/b.png', total: 87 },
    { name: 'Isac Miranda', avatar: '/avatars/b.png', total: 86 },
    { name: 'Rafael Nascimento', avatar: '/avatars/b.png', total: 85 },
    { name: 'Sara França', avatar: '/avatars/b.png', total: 83 },
    { name: 'Ramiro Vilela', avatar: '/avatars/b.png', total: 82 },
    { name: 'Stephanie Matos', avatar: '/avatars/b.png', total: 80 },
  ],
  'Revelação do Ano': [
    { name: 'Aline Cardoso', avatar: '/avatars/a.png', total: 94 },
    { name: 'Emilly Saglária', avatar: '/avatars/b.png', total: 92 },
    { name: 'Isis da Paz', avatar: '/avatars/b.png', total: 89 },
    { name: 'Nycholas Sousa', avatar: '/avatars/b.png', total: 87 },
    { name: 'Pamela Vitorino', avatar: '/avatars/b.png', total: 86 },
    { name: 'Mauricio Braga', avatar: '/avatars/b.png', total: 85 },
    { name: 'Samira França', avatar: '/avatars/b.png', total: 84 },
    { name: 'Marjorie Ozaki', avatar: '/avatars/b.png', total: 83 },
    { name: 'Michele Ayancan', avatar: '/avatars/b.png', total: 81 },
    { name: 'Ana Pantera', avatar: '/avatars/b.png', total: 79 },
  ],
};

export default function Resultados() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-yellow-400 text-center mb-10">
        Resultado Final da Votação
      </h1>

      {Object.entries(resultados).map(([categoria, candidatos]) => (
        <section key={categoria} className="mb-12">
          <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">
            {categoria} - Top 10
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {candidatos.map((candidato, index) => (
              <div
                key={candidato.name}
                className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg border border-zinc-700"
              >
                <img
                  src={candidato.avatar}
                  alt={candidato.name}
                  className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-yellow-400"
                />
                <span className="font-bold text-lg text-center">{candidato.name}</span>
                <span className="text-yellow-400 text-sm mt-1">#{index + 1} Lugar</span>
                <span className="text-zinc-300 text-sm">Pontos: {candidato.total}</span>
                <button
  onClick={() => {
    localStorage.removeItem('auth');
    window.location.href = '/';
  }}
  className="absolute top-4 right-4 text-sm bg-red-500 text-white px-3 py-1 rounded"
>
  Sair
</button>

              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
