export interface apiClient {
  info: {
    nomeCompleto: string;
    detalhes: {
      email: string;
      nascimento: string;
    };
  };
  estatisticas: {
    vendas: {
      data: string;
      valor: number;
    }[];
  };
}
