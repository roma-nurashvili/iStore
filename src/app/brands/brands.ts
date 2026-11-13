import { Component, signal } from '@angular/core';
import { BrandsAPI } from '../brands-api';
import { CommonModule } from '@angular/common';
import { Product } from '../product';

@Component({
  imports: [CommonModule],
  selector: 'app-brands',
  styleUrl: './brands.css',
  templateUrl: './brands.html',
})
export class Brands {
  constructor(private brands: BrandsAPI) {
    this.getBrands()
  }

  public brandsData = signal<string[]>([])

  getBrands() {
    this.brands.getBrands().subscribe((data: string[]) => this.brandsData.set(data))
  }
}
