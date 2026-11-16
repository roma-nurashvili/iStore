import { Component, signal } from '@angular/core';
import { ProductsAPI } from '../products-api';
import { Product, productItem } from '../product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthApi } from '../auth-api';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-products-banner',
  styleUrl: './products-banner.css',
  templateUrl: './products-banner.html',
})
export class ProductsBanner {
  constructor(private productApi: ProductsAPI, private basketApi: AuthApi) {
    this.getProducts(1, 50)
  }

  public productData = signal<productItem[]>([])

  getProducts(page: number, size: number) {
    this.productApi.getProducts(page, size).subscribe((data: Product) => {
      let filteredData = data.products.filter((item: productItem) => item.stock > 10).splice(0,10)
      this.productData.set(filteredData)
    })
  }

  addToBasket(item: productItem) {
    this.basketApi.addProductToCart(item._id).subscribe({
      error: (error: Error) => console.error(error),
    })
  }
}
