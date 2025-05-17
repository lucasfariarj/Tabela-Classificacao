import { calcularClassificacao } from "./utils/classificacao";
import jogosPorRodada  from "./data/jogos.json";
import { Jogo, TimeStats } from "./utils/classificacao";

export default function Page() {
  const todosJogos: Jogo[] = (jogosPorRodada  as Rodada[]).flatMap((r) => r.jogos);
  const classificacao: TimeStats[] = calcularClassificacao(todosJogos as Jogo[]);
  


  const escudos: Record<string, string> = {
  Flamengo: "/escudos/flamengo.png",
  Vasco: "/escudos/vasco.png",
  Botafogo: "/escudos/botafogo.png",
  Fluminense: "/escudos/fluminense.png",
  América: "/escudos/america.png",
  Bangu: "/escudos/bangu.png",
};

function getEscudo(time: string) {
  return escudos[time] || "/escudos/default.png";
}

type Jogo = {
  mandante: string;
  visitante: string;
  golsMandante: number | null;
  golsVisitante: number | null;
  data: string;
  local: string;
};

type Rodada = {
  rodada: number;
  jogos: Jogo[];
};



  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tabela de Classificação</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">#</th>
            <th className="p-2">Time</th>
            <th className="p-2">P</th>
            <th className="p-2">J</th>
            <th className="p-2">V</th>
            <th className="p-2">E</th>
            <th className="p-2">D</th>
            <th className="p-2">GP</th>
            <th className="p-2">GC</th>
            <th className="p-2">SG</th>
          </tr>
        </thead>
        <tbody>
  {classificacao.map((time, i) => (
    <tr
  key={time.time}
  className={`border-b ${
    i < 2
      ? "bg-blue-100 "
      : i === classificacao.length - 1
      ? "bg-red-100 "
      : ""
  }`}
>

      <td className="p-2">{i + 1}</td>
      <td className="p-2 flex items-center gap-2">
  <img
    src={getEscudo(time.time)}
    alt={time.time}
    className="w-6 h-6 object-contain"
  />
  <span>{time.time}</span>
</td>

      <td className="p-2">{time.pontos}</td>
      <td className="p-2">{time.jogos}</td>
      <td className="p-2">{time.vitorias}</td>
      <td className="p-2">{time.empates}</td>
      <td className="p-2">{time.derrotas}</td>
      <td className="p-2">{time.golsPro}</td>
      <td className="p-2">{time.golsContra}</td>
      <td className="p-2">{time.saldo}</td>
    </tr>
  ))}
</tbody>

      </table>
            <h2 className="text-xl font-semibold mt-10 mb-4">Jogos por Rodada</h2>
{(jogosPorRodada as Rodada[]).map((rodada) => (
  <div key={rodada.rodada} className="mb-6">
    <h3 className="text-lg font-bold mb-2">Rodada {rodada.rodada}</h3>
    <table className="w-full border-collapse mb-2">
      <thead>
        <tr className="bg-gray-200 text-center">
          <th className="p-2">Mandante</th>
          <th className="p-2">Placar</th>
          <th className="p-2">Visitante</th>
          <th className="p-2">Data</th>
          <th className="p-2">Hora</th>
          <th className="p-2">Local</th>
          
        </tr>
      </thead>
      <tbody>
        {rodada.jogos.map((jogo, i) => {
          const dataObj = new Date(jogo.data);
          const dataFormatada = dataObj.toLocaleDateString("pt-BR");
          const horaFormatada = dataObj.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <tr key={i} className="border-b text-center">
              <td className="p-2 font-medium">{jogo.mandante}</td>
              <td className="p-2">
                {jogo.golsMandante != null && jogo.golsVisitante != null
                  ? `${jogo.golsMandante} x ${jogo.golsVisitante}`
                  : "x"}
              </td>
              <td className="p-2 font-medium">{jogo.visitante}</td>
              <td className="p-2">{dataFormatada}</td>
              <td className="p-2">{horaFormatada}</td>
              <td className="p-2">{jogo.local}</td>
              
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
))}


    </main>
    
  );
}
