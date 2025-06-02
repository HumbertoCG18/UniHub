// src/context/AppContext.jsx
import { createContext, useContext } from 'react';

// 1. Criar o Contexto
export const AppContext = createContext(undefined); // Pode inicializar com undefined ou um valor padrão se fizer sentido

// Hook customizado para usar o AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
    // Ou, se AppContext foi inicializado com um valor padrão, você pode não precisar deste erro.
    // Mas é uma boa prática garantir que o hook é usado corretamente.
  }
  return context;
};