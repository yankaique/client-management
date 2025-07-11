import { SignedOut, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/assets/logo.svg';

export function Signin() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) navigate('/dashboard');
  }, [isSignedIn]);

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-background gap-4">
      <img className="w-20" src={Logo} alt="Logo Client Management" />
      <h1 className="text-2xl font-semibold">
        Bem-vindo(a) ao Client Management!
      </h1>
      <SignedOut>
        <SignInButton fallbackRedirectUrl="/dashboard" mode="modal">
          <Button variant="link">Clique aqui para entrar!</Button>
        </SignInButton>
      </SignedOut>
    </main>
  );
}
