import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product } from './product';

@Service()
export class ProductsAPI {
    private productApi = inject(HttpClient)

    getProducts(num: number) {
        return this.productApi.get<Product>(`https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=${num}`)
    }
}
