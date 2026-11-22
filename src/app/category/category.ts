import { Component, signal } from '@angular/core';
import { Product, productItem } from '../product';
import { FilterApi } from '../filter-api';
import { TransferTool } from '../transfer-tool';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-category',
  styleUrl: './category.css',
  templateUrl: './category.html',
})
export class Category {
  constructor(private filterApi: FilterApi, public transferFile: TransferTool, private router: Router) {}

  filteredProduct = signal<productItem[]>([])

  filter(page: number, id: string, brand: string) {
    this.transferFile.selectedCategory.set(brand)
    this.router.navigate(["/products"])
    this.filterApi.filterCategories(page, id).subscribe({
      next: (data: Product) => {
        this.filteredProduct.set(data.products)
        this.transferFile.transfer.next(this.filteredProduct())
      },
      error: (err: Error) => console.error(err)
    })
  }
}
