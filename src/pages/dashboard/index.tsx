import { Title } from '@/components';
import api from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Chart } from './components/chart';
import {
  getBestBuyer,
  getBestMedia,
  getBestSaller,
  getSalesDate,
} from './content';
import { CardTopics } from './components/cardTopics';

const fetchUsers = async () => {
  const { data } = await api.get('/clientes');
  const bestSaller = getBestSaller(data);
  const bestMedia = getBestMedia(data);
  const bestBuyer = getBestBuyer(data);
  const chartData = getSalesDate(data);
  return { sales: [bestSaller, bestMedia, bestBuyer], chartData };
};

export function Dashboard() {
  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchUsers,
  });

  return (
    <div className="flex flex-col gap-4">
      <Title>Resultados</Title>
      {data?.chartData !== undefined && (
        <Chart chartData={data.chartData} initialDate={'2024-01-02'} />
      )}
      <section className="flex flex-col md:flex-row gap-4 mt-4 justify-between">
        {data?.sales !== undefined &&
          data.sales.map(sale => (
            <CardTopics
              key={sale.label}
              sale={{
                label: sale.label,
                value: sale.value.toString(),
                name: sale.name,
              }}
            />
          ))}
      </section>
    </div>
  );
}
