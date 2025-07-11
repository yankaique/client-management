import { HeaderBase } from '../headerBase';
import { HeaderMobile } from '../headerMobile';

export const HeaderComponent = () => {
  return (
    <header className="flex flex-row justify-between items-center gap-4 p-4 bg-card border-b shadow-sm">
      <HeaderBase className="w-full hidden md:flex" />
      <HeaderMobile />
    </header>
  );
};
