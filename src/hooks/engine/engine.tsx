import React, { useState, useCallback, useContext, useRef, FC } from 'react';
import { ICard, IStack, ISelected, IEngine } from './interfaces';

const VALUES = ['A','K','Q','J','10','9','8','7','6'];
const SYMBOLS = ['diamond', 'spade', 'clover', 'heart'];

const Context = React.createContext<IEngine>({
  stack: [],
  selected: null,
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
    console.log(updated);
    setStack(updated);
  }, [stack]);

  const checkStack = useCallback(() => {
    matched.current++;
    if ((stack.length / 2) === matched.current) {
      console.log('finish game');
    }
  }, [stack]);

  const selectCard = useCallback((card, index) => {
      if (selected) {
        if (selected.card.value === card.value) {
          updateStack(selected.index, index);
          checkStack();
        }
        setSelected(null);
      } else {
        setSelected({ card, index });
      }
  }, [selected]);

  const startGame = useCallback(() => {
    setStack(getCards());
    setSelected(null);
  }, []);;

  return (
    <Context.Provider 
      value={{
        stack,
        selected,
        startGame,
        selectCard,
      }}
    >
      {children}
    </Context.Provider>
  );
};
