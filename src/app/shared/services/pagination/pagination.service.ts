import { EventEmitter, Injectable, WritableSignal, signal } from '@angular/core';
import { pagination } from '@app/shared/models/pagination.model';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public currentPage: WritableSignal<number> = signal(1);
  public pageChanged: EventEmitter<number> = new EventEmitter<number>();
  public pageClicked: EventEmitter<number> = new EventEmitter<number>();
  public paginationData: WritableSignal<pagination> = signal<pagination>(new pagination);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.resetCurrentPage();
    });
  }

  public resetCurrentPage(): void {
    this.currentPage.set(1);
    this.updatePageChanged(1);
    this.updatePaginationData(new pagination);
  }
  public updatePageChanged(pageIndex: number): void {
    this.pageChanged.emit(pageIndex);
  }
  public updatePageClicked(nextPage: number): void {
    this.pageClicked.emit(nextPage);
  }
  public updatePaginationData(paginationData: pagination): void {
    this.paginationData.set(paginationData);
  }
  public updateCurrentPage(page: number) {
    this.currentPage.set(page);
  }
}
