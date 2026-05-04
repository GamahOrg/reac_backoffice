import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { ReopenLitigationRequestService } from '../../services/reopenLitigationRequest.service';
import { pagination } from '@app/shared/models/pagination.model';
import { LitigationRequestClosedListDto } from '../../models/reopenLitigationRequestDto';
import { Configuration } from '@app/core/configurations/shared.config';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-reopen-litigation-request-list',
  templateUrl: './reopen-litigation-request-list.component.html',
  styleUrl: './reopen-litigation-request-list.component.scss'
})
export class ReopenLitigationRequestListComponent extends BaseComponent implements OnInit {

  closedRequestsList: LitigationRequestClosedListDto[] | undefined;
  newPageNo: number = 1;
  pageCount: number = 0;
  pagintationData: pagination = {
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
  };
  private _paginationService = inject(PaginationService);

  constructor(
    private _reopenService: ReopenLitigationRequestService,
    private _breadcrumbService: BreadcrumbService,
    private _translateService: TranslateService,
    private _router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.setBreadcrumb();
    this.GetClosedLitigationRequests();
    this.watchPaginationActions();
  }

  GetClosedLitigationRequests() {
    this._reopenService.GetClosedLitigationRequests(this.pagintationData.currentPage, this.pagintationData.pageSize)
      .subscribe((res: any) => {
        if (res.isDone && res.data) {
          this.closedRequestsList = res.data?.results;
          this.setPaginationData(
            res.data.pageSize,
            res.data.totalCount
          );
        }
      });
  }

  private setBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      { label: this._translateService.instant(this.translations.layout.sidebar.home), link: `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.HomePage}` },
      { label: this._translateService.instant(this.translations.reopenLitigationRequest.reopenClosedRequests), link: '' }
    ]);
  }

  openDetails(litigationRequestId: string): void {
    this._router.navigate(['/users-management/reopen-litigation-request-details', litigationRequestId]);
  }

  private setPaginationData(pageSize: number, total: number): void {
    this.pagintationData.pageSize = pageSize;
    this.pagintationData.totalCount = total;
    this._paginationService.updatePaginationData(this.pagintationData);
  }

  private watchPaginationActions(): void {
    this.watchPagechanged();
    this.watchPaginationClicked();
  }

  private watchPagechanged(): void {
    this._paginationService.pageChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe((pageNo) => {
        this.newPageNo = pageNo;
        this.loadNextPage(this.newPageNo);
      });
  }

  private watchPaginationClicked(): void {
    this._paginationService.pageClicked
      .pipe(takeUntil(this.destroy$))
      .subscribe((nextPage: number) => {
        if (this.pagintationData.currentPage != nextPage) {
          this.loadNextPage(nextPage);
          this.pagintationData.currentPage = this.newPageNo;
        }
      });
  }

  private loadNextPage(nextPage: number): void {
    this.pagintationData.currentPage = nextPage;
    this.GetClosedLitigationRequests();
  }
}
