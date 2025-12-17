import { Component, effect, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { LitigationRequestMircoDto } from '@app/modules/features/citizen-requests/models/litigation-request-mirco-dto';
import { DeterminearbitratorperiodService } from '@app/modules/features/citizen-requests/services/determinearbitratorperiod.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ArbitrationService } from '../../services/arbitration.service';

@Component({
  selector: 'app-assign-arbitrators-for-duedate-lawsuits',
  templateUrl: './assign-arbitrators-for-duedate-lawsuits.component.html',
  styleUrl: './assign-arbitrators-for-duedate-lawsuits.component.scss'
})
export class AssignArbitratorsForDuedateLawsuitsComponent extends BaseComponent implements OnInit {

  reqList?: LitigationRequestMircoDto[]
      subscriptions: Subscription[] = [];
  
      detailsRequestUrl: string = `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignarbitratorlistforduedatelawsuitsdetails}`
      page = 1;
      pageSize = 10;
      collectionSize!: number;
      pagintationData = {
          currentPage: this.page,
          pageSize: 0,
          totalCount: 0,
      }
  
      constructor(
          private _arbitrationService: ArbitrationService,
          private _paginationService: PaginationService,
          private _injector: Injector,
          private router: Router,
          private _breadcrumbService: BreadcrumbService,
          private _translateService: TranslateService,
      ) { super(); }
  
      ngOnInit(): void {
           
          this.setBreadcrumb()
          this.observePageChange()
      }
  
      private setBreadcrumb(): void {
          this._breadcrumbService.updateBreadcrumbListContent([
              { label: this._translateService.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignedArbitrationRequests}` },
              { label: this._translateService.instant(this.translations.layout.sidebar.assignArbitrationMemberList) }
          ])
      }
  
      goToDetailsPage(requestId: string) {
        debugger;
          this.router.navigate([this.detailsRequestUrl, requestId]);
      }
  
      private list(pageIndex: number, pageSize: number): void {
  
          this.subscriptions.push(
              this._arbitrationService.GetDueDateLitigationRequestForAssignArbitrators(pageIndex, pageSize)
                  .subscribe(res => {
                      this.reqList = res?.data?.results as LitigationRequestMircoDto[]
                      this.collectionSize = res?.data?.totalCount || 0;
                      this.setPaginationData(this.page, this.pageSize, this.collectionSize)
                  })
  
          )
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
  
  lawsuitFullDetailsURL: string = '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitFullDetails
  
       public navigateToEditOrDetails(lawsuitId: string | undefined) {
           
               
          this.router.navigate([this.lawsuitFullDetailsURL, lawsuitId]);
  
         
      }

}
