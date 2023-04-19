import { Store } from '../../types';

export const buildSelectStores = (salesByStore: Store[] = []) => {
  return salesByStore.map(({ id, name }) => ({
    id,
    name
  }));
};
