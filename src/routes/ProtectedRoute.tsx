import { HeaderComponent } from '@/components';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router';
import { Toaster } from 'sonner';

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-secondary">
      <HeaderComponent />
      <div className="p-4">{children}</div>
      <Toaster />
    </div>
  );
}
