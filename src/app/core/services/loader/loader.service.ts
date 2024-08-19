import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoaderService {
  showLoader:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
  showLoader$ : Observable<boolean> = this.showLoader.asObservable()
  constructor() { }
}
