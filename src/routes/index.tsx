import { BrowserRouter, Route, Routes } from 'react-router';
import { Clients, Dashboard, Signin } from '../pages';
import { ProtectedRoute } from './ProtectedRoute';

export function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
