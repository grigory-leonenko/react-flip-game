import { EngineProvider } from './hooks/engine';
import { Table } from './components/table/table';

export const Game = () => (
  <EngineProvider>
    <Table />
  </EngineProvider>
);
