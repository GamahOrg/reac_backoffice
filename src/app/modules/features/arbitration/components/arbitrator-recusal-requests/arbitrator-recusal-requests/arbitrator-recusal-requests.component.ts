import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { LitigationRequestMircoDto } from '../../../models/arbitration-request.model';
import { LitigationRequestReformerAssigningRequestStatus } from '../../../models/enums/litigation-request-reformer-assigning-request-status';
import { ArbitratorAssigningRequestType } from '../../../models/enums/arbitration-request-contract-type';
import { ArbitratorRecusalService } from '../../../services/arbitrator-recusal/arbitrator-recusal.service';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { CitizenRequestAction } from '@app/modules/features/citizen-requests/models/enums/citizen-request-type.model';
import { LitigationRequestParty } from '../../../models/enums/arbitrator-recusal';

@Component({
  selector: 'app-arbitrator-recusal-requests',
  templateUrl: './arbitrator-recusal-requests.component.html',
  styleUrl: './arbitrator-recusal-requests.component.scss'
})
export class ArbitratorRecusalRequestsComponent extends BaseComponent implements OnInit {
  private _arbitratorRecusalService = inject(ArbitratorRecusalService)
  private _paginationService = inject(PaginationService)
  private _injector = inject(Injector)
  private router = inject(Router)
  private _breadcrumbService = inject(BreadcrumbService);
  private _translateService = inject(TranslateService);

  detailsRequestUrl: string = `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.approveOrRejectArbitrattionRecusalRequest}`
  page = 1;
  pageSize = 10;
  collectionSize!: number;
  pagintationData = {
    currentPage: this.page,
    pageSize: 0,
    totalCount: 0,
  }

  litigationRequests: LitigationRequestMircoDto[] | undefined = [];

  get litigationRequestReformerAssigningRequestStatus() {
    return LitigationRequestReformerAssigningRequestStatus
  }

  ngOnInit() {
    this.observePageChange();
    this.setBreadcrumb();
  }

  localization = {
    ///<summary>لم يتم الرد</summary>
    [LitigationRequestReformerAssigningRequestStatus.None]: this.translations.TasksRequestsList.None,
    ///<summary>تمت الموافقة</summary>
    [LitigationRequestReformerAssigningRequestStatus.Approve]: this.translations.TasksRequestsList.Approve,
    ///<summary>تم الرفض</summary>
    [LitigationRequestReformerAssigningRequestStatus.Reject]: this.translations.TasksRequestsList.Reject,
    ///<summary>تم الإلغاء</summary>
    [LitigationRequestReformerAssigningRequestStatus.Cancelled]:this.translations.TasksRequestsList.Cancelled,
  }
  arbitratorAssigningRequestType = {
    [ArbitratorAssigningRequestType.Arbitrator]: this.translations.ArbitratorAssigningRequestType.arbitrator,
    [ArbitratorAssigningRequestType.ArbitratorsChairman]: this.translations.ArbitratorAssigningRequestType.arbitratorsChairman,
   
  }
  arbitratorRecusalRequestParty = {
    [LitigationRequestParty.Plaintiff]: this.translations.ArbitratorRecusalRequest.plaintiff,
    [LitigationRequestParty.Defendant]: this.translations.ArbitratorRecusalRequest.defendant,
   
  }

  

  private list(pageIndex: number, pageSize: number): void {
    this._arbitratorRecusalService.getLitigationRequestForArbitratorRecusalRequestForArbitrator(pageIndex,pageSize).subscribe({
      next: (res) => {
        
         

        this.litigationRequests = res?.data?.results;

        this.collectionSize = res?.data?.totalCount || 0;
        this.setPaginationData(this.page, this.pageSize, this.collectionSize)
      }
    })
  }

  private observePageChange(): void {
    effect(() => {
      this.page = this._paginationService.currentPage();
      this.list(this.page, this.pageSize)
    }, {
      injector: this._injector,
      allowSignalWrites: true
    });
  }

  private setPaginationData(currentPage: number, pageSize: number, totalCount: number): void {
    this.pagintationData.currentPage = currentPage
    this.pagintationData.pageSize = pageSize
    this.pagintationData.totalCount = totalCount
    this._paginationService.updatePaginationData(this.pagintationData);
  }

  goToDetailsPage(requestId: string) {
     
    this.router.navigate([this.detailsRequestUrl,requestId]);
  }


  private setBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([

      { label: this._translateService.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignedArbitrationRequests}` },

      {
        label: this._translateService.instant(this.translations.layout.sidebar.arbitratorRecusalRequests),
        link: `/${Configuration.modules.arbitration}`
      }
    ])
  }
}
