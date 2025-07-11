import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const missingLetters = (name: string): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lettersName = new Set(name.toLowerCase().replace(/[^a-z]/g, ''));

  const missing = [...alphabet].filter(letter => !lettersName.has(letter));

  return missing.length === 0 ? '-' : missing.join(', ');
};

export type Client = {
  id: string;
  name: string;
  birthdate: string;
  email: string;
};

export const clients: Client[] = [
  {
    id: '728ed52f',
    name: 'John Doe',
    birthdate: '1990-01-01',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    name: 'John Doe',
    birthdate: '1990-01-01',
    email: 'example@gmail.com',
  },
];

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4 text-primary" />
        </Button>
      );
    },
  },
  {
    id: 'letters',
    header: 'Letras faltantes',
    cell: ({ row }) => {
      const client = row.original;
      return <p>{missingLetters(client.name)}</p>;
    },
  },
  {
    accessorKey: 'birthdate',
    header: 'Data de Nascimento',
    cell: ({ row }) => {
      const client = row.original.birthdate;
      return <p>{format(client, 'dd/MM/yyyy', { locale: ptBR })}</p>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const client = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Opções</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(client.email)}
            >
              Copiar Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
