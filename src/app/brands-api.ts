import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product, productItem } from './product';

@Service()
export class BrandsAPI {
    private brands = inject(HttpClient)

    getBrands() {
        return this.brands.get<string[]>("https://api.everrest.educata.dev/shop/products/brands")
    }

    filterBrands(brand: string) {
        return this.brands.get<Product>(`https://api.everrest.educata.dev/shop/products/brand/${brand}?page_index=1&page_size=50`)
    }
}
