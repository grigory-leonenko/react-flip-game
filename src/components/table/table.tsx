import React, { useEffect, FC } from 'react';
import { motion } from 'framer-motion';

import { Card } from '../card';
import { useEngine, SCENES } from '../../hooks/engine';

import styles from './table.module.css';

export const Table: FC = ({ children }) => {
  const { 
    stack, 
    stats,
    scene, 
    startGame,
  } = useEngine();

  const minutes = Math.floor(stats.timer / 60);
  const seconds = stats.timer - minutes * 60;
  console.log(minutes, seconds)

  return (
    <div className={styles.wrapper}>
      {scene === SCENES.finish && (
        <div className={styles.congrats}>
          Congratulations, you win with result:
        </div>
      )}
      {(scene === SCENES.play || scene === SCENES.finish) && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.counters}
        >
          <div className={styles.counter}>
            {Boolean(minutes) && <span>{minutes} m&nbsp;</span>}
            <span>{seconds} s</span>
          </div>
          <div className={styles.counter}>{stats.moves} moves</div>
        </motion.div>
      )}
      {scene === SCENES.play && (
        <div className={styles.cards}>
          {stack.map(card => (
            <div className={styles.card}>
            {card && <Card card={card} />}
            </div>
          ))}
        </div>
      )}
      {(scene === SCENES.start || scene === SCENES.finish) && (
        <div className={styles.controls}>
          <button 
            className={styles.button} 
            onClick={startGame}
          >
            {scene === SCENES.start ? 'Start!' : 'Restart'}
          </button>
        </div>
      )}
    </div>
  );
};