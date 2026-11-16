import { Component, signal } from '@angular/core';
import { AuthApi } from '../auth-api';
import { BasketCart } from '../basket';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [],
  selector: 'app-basket',
  styleUrl: './basket.css',
  templateUrl: './basket.html',
})
export class Basket {
  constructor(private basketApi: AuthApi) {
    this.getBasket()
  }

  public userBasket = signal<BasketCart | undefined>(undefined)

  getBasket() {
    this.basketApi.getBasket().subscribe({
      next: (data: BasketCart) => this.userBasket.set(data),
      error: (error: HttpErrorResponse) => {
        if (error.status !== 404) {
          console.error(error);
        }
      },
    })
  }
}
