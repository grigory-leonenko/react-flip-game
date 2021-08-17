import React, { FC } from 'react';

import clover from '../../images/clover.svg';
import diamond from '../../images/diamond.svg';
import heart from '../../images/heart.svg';
import spade from '../../images/spade.svg';

import { ICard } from '../../hooks/engine';

import styles from './card.module.css';


interface IProps {
  card: ICard | null,
}

const faces: any = {
  diamond, 
  spade, 
  clover, 
  heart,
}

export const Card: FC<IProps> = ({ card }) => {
  const face = card ? faces[card.symbol] : null;

  return (
    <div className={styles.wrapper}>
      {card ? (
        <div className={styles.card}>
          <div className={styles.value}>
            {card.value}
          </div>
          <img 
            className={styles.symbol} 
            src={face} 
            alt={card.symbol} 
          />
        </div>
      ) : null}
    </div>
  );
};