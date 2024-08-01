import { ReviewResult } from './../../models/enums/review-result.model';
import { translations } from 'translation-keys.enum';
import { Component, Input, TemplateRef, inject } from '@angular/core';
import { Tabs } from '@app/shared/models/tabs.model';
import { TabsService } from '@app/shared/services/tabs-service/tabs.service';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LawsuitDataComponent } from '../../components/lawsuit-data/lawsuit-data.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { LawsuitItemDetails } from '../../models/lawsuit-details.model';
import { LawsuitEventsComponent } from '../../components/lawsuit-events/lawsuit-events.component';
import { LawsuitReeditReasonComponent } from '../../components/lawsuit-reedit-reason/lawsuit-reedit-reason.component';
import { LawsuitStatus } from '../../models/enums/lawsuit-status.model';

@Component({
  selector: 'app-lawsuits-details',
  templateUrl: './lawsuit-details.component.html',
  styleUrl: './lawsuit-details.component.scss'
})
export class LawsuitDetailsComponent extends BaseComponent {
  private _tabsService = inject(TabsService)
  private _translateService = inject(TranslateService)
  private _breadcrumbService = inject(BreadcrumbService)
  private modalService = inject(NgbModal);

  id: string | null = this._activatedRoute.snapshot.paramMap.get('id');
  reason: string = '';
  selectedReason!: string;

  isLawsuitDetails: boolean = true;

  charCounts: { [key: string]: number } = {
    subject: 0,
    notes: 0
  };

  tabContent: Tabs = {
    verticalTabs: false,
    activeTabIndex: 0,
    tabsComponentList: [
      {
        icon: '',
        // title: this._translateService.instant(translations.lawsuits.lawsuitDetails.lawsuitData),
        title: "بيانات الدعوى",
        Component: LawsuitDataComponent,
        disabled: false,
        isVisible: true,
      },
      {
        icon: '',
        // title: this._translateService.instant(translations.lawsuits.lawsuitDetails.lawsuitEvents),
        title: "أحداث الدعوة",
        Component: LawsuitEventsComponent,
        disabled: false,
        isVisible: true,
      },
      // {
      //   icon: '',
      //   title: this._translateService.instant(translations.lawsuits.lawsuitDetails.reasonForReturningLawsuitForModification),
      //   Component: LawsuitReeditReasonComponent,
      //   disabled: false,
      //   isVisible: true,
      // },
    ],
  };
  backForEditTabContent: Tabs = {
    verticalTabs: false,
    activeTabIndex: 0,
    tabsComponentList: [
      {
        icon: '',
        // title: this._translateService.instant(translations.lawsuits.lawsuitDetails.lawsuitData),
        title: "بيانات الدعوى",
        Component: LawsuitDataComponent,
        disabled: false,
        isVisible: true,
      },
      {
        icon: '',
        // title: this._translateService.instant(translations.lawsuits.lawsuitDetails.lawsuitEvents),
        title: "أحداث الدعوة",
        Component: LawsuitEventsComponent,
        disabled: false,
        isVisible: true,
      },
      {
        icon: '',
        // title: this._translateService.instant(this.translations.lawsuits.lawsuitDetails.LawsuitEditReasons),
        title: "أسباب إعادة الدعوة للتعديل",
        Component: LawsuitReeditReasonComponent,
        disabled: false,
        isVisible: true,
      },
    ],
  };
  lawsuitDetails!: LawsuitItemDetails;
  get LawsuitStatus() {
    return LawsuitStatus
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

  }
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _lawsuitRequestDetailsService: LawsuitRequestDetailsService
  ) {
    super()
  }
  ngOnInit(): void {
    // this.updateTabContent(this.tabContent);
    this.getLitigationById();

  }

  private getLitigationById() {
    this._lawsuitRequestDetailsService.GetLitigationById({ litigationId: (this.id as string) }).subscribe({
      next: (res) => {
        if (res) {
          this.lawsuitDetails = res.data as LawsuitItemDetails;
          this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translateService.instant(this.translations.lawsuits.lawsuitsList.lawsuitsList), link: Configuration.modules.lawsuits },
            { label: `دعوى إيجار رقم ${this.lawsuitDetails.requestCode}` }
          ]);
          this._lawsuitRequestDetailsService.litigationDetails.set(this.lawsuitDetails);
        }
        if (
          this.lawsuitDetails.internalStatusId ==
          this.LawsuitStatus['SentBackForEdit']
        ) {
          this.updateTabContent(this.backForEditTabContent);
        } else {
          this.updateTabContent(this.tabContent);
        }
      }
    })
  }

  private restVerticalTabIndex(): void {
    this._tabsService.updateActiveVerticalTabIndex(0)
  }

  public updateActiveTabIndex(event: any) {
    this.tabContent.activeTabIndex = event.index;
    this.restVerticalTabIndex()
    this._tabsService.updateActiveTabIndex(event.index)
  }

  private updateTabContent(tabs: Tabs) {
    this._tabsService.updateTabContent(tabs)
    // this._tabsService.tabContent.set(tabs)
  }

  public openReasonModal(content: TemplateRef<any>) {
    const modalOptions: NgbModalOptions = {
      modalDialogClass: 'modal-lg'
    };

    const modalRef = this.modalService.open(content, modalOptions);
  }

  public openAuditorsModal(content: TemplateRef<any>) {
    const modalOptions: NgbModalOptions = {
      modalDialogClass: 'auditors-modal'
    };

    const modalRef = this.modalService.open(content, modalOptions);
  }

  public updateCharCount(event: any, field: string) {
    this.charCounts[field] = event.target.value.length;
  }

  public updateIsLawsuitDetails(value: boolean): void {
    this.isLawsuitDetails = value
  }
}
