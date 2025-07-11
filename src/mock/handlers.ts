import { http, HttpResponse, passthrough } from 'msw';

const db = {
  data: {
    clientes: [
      {
        info: {
          nomeCompleto: 'Ana Beatriz',
          detalhes: {
            email: 'ana.b@example.com',
            nascimento: '1992-05-01',
          },
        },
        estatisticas: {
          vendas: [
            { data: '2024-01-01', valor: 150 },
            { data: '2024-01-02', valor: 50 },
          ],
        },
      },
      {
        info: {
          nomeCompleto: 'Carlos Eduardo',
          detalhes: {
            email: 'cadu@example.com',
            nascimento: '1987-08-15',
          },
        },
        duplicado: {
          nomeCompleto: 'Carlos Eduardo',
        },
        estatisticas: {
          vendas: [
            {
              data: '2023-12-01',
              valor: 300,
            },
            {
              data: '2023-11-02',
              valor: 501,
            },
          ],
        },
      },
    ],
  },
  meta: {
    registroTotal: 2,
    pagina: 1,
  },
  redundante: {
    status: 'ok',
  },
};

export const handlers = [
  http.get('/api/clientes', () => {
    return HttpResponse.json(db.data.clientes);
  }),

  http.post('/api/clientes', async ({ request }: { request: Request }) => {
    const newClient = await request.json();
    if (!newClient) {
      return HttpResponse.json(
        { error: 'Cliente inválido' },
        { type: 'error', status: 400 },
      );
    }
    const hasClient = db.data.clientes.filter(
      c => c.info.detalhes.email === newClient.info.detalhes.email,
    );
    if (hasClient.length > 0) {
      return HttpResponse.json(
        { error: 'Cliente já cadastrado' },
        { type: 'error', status: 400 },
      );
    }
    db.data.clientes.push(newClient);
    return HttpResponse.json(newClient, { status: 201 });
  }),

  http.delete('/api/clientes', async ({ request }: { request: Request }) => {
    const { email } = await request.json();
    if (!email) {
      return HttpResponse.json(
        { error: 'Email inválido' },
        { type: 'error', status: 400 },
      );
    }
    const hasClient = db.data.clientes.filter(
      c => c.info.detalhes.email !== email,
    );
    if (hasClient.length === 0) {
      return HttpResponse.json(
        { error: 'Cliente não encontrado' },
        { type: 'error', status: 400 },
      );
    }
    db.data.clientes = hasClient;
    return HttpResponse.json({ status: 'Cliente removido' }, { status: 200 });
  }),

  http.all('https://*.clerk.dev/*', passthrough),

  http.all('https://*.clerk.accounts.dev/*', passthrough),
];
