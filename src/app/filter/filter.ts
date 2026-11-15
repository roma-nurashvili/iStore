import { Component, signal } from '@angular/core';
import { BrandsAPI } from '../brands-api';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-filter',
  styleUrl: './filter.css',
  templateUrl: './filter.html',
})
export class Filter {
  constructor(private brands: BrandsAPI) {
    this.getBrands()
  }

  public brandsData = signal<string[]>([])

  getBrands() {
    this.brands.getBrands().subscribe({
      next: (data: string[]) => this.brandsData.set(data),
      error: (error) => console.log(error)
    })
  }
}
