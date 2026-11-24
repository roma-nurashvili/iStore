import { Component, signal } from '@angular/core';
import { Filter } from '../filter/filter';
import { ProductsAPI } from '../products-api';
import { Product, productItem } from '../product';
import { CommonModule } from '@angular/common';
import { TransferTool } from '../transfer-tool';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Basket, BasketCart, BasketCartProduct } from '../basket';
import { Router, RouterLink } from '@angular/router';
import { AuthApi } from '../auth-api';
import { CookieService } from 'ngx-cookie-service';

@Component({
  imports: [Filter, CommonModule, RouterLink],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products {
  constructor(
    private product: ProductsAPI,
    private router: Router,
    public importData: TransferTool,
    private basketApi: AuthApi,
    private cookie: CookieService,
  ) {
    this.getProducts(1, 12);
    this.brandFilter();
  }

  public productData = signal<productItem[]>([]);
  public activePage: number = 1;
  public isFiltered = signal<boolean>(false);
  public userBasket = signal<BasketCartProduct[]>([]);

  getProducts(page: number, size: number) {
    this.isFiltered.set(false);
    this.product.getProducts(page, size).subscribe({
      next: (data: Product) => {
        if (!this.isFiltered()) {
          this.productData.set(data.products);
        }
      },
      error: (error) => console.log(error),
    });

    this.activePage = page;
  }

  viewDetails(id: string) {
    this.router.navigate(['/details', id]);
  }

  filter(data: productItem[]) {
    if (data.length >= this.productData().length || data.length > 35) {
      this.getProducts(1, 12);
    } else {
      this.productData.set(data);
      this.isFiltered.set(true);
    }
  }

  brandFilter() {
    this.importData.transfer.pipe(takeUntilDestroyed()).subscribe({
      next: (data: productItem[]) => {
        this.isFiltered.set(true);
        this.productData.set(data);
      },
      error: (err: Error) => console.error(err),
    });
  }

  categoryFilter() {
    this.importData.transfer.pipe(takeUntilDestroyed()).subscribe({
      next: (data: productItem[]) => {
        this.isFiltered.set(true);
        this.productData.set(data);
      },
      error: (err: Error) => console.error(err),
    });
  }

  getBasket() {
    this.basketApi.getBasket().subscribe({
      next: (data: BasketCart) => {
        this.userBasket.set(data.products);
      },
      error: (err: Error) => console.error(err),
    });
  }

  addToBasket(body: Basket) {
    if (!this.cookie.check('user')) {
      alert('Sign in to your account for adding products in your basket!');
    } else {
      if (!this.userBasket()) {
        this.basketApi.addToBasket(body).subscribe({
          next: (data: BasketCart) => console.log(data.products),
          error: (err: Error) => console.error(err),
        });
      } else {
        this.basketApi.updateBasket(body).subscribe({
          next: (data: BasketCart) => console.log(data.products),
          error: (err: Error) => console.error(err),
        });
      }
    }
  }
}
