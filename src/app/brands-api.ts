import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product } from './product';
import { CategoryInterface } from './category-interface';

@Service()
export class BrandsAPI {
    private brands = inject(HttpClient)

    getBrands() {
        return this.brands.get<string[]>("https://api.everrest.educata.dev/shop/products/brands")
    }

    filterBrands(brand: string) {
        return this.brands.get<Product>(`https://api.everrest.educata.dev/shop/products/brand/${brand}?page_index=1&page_size=50`)
    }

    getCategories() {
        return this.brands.get<CategoryInterface[]>("https://api.everrest.educata.dev/shop/products/categories")
    }

    filterCategories(id: number) {
        return this.brands.get<Product>(`https://api.everrest.educata.dev/shop/products/category/${id}?page_index=1&page_size=50`)
    }
}
