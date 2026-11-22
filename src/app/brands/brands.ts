import { Component, EventEmitter, Output, signal } from '@angular/core';
import { BrandsAPI } from '../brands-api';
import { CommonModule } from '@angular/common';
import { Product, productItem } from '../product';
import { FilterApi } from '../filter-api';
import { TransferTool } from '../transfer-tool';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'app-brands',
  styleUrl: './brands.css',
  templateUrl: './brands.html',
})
export class Brands {
  constructor(private brands: BrandsAPI, private filterApi: FilterApi, public transferFile: TransferTool, private router: Router) {
    this.getBrands()
  }

  public brandsData = signal<string[]>([])
  public filterInfo = signal<productItem[]>([])

  getBrands() {
    this.brands.getBrands().subscribe((data: string[]) => this.brandsData.set(data))
  }

  filter(page: number, brand: string) {
    this.transferFile.selectedBrand.set(brand)
    this.router.navigate(["/products"])
    this.filterApi.filterBrands(page, brand).subscribe({
      next: (data: Product) => {
        this.filterInfo.set(data.products)
        this.transferFile.transfer.next(this.filterInfo())
      },
      error: (err: Error) => console.error(err)
    })
  }
}
