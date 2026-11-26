import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApi } from '../auth-api';
import { BasketCart, BasketCartProduct } from '../basket';
import { ProductsAPI } from '../products-api';
import { productItem } from '../product';
import { forkJoin } from 'rxjs';

@Component({
  imports: [CommonModule],
  selector: 'app-basket',
  styleUrl: './basket.css',
  templateUrl: './basket.html',
})
export class Basket {
  constructor(private basketApi: AuthApi, private productApi: ProductsAPI) {
    this.getBasket();
  }

  public userBasket = signal<BasketCartProduct[]>([]);
  public productItem = signal<productItem[]>([]);
  public basketItems = signal<{ basketItem: BasketCartProduct; product: productItem }[]>([]);
  public pendingProductIds = signal<string[]>([]);
  public itemsCount = computed(() =>
    this.basketItems().reduce((count, item) => count + item.basketItem.quantity, 0),
  );
  public subtotal = computed(() =>
    this.basketItems().reduce(
      (total, item) => total + item.product.price.current * item.basketItem.quantity,
      0,
    ),
  );

  getBasket() {
    this.basketApi.getBasket().subscribe({
      next: (data: BasketCart) => {
        this.userBasket.set(data.products);
        if (data.products.length === 0) {
          this.productItem.set([]);
          this.basketItems.set([]);
          return;
        }

        forkJoin(data.products.map((item) => this.productApi.viewDetails(item.productId))).subscribe({
          next: (products: productItem[]) => {
            this.productItem.set(products);
            this.basketItems.set(
              data.products.flatMap((basketItem) => {
                const product = products.find((item) => item._id === basketItem.productId);
                return product ? [{ basketItem, product }] : [];
              }),
            );
          },
          error: (err: Error) => console.error(err),
        });
      },
      error: (err: Error) => console.error(err),
    });
  }

  changeQuantity(productId: string, quantity: number) {
    if (quantity < 1 || this.pendingProductIds().includes(productId)) {
      return;
    }

    this.setProductPending(productId, true);
    this.basketApi.updateBasket({ id: productId, quantity }).subscribe({
      next: () => {
        this.userBasket.update((items) =>
          items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          ),
        );
        this.basketItems.update((items) =>
          items.map((item) =>
            item.product._id === productId
              ? { ...item, basketItem: { ...item.basketItem, quantity } }
              : item,
          ),
        );
        this.setProductPending(productId, false);
      },
      error: (err: Error) => {
        console.error(err);
        this.setProductPending(productId, false);
      },
    });
  }

  deleteProduct(productId: string) {
    if (this.pendingProductIds().includes(productId)) {
      return;
    }

    this.setProductPending(productId, true);
    this.basketApi.removeFromBasket(productId).subscribe({
      next: () => {
        this.userBasket.update((items) => items.filter((item) => item.productId !== productId));
        this.productItem.update((items) => items.filter((item) => item._id !== productId));
        this.basketItems.update((items) =>
          items.filter((item) => item.product._id !== productId),
        );
        this.setProductPending(productId, false);
      },
      error: (err: Error) => {
        console.error(err);
        this.setProductPending(productId, false);
      },
    });
  }

  private setProductPending(productId: string, pending: boolean) {
    this.pendingProductIds.update((ids) =>
      pending ? [...ids, productId] : ids.filter((id) => id !== productId),
    );
  }
}
