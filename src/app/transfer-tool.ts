import { Service, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { productItem } from './product';
import { BasketCart } from './basket';

@Service()
export class TransferTool {
    public transfer: Subject<productItem[]> = new Subject
    public selectedBrand = signal<string | null>(null)
    public selectedCategory = signal<string | null>(null)
}
