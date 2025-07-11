import { ptBR } from 'date-fns/locale';
import type { apiClient } from './interfaces';
import { differenceInDays, format, parseISO } from 'date-fns';

export const getBestSaller = (clients: apiClient[]) => {
  const bestSaller = clients.reduce((accumulator, actual) => {
    const actualQuantity = actual.estatisticas.vendas.length;
    const accumulatorQuantity = accumulator.estatisticas.vendas.length;

    return actualQuantity > accumulatorQuantity ? actual : accumulator;
  });
  return {
    name: bestSaller.info.nomeCompleto || 'Nenhum',
    value: bestSaller.estatisticas.vendas.length || 0,
    label: 'Maiores Vendas',
  };
};

export const getBestMedia = (clients: apiClient[]) => {
  let media = 0;
  const bestMedia = clients.reduce((accumulator, actual) => {
    const dividerActual = actual.estatisticas.vendas.length;
    const dividerAccumulator = accumulator.estatisticas.vendas.length;

    const sumActualValues = actual.estatisticas.vendas.reduce(
      (acc, curr) => acc + curr.valor,
      0,
    );
    const sumAccumulatorValues = accumulator.estatisticas.vendas.reduce(
      (acc, curr) => acc + curr.valor,
      0,
    );

    const getActualMedia = sumActualValues / dividerActual;
    const getAccumulatorMedia = sumAccumulatorValues / dividerAccumulator;
    media =
      getActualMedia > getAccumulatorMedia
        ? getActualMedia
        : getAccumulatorMedia;

    return getActualMedia > getAccumulatorMedia ? actual : accumulator;
  });
  return {
    name: bestMedia.info.nomeCompleto || 'Nenhum',
    value: media || 0,
    label: 'Média de Vendas',
  };
};

export const getBestBuyer = (clients: apiClient[]) => {
  const today = new Date('2024-01-01');
  const days = 30;
  const minPurchases = 2;
  let topBuyer = null;
  let maxPurchases = 0;

  for (const customer of clients) {
    const sales = customer.estatisticas.vendas || [];

    const recentSales = sales.filter(sale => {
      const diff = differenceInDays(today, parseISO(sale.data));
      return diff <= days;
    });

    if (
      recentSales.length >= minPurchases &&
      recentSales.length > maxPurchases
    ) {
      topBuyer = {
        name: customer.info.nomeCompleto,
        email: customer.info.detalhes.email,
        recentPurchases: recentSales.length,
      };
      maxPurchases = recentSales.length;
    }
  }

  return {
    name: topBuyer?.name || 'Nenhum',
    value: topBuyer?.recentPurchases || 0,
    label: 'Comprador(a) frequente',
  };
};

export const getSalesDate = (clients: apiClient[]) => {
  const chatData: { date: string; sales: number }[] = [];
  clients.map(client => {
    client.estatisticas.vendas.forEach(sale => {
      const saleDate = format(new Date(sale.data), 'yyyy-MM-dd', {
        locale: ptBR,
      });
      const verifyDate = chatData.filter(item => item.date === saleDate);
      if (verifyDate.length > 0) {
        chatData[0].sales += sale.valor;
      } else {
        chatData.push({
          date: saleDate,
          sales: sale.valor,
        });
      }
    });
  });
  chatData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  return chatData;
};
