import React, { useState, useCallback, useContext, FC } from 'react';

interface ICard {
  value: string,
  symbol: string,
}

const VALUES = ['A','K','Q','J','10','9','8','7','6'];
const SYMBOLS = ['diamond', 'spade', 'clover', 'heart'];

const cards = VALUES.reduce<ICard[]>((result, value) => {
  return SYMBOLS.reduce((chunk, symbol) => {
    chunk.push({ value, symbol });
    return chunk;
  }, result);
}, []);

const getCards = () => {
  const shuffled = [ ...cards ];
  for (let from = shuffled.length - 1; from > 0; from--) {
    const to = Math.floor(Math.random() * (from + 1));
    [shuffled[from], shuffled[to]] = [shuffled[from], shuffled[to]];
  }
  return shuffled;
}

const Context = React.createContext({});

export const useEngine = () => {
  return useContext(Context);
};

export const EngineProvider: FC = ({ children }) => {
  const [stack, setStack] = useState<ICard[]>([]);

  const selectCard = useCallback((index) => {
    
  }, [stack]);

  const startGame = useCallback(() => {
    setStack(getCards());
  }, []);

  return (
    <Context.Provider 
      value={{
        stack,
        startGame,
        selectCard,
      }}
    >
      {children}
    </Context.Provider>
  );
};
