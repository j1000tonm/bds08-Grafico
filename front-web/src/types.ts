export type SalesByGender = {
  gender: string;
  sum: number;
};

export type SalesSummary = {
  sum: number;
  min: number;
  max: number;
  avg: number;
  count: number;
};

export type Store = {
  id: number;
  name: string;
};

export type FilterData = {
  store: Store | null;
};

export type PieChartConfig = {
  labels: string[];
  series: number[];
};
