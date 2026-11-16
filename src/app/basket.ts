export interface Basket {
  id: string;
  quantity: number;
}

export interface BasketCart {
  products: BasketCartProduct[];
}

export interface BasketCartProduct {
  productId: string;
  quantity: number;
}
