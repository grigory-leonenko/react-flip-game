import React, { useState, useCallback, useContext, useRef, FC } from 'react';
import { SCENES, IStats, ICard, IStack, ISelected, IEngine } from './interfaces';

const VALUES = ['A','K','Q','J','10','9','8','7','6'];
const SYMBOLS = ['diamond', 'spade', 'clover', 'heart'];

const Context = React.createContext<IEngine>({
  scene: SCENES.start,
  stack: [],
  stats: {
    timer: 0,
    moves: 0,
  },
  selected: [],
  startGame: () => {},
  startMatch: () => {},
  finishMatch: () => {},
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
  const timer = useRef<any>(); // TODO Fix typechecking for interval.
  const [stack, setStack] = useState<IStack>([]);
  const [selected, setSelected] = useState<ISelected>([]);
  const [scene, setScene] = useState<SCENES>(SCENES.start);
  const [stats, setStats] = useState<IStats>({
    timer: 0,
    moves: 0,
  });

  const checkGame = () => {
    matched.current++;
    if ((stack.length / 2) === matched.current) {
      clearInterval(timer.current);
      setScene(SCENES.finish);
    }
  };

  const checkMatch = () => {
    const [ left, right ] = selected;
    if (left?.value === right?.value) {
      const updated = stack.map(item => {
        return item === left || item === right ? null : item;
      });
      checkGame();
      setStack(updated);
    }
    setStats(current => ({
      ...current,
      moves: current.moves + 1,    
    }));
  };

  const updateTimer = useCallback(() => {
    setStats(current => ({
      ...current,
      timer: current.timer + 1,
    }));
  }, []);

  const startMatch = useCallback((card) => {
    // Do nothing for second click on selected card
    if (selected.includes(card)) {
      return;
    }
    // Check match and reset selected if third card clicked
    if (selected.length === 2) {
      checkMatch();
      setSelected([ card ]);
    } else {
      setSelected([ ...selected, card ]);
    }
  }, [selected]);

  const finishMatch = useCallback((card) => {
    // Check match only if two cards ready for match
    if (selected[1] === card) {
      checkMatch();
      setSelected([]);
    }
  }, [selected]);

  const startGame = useCallback(() => {
    setScene(SCENES.play);
    setStack(getCards());
    setSelected([]);
    setStats({
      timer: 0,
      moves: 0,
    });
    timer.current = setInterval(updateTimer, 1000);
  }, []);;

  return (
    <Context.Provider 
      value={{
        stack,
        scene,
        stats,
        selected,
        startGame,
        startMatch,
        finishMatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
