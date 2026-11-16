import { Component, inject, signal } from '@angular/core';
import { Filter } from '../filter/filter';
import { ProductsAPI } from '../products-api';
import { Product, productItem } from '../product';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Details } from '../details/details';

@Component({
  imports: [Filter, CommonModule, RouterLink],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products {
  constructor(private product: ProductsAPI) {
    this.getProducts(1, 12)
  }

  public router = inject(Router)
  public productData = signal<productItem[]>([])
  public activePage: number = 1

  getProducts(page: number, size: number) {
    this.product.getProducts(page, size).subscribe({
      next: (data: Product) => this.productData.set(data.products),
      error: (error) => console.log(error)
    })

    this.activePage = page
  }

  viewDetails(id: string) {
    this.router.navigate(['/details', id])
  }


}
