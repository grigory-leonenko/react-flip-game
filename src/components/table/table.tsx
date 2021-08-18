import React, { useEffect, FC } from 'react';
import { useTransition } from 'react-spring';

import { Card } from '../card';
import { useEngine } from '../../hooks/engine/engine';

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
      <div className={styles.counters}>
        <div className={styles.counter}>3m 45s</div>
        <div className={styles.counter}>5 steps</div>
      </div>
      <div className={styles.cards}>
        {stack.map((card, index) => (
          <div className={styles.card}>
           {card && <Card card={card} index={index} />}
          </div>
        ))}
      </div>
    </div>
  );
};