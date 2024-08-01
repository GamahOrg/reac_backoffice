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

@Component({
    selector: 'app-lawsuits-list',
    templateUrl: './lawsuits-list.component.html',
    styleUrl: './lawsuits-list.component.scss'
})
export class LawsuitListComponent extends BaseComponent implements OnInit {
    auditngForm!: FormGroup;
    collectionSize!: number;

    lawsuitTypesURL: string = '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitTypes
    selectedLawsuits: any[] = [];
    auditngList: AuditngListItem[] = [];

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

    }

    remainingAuditDays: number[] = [1, 2, 3, 4, 5]

    pagintationData = {
        currentPage: 1,
        pageSize: 0,
        totalCount: 0,
    }

    constructor(
        private _paginationService: PaginationService,
        private _translateService: TranslateService,
        private _breadcrumbService: BreadcrumbService,
        private _lawsuitListService: LawsuitListService,
        private _injector: Injector,
        private _fb: FormBuilder
    ) {
        super();
        //this.refreshLawsuits();
    }

    ngOnInit(): void {
        this.createAuditngForm();
        this.setBreadcrumb();
        this.observePageChange();
        this.setPaginationData(this.pageIndex, this.pageSize, 50);
    }

    public get pageIndex(): number {
        return this.auditngForm.get('pageIndex')?.value || 1;
    }

    public get pageSize(): number {
        return this.auditngForm.get('pageSize')?.value || 10;
    }

    private createAuditngForm(): void {
        this.auditngForm = this._fb.group({
            id: ['c4e6b8d0-a1b2-4f3c-4e6b-8d0a1b2f3c4e'],
            searchKey: [null],
            InternalStatusId: [null],
            LitigationRequestContractTypeId: [null],
            pageIndex: [1],
            pageSize: [10]
        })
    }

    private setBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translateService.instant(this.translations.layout.sidebar.newLawsuitsList), link: Configuration.modules.lawsuits }
        ])
    }

    private observePageChange(): void {
        effect(() => {
            this.auditngForm.get('pageIndex')?.setValue(this._paginationService.currentPage())
            this.AuditngList();
        }, {
            injector: this._injector,
            allowSignalWrites: true
        });
    }

    private AuditngList(): void {
        this._lawsuitListService.AuditngList(this.auditngForm.getRawValue()).subscribe({
            next: (res) => {
                this.auditngList = res.data?.items || [];
                this.collectionSize = res?.data?.totalPages || 0;
                this.setPaginationData(this.pageIndex, this.pageSize, this.collectionSize);
            }
        })
    }

    private setPaginationData(currentPage: number, pageSize: number, totalCount: number): void {
        this.pagintationData.currentPage = currentPage
        this.pagintationData.pageSize = pageSize
        this.pagintationData.totalCount = totalCount
        this._paginationService.updatePaginationData(this.pagintationData);
    }

    public filterAuditngList() {
        this.auditngForm.get('pageIndex')?.setValue(1);
        this.AuditngList();
    }

    public resetAuditngFilter() {
        this.auditngForm.get('InternalStatusId')?.reset();
        this.auditngForm.get('LitigationRequestContractTypeId')?.reset();
    }

    // refreshLawsuits() {
    //     this.lawsuitLists = this.LAWSUITLIST.map((lawsuitList, i) => ({ id: i + 1, ...lawsuitList })).slice(
    //         (this.page - 1) * this.pageSize,
    //         (this.page - 1) * this.pageSize + this.pageSize,
    //     );
    // }
}
