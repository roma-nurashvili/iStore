import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product, productItem } from './product';

@Service()
export class ProductsAPI {
    private productApi = inject(HttpClient)

    getProducts(page: number, size: number) {
        return this.productApi.get<Product>(`https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=${size}`)
    }

    viewDetails(id: string) {
        return this.productApi.get<productItem>(`https://api.everrest.educata.dev/shop/products/id/${id}`)
    }
}
