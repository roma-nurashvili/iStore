import { Component } from '@angular/core';
import { HeroSection } from '../hero-section/hero-section';
import { Category } from '../category/category';
import { Brands } from '../brands/brands';
import { ProductsBanner } from '../products-banner/products-banner';

@Component({
  imports: [HeroSection, Category, Brands, ProductsBanner],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
