import { Service, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { productItem } from './product';

@Service()
export class TransferTool {
    public transfer: Subject<productItem[]> = new Subject
    public selectedBrand = signal<string | null>(null)
    public selectedCategory = signal<string | null>(null)
}
