import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { ptBR } from 'react-day-picker/locale';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useController } from 'react-hook-form';
import { type Control } from 'react-hook-form';

type MyFormData = {
  email: string;
  name: string;
  birthdate: Date;
};

type DatePickerProps = {
  name: keyof MyFormData;
  control: Control<MyFormData>;
  label?: string;
};

export function DatePicker({
  name,
  control,
  label = 'Data de Nascimento',
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={name} className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {value
              ? new Date(value).toLocaleDateString()
              : 'Selecione uma data'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            captionLayout="dropdown"
            onSelect={date => {
              onChange(date);
              setOpen(false);
            }}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
