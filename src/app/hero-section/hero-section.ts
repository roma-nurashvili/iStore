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
    this.getRandom()
  }

  public productInfo = signal<productItem[]>([])

  getProductInfo(num: number) {
    this.product.getProducts(num).subscribe((data: Product) => {
      this.productInfo.set(data.products)
    })
  }

  public randomProduct = signal<number>(0)

  getRandom() {
    this.getProductInfo(50)
    let random = Math.floor(Math.random() * this.productInfo.length)
    this.randomProduct.set(random)
    console.log(this.randomProduct())
  }
}
