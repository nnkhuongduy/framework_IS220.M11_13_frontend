import { createContext } from 'react';

import { SupplyWithSelected } from 'src/models/supply';

export interface IPostsMangementContext {
  supplies: SupplyWithSelected[];
  setSupplies: React.Dispatch<React.SetStateAction<SupplyWithSelected[]>>;
}

export const PostsMangementContext = createContext<IPostsMangementContext>({
  supplies: [],
  setSupplies: () => {},
});
