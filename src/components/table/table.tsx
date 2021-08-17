import React, { useEffect, FC } from 'react';

import { Card } from '../card';
import { useEngine } from '../../hooks/engine';
import styles from './table.module.css';

export const Table: FC = ({ children }) => {
  const { 
    stack,  
    startGame,
  } = useEngine();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {stack.map(card => <Card card={card} />)}
      </div>
    </div>
  );
};