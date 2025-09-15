import { Component, OnInit } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';

// Replace with your actual model import
// Replace with your actual service import
import { DelegationRequestService } from '../../services/delegation-request.service';
import { LitigationDelegationRequest } from '../../models/delegation-request.model';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { pagination, Pagination } from '@app/shared/models/pagination.model';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';

@Component({
  selector: 'app-delegation-requests-list',
  templateUrl: './delegation-requests-list.component.html',
  styleUrls: ['./delegation-requests-list.component.scss']
})
export class DelegationRequestsListComponent extends BaseComponent implements OnInit {

  newPageNo: number = 1;
    pageCount: number = 0;
    pagintationData: pagination = {
      currentPage: 1,
      // pageCount: 0,
      pageSize: 10,
      totalCount: 0,
    };

  delegationRequests: Pagination<LitigationDelegationRequest[]> = {} as Pagination<LitigationDelegationRequest[]>;

  RequestOwnerType = [
    { title: this.translations.lawsuits.createEditLawsuit.CompanyRepresentative, value: 2 , type: 2}, // ممثل منشأة
    { title: this.translations.lawsuits.createEditLawsuit.AgentForCompany, value: 3 , type: 2}, // وكيل منشأة
    { title: this.translations.lawsuits.createEditLawsuit.IndividualRepresentative, value: 4 , type: 1}, // ممثل فرد 
    { title: this.translations.lawsuits.createEditLawsuit.AgentForIndividual, value: 5 , type: 1}, // وكيل فرد 
    { title: this.translations.lawsuits.createEditLawsuit.CompanyManager, value: 6 , type: 2}, // مدير شركة
    { title: this.translations.lawsuits.createEditLawsuit.CompanyCEO, value: 7 , type: 2}, // رئيس مجلس الادارة 
    { title: this.translations.lawsuits.createEditLawsuit.Filterer, value: 8 , type: 2}, //  مصفى 
    { title: this.translations.lawsuits.createEditLawsuit.JudicialGuard, value: 9 , type: 1}, // حارس قضائي
    { title: this.translations.lawsuits.createEditLawsuit.Custodian, value: 10 , type: 1}, //  ولي 
    { title: this.translations.lawsuits.createEditLawsuit.ManagingDirector, value: 11 , type: 2}, // عضو منتدب 
    { title: this.translations.lawsuits.createEditLawsuit.BankruptcyTrustee, value: 12 , type: 2}, //  أمين التفليسة 
  ];

getOwnerTypeTitle(ownerTypeId: number): string {
  const ownerType = this.RequestOwnerType.find(type => type.value === ownerTypeId);
  return ownerType ? ownerType.title : '--';
}

  constructor(private delegationRequestsService: DelegationRequestService,
    private _paginationService: PaginationService

  ) {
    super();
  }

  ngOnInit(): void {

    this.watchPaginationActions();

    this.getDelegationRequests();
  }

  getDelegationRequests(): void {
    this.delegationRequestsService.getDelegationRequests(this.pagintationData.currentPage, this.pagintationData.pageSize)
      .pipe(takeUntil(this.destroy$)) 
      .subscribe((res: any) => {
        if (res) {
          
          this.delegationRequests = res.data as Pagination<LitigationDelegationRequest[]>;
          this.pageCount = res.pageCount;
        }
      })
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
      this.getDelegationRequests()
    }
}
