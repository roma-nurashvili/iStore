import { ResolveFn, Routes } from '@angular/router';
import { Home } from './home/home';
import { Products } from './products/products';
import { Details } from './details/details';
import { Basket } from './basket/basket';

export const routes: Routes = [
    {path: "", component: Home, title: "iStore - Your Technic Store"},
    {path: "products", component: Products, title: "iStore - Find Your Technology"},
    {path: "details/:id", component: Details, title: "iStore - Details"},
    {path: "basket/:user", component: Basket, title: "iStore - Basket"}
];
