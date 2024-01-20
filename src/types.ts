export type Item = {
  id: number;
  unit: string;
  amount: number;
  price: number;
  name: string;
  tag: string;
  status: boolean;
};

export type Form = {
  name: string;
  tag: string;
  unit: string;
};

export type Input = Form & {
  status: boolean;
};

export type History = HistoryForm & {
  id: number;
};

export type HistoryForm = {
  amount: number;
  price: number;
  unitPrice: number;
  purchased: string;
  itemId: number;
};
