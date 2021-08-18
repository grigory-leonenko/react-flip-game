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
  selected: ISelected | null,
  startGame: () => void,
  selectCard: (card: ICard, index: number) => void,
}