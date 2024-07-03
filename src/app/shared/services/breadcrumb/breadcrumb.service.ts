import { Injectable, WritableSignal, signal } from '@angular/core';
import { Breadcrumb } from '@app/shared/models/breadcrumb.model';

@Injectable()
export class BreadcrumbService {
  public breadcrumbList: WritableSignal<Breadcrumb[]> = signal<Breadcrumb[]>([])
  constructor() { }
  public updateBreadcrumbListContent(breadcrumbList: Breadcrumb[]): void {
    console.log("breadcrumbList", breadcrumbList)
    this.breadcrumbList.set(breadcrumbList)
  }
}
