import { Component, inject, signal } from '@angular/core';
import { ProductsAPI } from '../products-api';
import { ActivatedRoute, Params } from '@angular/router';
import { productItem } from '../product';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-details',
  styleUrl: './details.css',
  templateUrl: './details.html',
})
export class Details {
  constructor(public actR: ActivatedRoute, public product: ProductsAPI) {
    this.viewSelected()
  }

  public productDetails = signal<productItem | undefined>(undefined)
  public selectedImage = signal<string | undefined>(undefined)

  viewSelected() {
    this.actR.params.subscribe((data: Params) => {
      this.viewDetails(data['id'])
    })
  }

  viewDetails(id: string) {
    this.product.viewDetails(id).subscribe((data: productItem) => {
      this.productDetails.set(data)
      this.selectedImage.set(data.images[0])
    })
  }

  selectImage(img: string) {
    this.selectedImage.set(img)
  }
}
