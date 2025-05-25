import { Component, Injector, OnInit, effect } from "@angular/core";
import { Configuration } from "@app/core/configurations/shared.config";
import { BaseComponent } from "@app/shared/components/base/base.component";
import { PaginationService } from "@app/shared/services/pagination/pagination.service";
import { AuditngListItem } from "../../models/lawsuit-list.model";
import { LawsuitStatus } from "../../models/enums/lawsuit-status.model";
import { TranslateService } from "@ngx-translate/core";
import { BreadcrumbService } from "@app/shared/services/breadcrumb/breadcrumb.service";
import { LawsuitListService } from "../../services/lawsuit-list/lawsuit-list.service";
import { LawsuitContractType } from "../../models/enums/lawsuit-contract-type";
import { FormBuilder, FormGroup } from "@angular/forms";
import { pagination, Pagination } from "@app/shared/models/pagination.model";
import { takeUntil } from "rxjs";
import { BaseResponse } from "@app/core/models/base-response";
import { FilterVisibility } from "@app/shared/components/filter/components/filter/filter.component";

@Component({
  selector: 'app-lawsuits-list',
  templateUrl: './lawsuits-list.component.html',
  styleUrl: './lawsuits-list.component.scss'
})
export class LawsuitListComponent extends BaseComponent implements OnInit {




  auditngForm!: FormGroup;
  // collectionSize!: number;

  lawsuitTypesURL: string = '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitTypes
  // selectedLawsuits: any[] = [];
  auditngList: Pagination<AuditngListItem[]> = {} as Pagination<AuditngListItem[]>;

  lawsuitContractType: { [key: number]: string } = {
    [LawsuitContractType.Ejar]: this.translations.lawsuits.lawsuitsList.ejar,
    [LawsuitContractType.Mullak]: this.translations.lawsuits.lawsuitsList.mullak,
    [LawsuitContractType.Wafi]: this.translations.lawsuits.lawsuitsList.wafi,
    [LawsuitContractType.Wasatah]: this.translations.lawsuits.lawsuitsList.wasatah,
    [LawsuitContractType.Others]: this.translations.lawsuits.lawsuitsList.others
  }

