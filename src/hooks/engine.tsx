import React, { useState, useCallback, useContext, useRef, FC } from 'react';

const VALUES = ['A','K','Q','J','10','9','8','7','6'];
const SYMBOLS = ['diamond', 'spade', 'clover', 'heart'];

export interface ICard {
  value: string,
  symbol: string,
}
export type IStack = (ICard | null)[]
export interface ISelected {
  card: ICard,
  index: number,
}
export interface IEngine {
  stack: IStack,
  startGame: () => void,
  selectCard: (card: ICard, index: number) => void,
}

const Context = React.createContext<IEngine>({
  stack: [],
  startGame: () => {},
  selectCard: () => {},
});

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
    [shuffled[from], shuffled[to]] = [shuffled[to], shuffled[from]];
  }
  return shuffled;
}

export const useEngine = () => {
  return useContext(Context);
};

export const EngineProvider: FC = ({ children }) => {
  const matched = useRef(0);
  const [stack, setStack] = useState<IStack>([]);
  const [selected, setSelected] = useState<ISelected | null>(null);

  const updateStack = useCallback((currentIndex, nextIndex) => {
    const updated = [...stack];
    updated[currentIndex] = null;
    updated[nextIndex] = null;
    setStack(updated);
  }, [stack]);

  const checkState = useCallback(() => {
    matched.current++;
    if ((stack.length / 2) === matched.current) {
      console.log('finish game');
    }
  }, [stack]);

  const selectCard = useCallback((card, index) => {
      if (selected) {
        if (selected.card.value === card.value) {
          updateStack(selected.index, index);
          checkState();
        }
        setSelected(null);
      } else {
        setSelected({ card, index });
      }
  }, [selected]);

  const startGame = useCallback(() => {
    setStack(getCards());
    setSelected(null);
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
