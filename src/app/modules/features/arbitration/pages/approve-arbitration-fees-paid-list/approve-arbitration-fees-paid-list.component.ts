import { Component, inject, OnInit } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { ArbitratorCountListService } from '../../services/arbitrator-count-list/arbitrator-count-list.service';
import { Pagination, pagination } from '@app/shared/models/pagination.model';
import { GetArbitratorsCountResponseDto } from '../../models/get-arbitrators-count-response-dto.model';
import { takeUntil } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';

@Component({
  selector: 'app-approve-arbitration-fees-paid-list',
  templateUrl: './approve-arbitration-fees-paid-list.component.html',
  styleUrls: ['./approve-arbitration-fees-paid-list.component.scss']
})
export class ApproveArbitrationFeesPaidListComponent  extends BaseComponent implements OnInit {
    private _breadcrumbService = inject(BreadcrumbService);
    private _translateService = inject(TranslateService);
    private _arbitratorCountListService = inject(ArbitratorCountListService);
    private _paginationService = inject(PaginationService);
  
    newPageNo: number = 1;
    pageCount: number = 0;
    pagintationData: pagination = {
      currentPage: 1,
      // pageCount: 0,
      pageSize: 10,
      totalCount: 0,
    };
    arbitratorsList: Pagination<GetArbitratorsCountResponseDto[]> = {} as Pagination<GetArbitratorsCountResponseDto[]>;
    arbitratorsDetailsURL : string =`/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.approveArbitrationFeesPaidDetails}/`
    ngOnInit(): void {
      this.updateBreadcrumb();
      this.GetLitigationRequestForAddArbitratorsCount();
      this.watchPaginationActions();
    }
    private updateBreadcrumb(): void {
      this._breadcrumbService.updateBreadcrumbListContent([
        { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
        { label: this._translateService.instant(this.translations.layout.sidebar.approveArbitrationFeesPaid), link: Configuration.pages.arbitration.approveArbitrationFeesPaidList }
      ])
    };
    private GetLitigationRequestForAddArbitratorsCount() {
      this._arbitratorCountListService.GetLitigationRequestForAddArbitratorsCount(this.pagintationData.currentPage, this.pagintationData.pageSize)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: BaseResponse<Pagination<GetArbitratorsCountResponseDto[]>>) => {
          if (res.isDone && res.data) {
            this.updateRequestList(res.data as Pagination<GetArbitratorsCountResponseDto[]>);
            this.pageCount = res.data.pageCount;
          }
        })
    }
  
    //private methods
    private updateRequestList(TypeListView: Pagination<GetArbitratorsCountResponseDto[]>): void {
      this.arbitratorsList = TypeListView;
      this.setPaginationData(
        this.arbitratorsList.pageSize,
        this.arbitratorsList.totalCount
      );
    }
  
    private setPaginationData(pageSize: number, total: number): void {
      this.pagintationData.pageSize = pageSize
      this.pagintationData.totalCount = total
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
        })
    }
  
    private watchPaginationClicked(): void {
      this._paginationService.pageClicked
        .pipe(takeUntil(this.destroy$))
        .subscribe((nextPage: number) => {
          if (this.pagintationData.currentPage != nextPage) {
            this.loadNextPage(nextPage);
            this.pagintationData.currentPage = this.newPageNo;
          }
        })
    }
  
    private loadNextPage(nextPage: number): void {
      this.pagintationData.currentPage = nextPage;
      this.GetLitigationRequestForAddArbitratorsCount()
    }
  }
  