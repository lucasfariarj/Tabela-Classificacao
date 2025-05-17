export interface Jogo {
  mandante: string;
  visitante: string;
  data: string;
  local: string;
  golsMandante: number | null;
  golsVisitante: number | null;
}

export interface TimeStats {
  time: string;
  pontos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  saldo: number;
  jogos: number;
}


export function calcularClassificacao(jogos: Jogo[]): TimeStats[] {
  const tabela: Record<string, TimeStats> = {};

  const atualizaTime = (
    time: string,
    golsPro: number,
    golsContra: number,
    venceu: boolean,
    empate: boolean
  ) => {
    if (!tabela[time]) {
      tabela[time] = {
        time,
        pontos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        golsPro: 0,
        golsContra: 0,
        saldo: 0,
        jogos: 0,
      };
    }

    const entry = tabela[time];
    entry.jogos += 1;
    entry.golsPro += golsPro;
    entry.golsContra += golsContra;
    entry.saldo = entry.golsPro - entry.golsContra;

    if (venceu) {
      entry.pontos += 3;
      entry.vitorias += 1;
    } else if (empate) {
      entry.pontos += 1;
      entry.empates += 1;
    } else {
      entry.derrotas += 1;
    }
  };

  for (const jogo of jogos) {
    const { mandante, visitante, golsMandante, golsVisitante } = jogo;

    if (golsMandante === null || golsVisitante === null) continue;

    const empate = golsMandante === golsVisitante;
    const mandanteVenceu = golsMandante > golsVisitante;
    const visitanteVenceu = golsVisitante > golsMandante;

    atualizaTime(mandante, golsMandante, golsVisitante, mandanteVenceu, empate);
    atualizaTime(visitante, golsVisitante, golsMandante, visitanteVenceu, empate);
  }

  return Object.values(tabela).sort((a, b) => {
    if (b.pontos !== a.pontos) return b.pontos - a.pontos;
    if (b.vitorias !== a.vitorias) return b.vitorias - a.vitorias;
    if (b.saldo !== a.saldo) return b.saldo - a.saldo;
    if (b.golsPro !== a.golsPro) return b.golsPro - a.golsPro;
    return a.time.localeCompare(b.time);
  });
}
