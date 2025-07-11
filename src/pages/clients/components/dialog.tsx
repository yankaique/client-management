import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import api from '@/lib/axios';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from './datePicker';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .min(2, 'Email deve ter pelo menos 2 caracteres')
    .max(50, 'Email deve ter no máximo 50 caracteres'),
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  birthdate: z.date(),
});

export function CreateClientDialog({ refetch }: { refetch: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      birthdate: new Date(),
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await api.post('/clientes', {
        info: {
          nomeCompleto: values.name,
          detalhes: {
            email: values.email,
            nascimento: values.birthdate,
          },
        },
        estatisticas: {
          vendas: [],
        },
      });

      refetch();
      form.reset();
    } catch (error) {
      toast('Houve um erro ao adicionar o cliente');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <div className="flex items-center gap-0.5">
            <Plus className="h-4 w-4" />
            Adicionar cliente
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar cliente</DialogTitle>
          <DialogDescription>Informe os dados do cliente</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthdate"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <DatePicker name="birthdate" control={form.control} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="align-self-end">
                Adicionar
              </Button>
            </form>
          </Form>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
}
