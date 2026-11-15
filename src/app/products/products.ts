import { Component, signal } from '@angular/core';
import { Filter } from '../filter/filter';
import { ProductsAPI } from '../products-api';
import { Product, productItem } from '../product';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';

@Component({
  imports: [Filter, CommonModule, RouterLinkActive],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products {
  constructor(private product: ProductsAPI) {
    this.getProducts(1, 12)
  }

  public productData = signal<productItem[]>([])

  getProducts(page: number, size: number) {
    this.product.getProducts(page, size).subscribe({
      next: (data: Product) => this.productData.set(data.products),
      error: (error) => console.log(error)
    })
  }
}
