import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { ArbitrationService } from '../../services/arbitration.service';
import { Pagination, pagination } from '@app/shared/models/pagination.model';
import { takeUntil } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { LitigationRequestMircoDto, LitigationRequestReportAdminFilterDto } from '../../models/arbitration-request.model';

@Component({
  selector: 'app-arbitration-report-list',
  templateUrl: './arbitration-report-list.component.html',
  styleUrl: './arbitration-report-list.component.scss'
})
export class ArbitrationReportListComponent extends BaseComponent implements OnInit {

  private _breadcrumbService = inject(BreadcrumbService);
  private _translateService = inject(TranslateService);
  private _arbitrationService = inject(ArbitrationService);
  private _paginationService = inject(PaginationService);
  private _router = inject(Router);
  private _formBuilder = inject(FormBuilder);

  detailsRequestUrl: string = `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.arbitrationReportDetails}`
  newPageNo: number = 1;
  pageCount: number = 0;
  pagintationData: pagination = {
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
  };

  litigationRequests: Pagination<LitigationRequestMircoDto[]> = {} as Pagination<LitigationRequestMircoDto[]>;

  filterForm = this._formBuilder.group({
    requestCode: [null],
    arbitratorName: [null],
    partyName: [null],
    submissionDateFrom: [null],
    submissionDateTo: [null],
    auditorAcceptanceDateFrom: [null],
    auditorAcceptanceDateTo: [null],
    arbitratorAcceptanceDateFrom: [null],
    arbitratorAcceptanceDateTo: [null],
    judgmentDateFrom: [null],
    judgmentDateTo: [null],
  });

  ngOnInit() {
    this.getArbitrationRequestForAdminReport();
    this.watchPaginationActions();
    this.updateBreadcrumb();
  }

  private updateBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      {
        label: this._translateService.instant(this.translations.layout.sidebar.home),
        link: `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignedArbitrationRequests}`
      },
      {
        label: this._translateService.instant(this.translations.layout.sidebar.arbitrationReportList),
        link: `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.arbitrationReportList}`
      }
    ])
  }

  public goToDetailsPage(requestId: string) {
    this._router.navigate([this.detailsRequestUrl, requestId]);
  }

  public getArbitrationRequestForAdminReport(): void {
    const filter = this.filterForm.getRawValue() as unknown as LitigationRequestReportAdminFilterDto;
    this._arbitrationService.getArbitrationRequestForAdminReport(this.pagintationData.currentPage, this.pagintationData.pageSize, filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: BaseResponse<Pagination<LitigationRequestMircoDto[]>>) => {
        if (res.isDone && res.data) {
          this.updateRequestList(res.data as Pagination<LitigationRequestMircoDto[]>);
          this.pageCount = res.data.pageCount;
        }
      })
  }

  public resetFilter(): void {
    this.filterForm.reset();
    this.pagintationData.currentPage = 1;
    this.getArbitrationRequestForAdminReport();
  }

  private updateRequestList(TypeListView: Pagination<LitigationRequestMircoDto[]>): void {
    this.litigationRequests = TypeListView;
    this.setPaginationData(
      this.litigationRequests.pageSize,
      this.litigationRequests.totalCount
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
        this.loadNextPage(this.newPageNo);
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
    this.getArbitrationRequestForAdminReport()
  }
}
