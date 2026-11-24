import { Component, signal } from '@angular/core';
import { AuthApi } from '../auth-api';
import { BasketCart, BasketCartProduct } from '../basket';

@Component({
  imports: [],
  selector: 'app-basket',
  styleUrl: './basket.css',
  templateUrl: './basket.html',
})
export class Basket {
  constructor(private basketApi: AuthApi) {
    this.getBasket();
  }

  public userBasket = signal<BasketCartProduct[]>([]);

  getBasket() {
    this.basketApi.getBasket().subscribe({
      next: (data: BasketCart) => {
        this.userBasket.set(data.products)
        console.log(this.userBasket())
      },
      error: (err: Error) => console.error(err),
    });
  }
}
