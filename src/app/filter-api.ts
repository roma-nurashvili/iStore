import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product } from './product';

@Service()
export class FilterApi {
    private filter = inject(HttpClient)

    search(item: string) {
        return this.filter.get<Product>(`https://api.everrest.educata.dev/shop/products/search?keywords=${item}`)
    }

    filterCategories(page: number, categoryID: string) {
        return this.filter.get<Product>(`https://api.everrest.educata.dev/shop/products/search?page_index=${page}&page_size=12&category_id=${categoryID}&sort_by=price&sort_direction=desc`)
    }

    filterBrands(page: number, brand: string) {
        return this.filter.get<Product>(`https://api.everrest.educata.dev/shop/products/search?page_index=${page}&page_size=12&brand=${brand}&sort_by=price&sort_direction=desc`)
    }

    filterPrice(min: number | undefined, max: number | undefined) {
        return this.filter.get<Product>(`https://api.everrest.educata.dev/shop/products/search?page_index=1&page_size=12&price_min=${min}&price_max=${max}&sort_by=price&sort_direction=desc`)
    }
}
