import   { type JSX } from 'react'
import { useAuth } from '../hooks/useTokens';
import { Navigate } from 'react-router-dom';

const UnLoggedUser = ({ children }: { children: JSX.Element }) => {
      const user = useAuth((state) => state.name);
    if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
   
}

export default UnLoggedUser
