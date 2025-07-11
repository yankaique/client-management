import { useEffect, useState } from 'react';
import { MenuIcon } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { HeaderBase } from '../headerBase';

export const HeaderMobile = () => {
  const [open, setOpen] = useState(false);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex md:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerDescription>Selecione uma opção.</DrawerDescription>
            <HeaderBase />
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Fechar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
