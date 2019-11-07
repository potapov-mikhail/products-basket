export interface Product {
  _id: string;
  name: string;
  price: number;
  currency: 'RUB' | 'EUR' | 'USD';
}

export interface Basket extends Product {
  quantity: number;
}
