import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpWideNarrow, ArrowDownWideNarrow, UserIcon } from 'lucide-react';
type CardTopicsProps = {
  sale: {
    label: string;
    value: string;
    name: string;
  };
};

export const CardTopics = ({ sale }: CardTopicsProps) => {
  const classStyle = 'w-6 h-6 text-white';
  const selectIcon = (label: string) => {
    switch (label) {
      case 'Maiores Vendas':
        return <ArrowUpWideNarrow className={classStyle} />;
      case 'Média de Vendas':
        return <ArrowDownWideNarrow className={classStyle} />;
      case 'Comprador(a) frequente':
        return <UserIcon className={classStyle} />;
    }
  };
  return (
    <Card className="flex flex-col sm:flex-row gap-4 w-full p-4">
      <div className="flex flex-row w-12 h-12 p-3 rounded-full bg-primary mt-[2px]">
        {selectIcon(sale.label)}
      </div>
      <div className="flex flex-col w-full">
        <CardHeader className="p-0 margin-0">
          <div className="flex flex-col gap-0.5">
            <CardTitle className="font-normal opacity-50 text-normal margin-0 padding-0">
              {sale.label}
            </CardTitle>
            <p className="text-3xl font-semibold">{sale.value}</p>
          </div>
        </CardHeader>
        <CardContent className="p-0 margin-0">
          <p className="text-normal font-semibold">{sale.name}</p>
        </CardContent>
      </div>
    </Card>
  );
};
