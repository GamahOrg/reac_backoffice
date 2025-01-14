import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
    private data = signal<any>(null);
  
    setData(data: any) {
      this.data.set(data);
    }
  
    getData() {
      return this.data();
    }
}