  lawsuitStatus: { [key: number]: string } = {
    [LawsuitStatus.New]: this.translations.lawsuits.lawsuitsList.new,
    [LawsuitStatus.Received]: this.translations.lawsuits.lawsuitsList.received,
    [LawsuitStatus.AsessionTimeHasBeenSet]: this.translations.lawsuits.lawsuitsList.asessionTimeHasBeenSet,
    [LawsuitStatus.TheSessionWasCompleted]: this.translations.lawsuits.lawsuitsList.theSessionWasCompleted,
    [LawsuitStatus.TheMinutesOfTheMeetingWereWritten]: this.translations.lawsuits.lawsuitsList.theMinutesOfTheMeetingWereWritten,
    [LawsuitStatus.WaiverOfRight]: this.translations.lawsuits.lawsuitsList.waiverOfRight,
    // [LawsuitStatus.WaiverOfRight]: this.translations.lawsuits.lawsuitsList.WaiverOfRight,
    [LawsuitStatus.ReconciliationWasNotMade]: this.translations.lawsuits.lawsuitsList.ReconciliationWasNotMade,
    [LawsuitStatus.SaveAndClose]: this.translations.lawsuits.lawsuitsList.saveAndClose,
    [LawsuitStatus.SaveAsDraft]: this.translations.lawsuits.lawsuitsList.saveAsDraft,
    [LawsuitStatus.Rejected]: this.translations.lawsuits.lawsuitsList.Rejected,
    [LawsuitStatus.SentBackForEdit]: this.translations.lawsuits.lawsuitsList.SentBackForEdit,
    [LawsuitStatus.Edited]: this.translations.lawsuits.lawsuitsList.Edited,
    [LawsuitStatus.CharterRequestSent]: this.translations.lawsuits.lawsuitsList.CharterRequestSent,
    [LawsuitStatus.AcceptanceOfTheReconciliationReport]: this.translations.lawsuits.lawsuitsList.AcceptanceOfTheReconciliationReport,
    [LawsuitStatus.RejectionOfTheReconciliationReport]: this.translations.lawsuits.lawsuitsList.RejectionOfTheReconciliationReport,
    [LawsuitStatus.ReconciliationWasMade]: this.translations.lawsuits.lawsuitsList.ReconciliationWasMade,
    [LawsuitStatus.ReconciliationWasNotMadeAndMoveToArbitration]: this.translations.lawsuits.lawsuitsList.ReconciliationWasNotMadeAndMoveToArbitration,
    [LawsuitStatus.JudgmentDecisionIssued]: this.translations.lawsuits.lawsuitsList.JudgmentDecisionIssued,
    [LawsuitStatus.WaitingForExplanation]: this.translations.lawsuits.lawsuitsList.WaitingForExplanation,
    [LawsuitStatus.ExplanationResponsed]: this.translations.lawsuits.lawsuitsList.ExplanationResponsed,
    [LawsuitStatus.RejectionOfAgreementRequest]: this.translations.lawsuits.lawsuitsList.RejectionOfAgreementRequest,
    [LawsuitStatus.Cancelled]: this.translations.lawsuits.lawsuitsList.Cancelled,


        [LawsuitStatus.CollectionOfLitigationFeesRequestIsBeingSent]: this.translations.lawsuits.lawsuitsList.CollectionOfLitigationFeesRequestIsBeingSent,
        [LawsuitStatus.LitigationFeesHaveBeenCollected]: this.translations.lawsuits.lawsuitsList.LitigationFeesHaveBeenCollected,
        [LawsuitStatus.CollectionOfReconciliationFeesRequestIsBeingSent]: this.translations.lawsuits.lawsuitsList.CollectionOfReconciliationFeesRequestIsBeingSent,
        [LawsuitStatus.ReconciliationFeesHaveBeenCollected]: this.translations.lawsuits.lawsuitsList.ReconciliationFeesHaveBeenCollected,
        [LawsuitStatus.CollectionOfArbitrationFeesRequestIsBeingSent]: this.translations.lawsuits.lawsuitsList.CollectionOfArbitrationFeesRequestIsBeingSent,
        [LawsuitStatus.ArbitrationFeesHaveBeenCollected]: this.translations.lawsuits.lawsuitsList.ArbitrationFeesHaveBeenCollected,
        [LawsuitStatus.LitigationApprovedCollectionOfReconciliationFeesRequestIsBeingSend]: this.translations.lawsuits.lawsuitsList.LitigationApprovedCollectionOfReconciliationFeesRequestIsBeingSend,
        [LawsuitStatus.AgreementRequestHasBeenAgree]: this.translations.lawsuits.lawsuitsList.AgreementRequestHasBeenAgree,


  }

  // remainingAuditDays: number[] = [1, 2, 3, 4, 5]
  newPageNo: number = 1;
  pageCount: number = 0;
  pagintationData: pagination = {
    currentPage: 1,
    // pageCount: 0,
    pageSize: 10,
    totalCount: 0,
  };

  constructor(
    private _paginationService: PaginationService,
    private _translateService: TranslateService,
    private _breadcrumbService: BreadcrumbService,
    private _lawsuitListService: LawsuitListService,
    private _injector: Injector,
    private _fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.setBreadcrumb();
    this.AuditngList();
    this.watchPaginationActions();
  }





  private setBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
      { label: this._translateService.instant(this.translations.layout.sidebar.newLawsuitsList), link: Configuration.modules.lawsuits }
    ])
  }



  private AuditngList(): void {
    this._lawsuitListService.AuditngList(this.pagintationData.currentPage, this.pagintationData.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: BaseResponse<Pagination<AuditngListItem[]>>) => {
        if (res.isDone && res.data) {
          this.updateRequestList(res.data as Pagination<AuditngListItem[]>);
          this.pageCount = res.data.pageCount;
        }
      })
  }


  //private methods
  private updateRequestList(TypeListView: Pagination<AuditngListItem[]>): void {
    debugger;
    this.auditngList = TypeListView;

    this.setPaginationData(
      this.auditngList.pageSize,
      this.auditngList.totalCount
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
    this.AuditngList()
  }
 

}
