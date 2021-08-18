import { EngineProvider } from './hooks/engine/engine';
import { Table } from './components/table/table';

export const Game = () => (
  <EngineProvider>
    <Table />
  </EngineProvider>
);
