import React, { useCallback, useEffect, useRef, useState, FC } from 'react';
import { motion } from 'framer-motion';

import clover from '../../images/clover.svg';
import diamond from '../../images/diamond.svg';
import heart from '../../images/heart.svg';
import spade from '../../images/spade.svg';

import { useEngine } from '../../hooks/engine/engine';
import { ICard } from '../../hooks/engine';

import styles from './card.module.css';
import userEvent from '@testing-library/user-event';
interface IProps {
  card: ICard,
}

const faces: any = {
  diamond, 
  spade, 
  clover, 
  heart,
}

export const Card: FC<IProps> = ({ card }) => {
  const wrapperRef = useRef() as any; // TODO Fix incorrect type checking.
  const { selected, startMatch, finishMatch } = useEngine();
  const isSelected = selected.includes(card);

  const handleTransitionEnd = useCallback(() => {
    if (isSelected) {
      finishMatch(card);
    }
  }, [isSelected, finishMatch]);

  useEffect(() => {
    wrapperRef.current.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('transitionend', handleTransitionEnd);
      }
    }
  }, [handleTransitionEnd, wrapperRef]);

  const handleClickCard = useCallback(() => {
    startMatch(card)
  }, [startMatch]);

  const animations = {
    hidden: { opacity: 0 },
    visible: (active: boolean) => ({
      opacity: 1,
      rotateY: active ? 180 : 0,
    }),
  }

  const transition = {
    rotateY: {
      duration: 0.01,
    }
  }

  return (
    <motion.div
      className={styles.wrapper}
      ref={wrapperRef}
      initial="hidden"
      animate="visible"
      exit="hidden"
      custom={isSelected}
      variants={animations}
      transition={transition}
      onClick={handleClickCard}
    >
      <div className={styles.front}>
        <div className={styles.value}>
          {card.value}
        </div>
        <img 
          className={styles.symbol} 
          src={faces[card.symbol]} 
          alt={card.symbol} 
        />
      </div>
      <div className={styles.back}/>
    </motion.div>
  );
};