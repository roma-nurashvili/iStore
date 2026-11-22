import { Service } from '@angular/core';
import { Subject } from 'rxjs';
import { productItem } from './product';

@Service()
export class TransferTool {
    public transfer: Subject<productItem[]> = new Subject
}
