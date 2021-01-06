import { AppRouter } from './routers/AppRouter';
import { AuthContext } from './auth/AuthContext';
import { useReducer } from 'react';
import { authReducer } from './auth/authReducer';

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false };
};

export const HeroesApp = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
};
