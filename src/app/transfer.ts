import { Service } from '@angular/core';
import { Subject } from 'rxjs';
import { productItem } from './product';

@Service()
export class Transfer {
    exportData: Subject<productItem[]> = new Subject
}
