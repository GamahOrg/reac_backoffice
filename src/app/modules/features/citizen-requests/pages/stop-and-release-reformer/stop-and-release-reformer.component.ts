import { Component, inject, OnInit } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { translations } from 'translation-keys.enum';
import { ReformersDecisionsService } from '../../services/reformers-decisions/reformers-decisions.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { Pagination, pagination } from '@app/shared/models/pagination.model';
import { ReformersDecisionsDto } from '../../models/reformers-decisions-dto.model';
import { takeUntil } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stop-and-release-reformer',
  templateUrl: './stop-and-release-reformer.component.html',
  styleUrl: './stop-and-release-reformer.component.scss'
})
export class StopAndReleaseReformerComponent extends BaseComponent implements OnInit {

  private _breadcrumbService = inject(BreadcrumbService);
  private _translateService = inject(TranslateService);
  private _paginationService = inject(PaginationService);
  private _reformersDecisionsService = inject(ReformersDecisionsService);

  reformerDecisionDetails: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.reformerDecisionDetails}/`

  newPageNo: number = 1;
  pageCount: number = 0;
  pagintationData: pagination = {
    currentPage: 1,
    // pageCount: 0,
    pageSize: 10,
    totalCount: 0,
  };
  searchForm!: FormGroup;
  reformersDecisions: Pagination<ReformersDecisionsDto[]> = {} as Pagination<ReformersDecisionsDto[]>;
  selectedReformersDecision: ReformersDecisionsDto = {} as ReformersDecisionsDto;

  private updateBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
      { label: this._translateService.instant(this.translations.layout.sidebar.stopAndReleaseReformer), link: Configuration.pages.citizenRequests.stopAndReleaseReformer }
    ])
  }

  constructor(
    private fb: FormBuilder,
  ) {
    super();

  }

  ngOnInit(): void {
    this.initializeForm();
    this.updateBreadcrumb();
    this.getReformersDecisions();
    this.watchPaginationActions();
  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      fullName: ['',],
      identityNumber: [''],
      isActive: [''],
    });
  }
   getReformersDecisions() {
    const searchCriteria = this.searchForm.value;
    console.log('Search criteria:', searchCriteria);
    this._reformersDecisionsService.GetReformersDecisions(this.pagintationData.currentPage, this.pagintationData.pageSize,searchCriteria)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: BaseResponse<Pagination<ReformersDecisionsDto[]>>) => {
        if (res.isDone && res.data) {
          this.updateRequestList(res.data as Pagination<ReformersDecisionsDto[]>);
          this.pageCount = res.data.pageCount;
        }
      })
  }
  //private methods
  private updateRequestList(TypeListView: Pagination<ReformersDecisionsDto[]>): void {
    this.reformersDecisions = TypeListView;
    this.setPaginationData(
      this.reformersDecisions.pageSize,
      this.reformersDecisions.totalCount
    );
  }
  private setPaginationData(pageSize: number, total: number): void {
    this.pagintationData.pageSize = pageSize
    this.pagintationData.totalCount = total
    this._paginationService.updatePaginationData(this.pagintationData);
    console.log("this.reformersDecisions", this.reformersDecisions);
    console.log("this.pagintationData", this.pagintationData);

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
    this.getReformersDecisions()
  }
}
