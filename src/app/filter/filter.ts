import { Component, signal } from '@angular/core';
import { BrandsAPI } from '../brands-api';
import { CommonModule } from '@angular/common';
import { CategoryInterface } from '../category-interface';

@Component({
  imports: [CommonModule],
  selector: 'app-filter',
  styleUrl: './filter.css',
  templateUrl: './filter.html',
})
export class Filter {
  constructor(private brands: BrandsAPI) {
    this.getBrands()
    this.getCategories()
  }

  public brandsData = signal<string[]>([])
  public categoryData = signal<CategoryInterface[]>([])
  public activeBrand: string = "all"
  public activeCategory: string = "all"

  getBrands() {
    this.brands.getBrands().subscribe({
      next: (data: string[]) => this.brandsData.set(data),
      error: (error) => console.log(error)
    })
  }

  getCategories() {
    this.brands.getCategories().subscribe({
      next: (data: CategoryInterface[]) => this.categoryData.set(data),
      error: (error) => console.log(error)
    })
  }

  selectBrand(name: string) {
    this.activeBrand = name
  }

  selectCategory(name: string) {
    this.activeCategory = name
  }
}
