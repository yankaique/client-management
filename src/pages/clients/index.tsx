import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/pages/clients/components/data-table';
import type { Client } from '@/pages/clients/components/columns';
import { columns } from '@/pages/clients/components/columns';
import api from '@/lib/axios';
import { CreateClientDialog } from './components/dialog';
import { Title } from '@/components';

interface apiClient {
  info: {
    nomeCompleto: string;
    detalhes: {
      email: string;
      nascimento: string;
    };
  };
}

const fetchUsers = async () => {
  const { data } = await api.get('/clientes');
  const clients: Client[] = [];
  data.map((client: apiClient) => {
    clients.push({
      name: client.info.nomeCompleto,
      birthdate: client.info.detalhes.nascimento,
      email: client.info.detalhes.email,
      id: client.info.detalhes.email,
    });
  });
  return clients;
};

export function Clients() {
  const { data, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const refetchTable = async () => refetch();

  return (
    <div className="p-4">
      <div className="flex md:items-center items-stretch justify-between md:flex-row flex-col gap-2">
        <Title>Todos os clientes</Title>
        <CreateClientDialog refetch={refetchTable} />
      </div>
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}
