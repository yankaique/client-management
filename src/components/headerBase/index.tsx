import { useNavigate } from 'react-router';
import { SignedIn, UserButton } from '@clerk/clerk-react';
import { links } from './content';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import Logo from '@/assets/logo.svg';

export const HeaderBase = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  return (
    <div className={cn(className)}>
      <img
        className="w-8 hidden md:block mr-0 md:mr-4"
        src={Logo}
        alt="Logo Management User"
      />
      <section className="flex md:gap-4 gap-2 md:flex-row flex-col">
        {links.map(link => (
          <div key={link.href}>
            <Button
              variant="link"
              className="p-0 text-card-foreground"
              onClick={() => navigate(link.href)}
            >
              {link.label}
            </Button>
          </div>
        ))}
      </section>
      <section className="ml-auto mt-4 self-center md:mt-1  ">
        <SignedIn>
          <UserButton signInUrl="/" />
        </SignedIn>
      </section>
    </div>
  );
};
