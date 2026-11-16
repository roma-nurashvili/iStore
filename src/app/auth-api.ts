import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { JWT, login, Register, UserInfo } from './user-info';
import { CookieService } from 'ngx-cookie-service';
import { Basket, BasketCart } from './basket';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of, switchMap, throwError } from 'rxjs';

@Service()
export class AuthApi {
  private authApi = inject(HttpClient);
  private cookie = inject(CookieService)

  token() {
    return {
      headers: {Authorization: `Bearer ${this.cookie.get("user")}`}
    }
  }

  signIn(body: login) {
    return this.authApi.post<JWT>('https://api.everrest.educata.dev/auth/sign_in', body);
  }

  signUp(body: UserInfo) {
    return this.authApi.post<Register>('https://api.everrest.educata.dev/auth/sign_up', body)
  }

  getUserInfo() {
    return this.authApi.get<UserInfo>("https://api.everrest.educata.dev/auth", this.token())
  }

  getBasket() {
    return this.authApi.get<BasketCart>("https://api.everrest.educata.dev/shop/cart", this.token())
  }

  addToBasket(body: Basket) {
    return this.authApi.post<BasketCart>("https://api.everrest.educata.dev/shop/cart/product", body, this.token())
  }

  updateBasket(body: Basket) {
    return this.authApi.patch<BasketCart>("https://api.everrest.educata.dev/shop/cart/product", body, this.token())
  }

  addProductToCart(id: string) {
    return this.getBasket().pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 404) {
          return throwError(() => error);
        }

        return of(undefined);
      }),
      switchMap((basket) => {
        const existingItem = basket?.products.find((item) => item.productId === id);
        const request: Basket = {
          id,
          quantity: (existingItem?.quantity ?? 0) + 1,
        };

        return basket ? this.updateBasket(request) : this.addToBasket(request);
      }),
    );
  }

  deleteItemFromBasket() {
    return this.authApi.delete("https://api.everrest.educata.dev/shop/cart/product", this.token())
  }
}
