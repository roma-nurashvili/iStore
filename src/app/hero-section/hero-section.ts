import { Component, signal } from '@angular/core';
import { ProductsAPI } from '../products-api';
import { Product, productItem } from '../product';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-hero-section',
  styleUrl: './hero-section.css',
  templateUrl: './hero-section.html',
})
export class HeroSection {
  constructor(private product: ProductsAPI) {
    this.getAllProduct(1, 50)
    setInterval(() => this.getRandomProduct(), 5000)
  }

  public allProduct = signal<productItem[]>([])
  public randomNum = signal<number>(0)

  getAllProduct(page: number, size: number) {
    this.product.getProducts(page, size).subscribe((data: Product) => {
      this.allProduct.set(data.products)
      
    })
  }

  getRandomProduct() {
    let random = Math.round(Math.random() * this.allProduct().length)
    this.randomNum.set(random)
  }
}
