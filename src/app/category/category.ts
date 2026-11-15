import { Component, signal } from '@angular/core';
import { BrandsAPI } from '../brands-api';
import { Product, productItem } from '../product';
import { Transfer } from '../transfer';

@Component({
  imports: [],
  selector: 'app-category',
  styleUrl: './category.css',
  templateUrl: './category.html',
})
export class Category {
  constructor(private filter: BrandsAPI) {}

  filteredProduct = signal<productItem[]>([])

  filterCategories(id: number) {
    this.filter.filterCategories(id).subscribe({
      next: (data: Product) => this.filteredProduct.set(data.products),
      error: (error) => console.log(error)
    })
  }
}
