import { Component, signal } from '@angular/core';
import { ProductsAPI } from '../products-api';
import { Product, productItem } from '../product';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-products-banner',
  styleUrl: './products-banner.css',
  templateUrl: './products-banner.html',
})
export class ProductsBanner {
  constructor(private productApi: ProductsAPI) {
    this.getProducts(10)
  }

  public productData = signal<productItem[]>([])

  getProducts(num: number) {
    this.productApi.getProducts(num).subscribe((data: Product) => this.productData.set(data.products))
  }
}
