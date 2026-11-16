import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product, productItem } from './product';

@Service()
export class FilterApi {
    private filter = inject(HttpClient)

    search(item: string) {
        return this.filter.get<Product>(`https://api.everrest.educata.dev/shop/products/search?keywords=${item}`)
    }
}
