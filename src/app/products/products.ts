import { Component, signal } from '@angular/core';
import { Filter } from '../filter/filter';
import { ProductsAPI } from '../products-api';
import { Product, productItem } from '../product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FilterApi } from '../filter-api';
import { TransferTool } from '../transfer-tool';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [Filter, CommonModule, RouterLink],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products {
  constructor(private product: ProductsAPI, private router: Router, private actR: ActivatedRoute, private filterApi: FilterApi, public importData: TransferTool) {
    this.getProducts(1, 12)
    this.brandFilter()
  }

  public productData = signal<productItem[]>([])
  public activePage: number = 1
  public isFiltered = signal<boolean>(false)

  getProducts(page: number, size: number) {
    this.isFiltered.set(false)
    this.product.getProducts(page, size).subscribe({
      next: (data: Product) => {
        if (!this.isFiltered()) {
          this.productData.set(data.products)
        }
      },
      error: (error) => console.log(error)
    })

    this.activePage = page
  }

  viewDetails(id: string) {
    this.router.navigate(['/details', id])
  }

  filter(data: productItem[]) {
    if(data.length >= this.productData().length || data.length > 35) {
      this.getProducts(1, 12)
    } else {
      this.productData.set(data)
      this.isFiltered.set(true)
    }
  }

  brandFilter() {
    this.importData.transfer.pipe(takeUntilDestroyed()).subscribe({
      next: (data: productItem[]) => {
        this.isFiltered.set(true)
        this.productData.set(data)
      },
      error: (err: Error) => console.error(err)
    })
  }

  categoryFilter() {
    this.importData.transfer.pipe(takeUntilDestroyed()).subscribe({
      next: (data: productItem[]) => {
        this.isFiltered.set(true)
        this.productData.set(data)
      },
      error: (err: Error) => console.error(err)
    })
  }
}
