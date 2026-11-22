import { Component, EventEmitter, Output, signal } from '@angular/core';
import { BrandsAPI } from '../brands-api';
import { CommonModule } from '@angular/common';
import { CategoryInterface } from '../category-interface';
import { FilterApi } from '../filter-api';
import { Product, productItem } from '../product';
import { ProductsAPI } from '../products-api';
import { FormsModule } from '@angular/forms';
import { TransferTool } from '../transfer-tool';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-filter',
  styleUrl: './filter.css',
  templateUrl: './filter.html',
})
export class Filter {
  constructor(private brands: BrandsAPI, private filterApi: FilterApi, private productApi: ProductsAPI, private transferTool: TransferTool) {
    this.getBrands()
    this.getCategories()
    const selectedBrand = this.transferTool.selectedBrand()
    const selectedCategory = this.transferTool.selectedCategory()
    if (selectedBrand !== null) {
      this.activeBrand.set(selectedBrand)
      this.transferTool.selectedBrand.set(null)
    }
    if(selectedCategory !== null) {
      this.activeCategory.set(selectedCategory)
      this.transferTool.selectedCategory.set(null)
    }
  }

  @Output() fileTransfer: EventEmitter<productItem[]> = new EventEmitter()


  public brandsData = signal<string[]>([])
  public categoryData = signal<CategoryInterface[]>([])
  public activeBrand = signal<string>("all")
  public activeCategory = signal<string>("all")
  public categoryFilter = signal<productItem[] | undefined>(undefined)
  public brandFilter = signal<productItem[] | undefined>(undefined)
  public allProducts = signal<productItem[] | undefined>(undefined)
  public minPrice: number | undefined = undefined
  public maxPrice: number | undefined = undefined
  public priceFilter = signal<productItem[] | undefined>(undefined)

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

  filterCategory(page: number, categoryID: string, category: string) {
    this.activeCategory.set(category)
    this.activeBrand.set("all")
    this.filterApi.filterCategories(page, categoryID).subscribe({
      next: (data: Product) => {
        this.categoryFilter.set(data.products)
        this.fileTransfer.emit(this.categoryFilter())
      },
      error: (err: Error) => console.error(err)
    })
  }

  filterBrand(page: number, brand: string) {
    this.activeBrand.set(brand)
    this.activeCategory.set("all")
    this.filterApi.filterBrands(page, brand).subscribe({
      next: (data: Product) => {
        this.brandFilter.set(data.products)
        this.fileTransfer.emit(this.brandFilter())
      },
      error: (err: Error) => console.error(err)
    })
  }

  filterPrice(min: number | undefined, max: number | undefined) {
    this.activeBrand.set("all")
    this.activeCategory.set("all")
    this.filterApi.filterPrice(min, max).subscribe({
      next: (data: Product) => {
        this.priceFilter.set(data.products)
        this.fileTransfer.emit(this.priceFilter())
      },
      error: (err: Error) => console.error(err)
    })
  }

  getProducts(page: number, size: number) {
    this.activeBrand.set("all")
    this.activeCategory.set("all")
    this.productApi.getProducts(page, size).subscribe({
      next: (data: Product) => {
        this.allProducts.set(data.products)
        this.fileTransfer.emit(this.allProducts())
      },
      error: (err: Error) => console.error(err)
    })
  }

}
