export enum SCENES {
  start,
  play,
  finish,
}

export interface ICard {
  value: string,
  symbol: string,
}

export interface IStats {
  timer: number,
  moves: number,
}

export type IStack = (ICard | null)[]

export type ISelected = ICard[]

export interface IEngine {
  scene: SCENES,
  stack: IStack,
  stats: IStats,
  selected: ISelected,
  startGame: () => void,
  startMatch: (card: ICard) => void,
  finishMatch: (card: ICard) => void,
}