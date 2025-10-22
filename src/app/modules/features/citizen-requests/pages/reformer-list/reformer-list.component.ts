import { Component, effect, inject, Injector, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LitigationRequestMircoForRequestReformerDto, LitigationRequestMircoForRequestSessionDto } from '../../models/litigation-request.model';
import { LitigationRequestService } from '../../services/litigation-request.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitizenService } from '../../services/citizen.service';
import { AssignRequestPayload, CitizenReformer } from '../../models/citizen.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Pagination, pagination } from '@app/shared/models/pagination.model';
import { forkJoin, takeUntil } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';
import { AreaResponse } from '../../models/area-response.model';
import { CityResponse } from '../../models/city-response.model';
import { LookupsService } from '@app/shared/services/lookups/lookups.service';
import { AssignReformersFilter } from '../../models/assign-reformers-filter.model';
import { Configuration } from '@app/core/configurations/shared.config';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reformer-list',
    templateUrl: './reformer-list.component.html',
    styleUrls: ['./reformer-list.component.scss']
})
export class ReformerListComponent extends BaseComponent implements OnInit {


    private _lookupsService = inject(LookupsService);


    selectedArea: AreaResponse = {} as AreaResponse;
    selectedCity: CityResponse = {} as CityResponse;
    areasDropDownList: AreaResponse[] = [];
    citiesDropDownList: CityResponse[] = [];
    allCitiesDropDownList: CityResponse[] = [];
    newPageNo: number = 1;
    pageCount: number = 0;
    pagintationData: pagination = {
      currentPage: 1,
      // pageCount: 0,
      pageSize: 10,
      totalCount: 0,
    };

    reformerList: Pagination<LitigationRequestMircoForRequestReformerDto[]> = {} as Pagination<LitigationRequestMircoForRequestReformerDto[]>;
    citizenReformers: CitizenReformer[] = [];
    ascending:boolean=false;

    filterForm = this._formBuilder.group({
        reformerName: [],
        areaId: [],
        cityId: [],
    })



    constructor(private litigationRequestService: LitigationRequestService,
        private _paginationService: PaginationService,
        private toastrNotificationService: ToastrNotificationService,
        private _translate: TranslateService,
        private _injector: Injector,
        private modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _breadcrumbService: BreadcrumbService,
        private _translateService: TranslateService,
        private citizenService: CitizenService,
        private _router:Router
    ) {
        super();
    }

    ngOnInit() {
        this.updateBreadcrumb();
        this.GetLitigationRequestForFullAllReformer();
        this.watchPaginationActions();
        this.forkJoinAllLookups();
    }

    private updateBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.reformerassigningrequestforall}` },
            { label: this._translateService.instant(this.translations.layout.sidebar.assignReformers) }
        ])
    };

    private forkJoinAllLookups(): void {
        forkJoin(
            {
                GetSysArea: this._lookupsService.GetSysArea(),
                SysCity: this._lookupsService.SysCity()
                
            }
        ).pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.areasDropDownList = res.GetSysArea.isDone && res.GetSysArea.data ? res.GetSysArea.data : [];
            this.allCitiesDropDownList = res.SysCity.isDone && res.SysCity.data ? res.SysCity.data : [];
            this.observeAreaControl();

        }
        )
    };


    public GetLitigationRequestForFullAllReformer(): void {
        let filterFormValue = this.filterForm.getRawValue() as unknown as AssignReformersFilter;

        this.litigationRequestService.GetLitigationRequestForFullAllReformer(this.pagintationData.currentPage, this.pagintationData.pageSize,this.ascending,filterFormValue)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: BaseResponse<Pagination<LitigationRequestMircoForRequestReformerDto[]>>) => {
                if (res.isDone && res.data) {
                    this.updateRequestList(res.data as Pagination<LitigationRequestMircoForRequestReformerDto[]>);
                    this.pageCount = res.data.pageCount;
                }
            })
    }

    public ResetFilter(){
        this.filterForm.reset();
        this.GetLitigationRequestForFullAllReformer();
    }

    //private methods
    private updateRequestList(TypeListView: Pagination<LitigationRequestMircoForRequestReformerDto[]>): void {
        this.reformerList = TypeListView;

        this.setPaginationData(
            this.reformerList.pageSize,
            this.reformerList.totalCount
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
        this.GetLitigationRequestForFullAllReformer();
    }


    assignReformer(currentReformerId: string, requestId: string, content: TemplateRef<any>) {
         
        this.modalService.open(content)
        this.controls.requestId.setValue(requestId)
        this.citizenService.getReformersLookup(currentReformerId, requestId).subscribe(res => {
            if (res.data)
                this.citizenReformers = res.data;
        })
    }

    selectedReformerId!: string;
    assignRequestForm = this._formBuilder.group({
        reformerId: new FormControl<string | null>(null, [Validators.required]),
        requestId: new FormControl<string | null>(null, [Validators.required]),
        reason: ['',Validators.required],
    })
    get controls() {
        return this.assignRequestForm.controls
    }

    sendReformerRequest(modal: any) {
        
        this.assignRequestForm.markAllAsTouched()
        if (this.assignRequestForm.valid) {

            this.litigationRequestService.assign(this.assignRequestForm.value as AssignRequestPayload).subscribe(res => {
                if (res.isDone) {
                    this.assignRequestForm.reset();
                    this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave))
                    modal.dismiss()
                    this.GetLitigationRequestForFullAllReformer();

                } 
                // else {
                //     this.toastrNotificationService.showError(res.message)
                // }
            })
        }

    }

    orderList(event:any){
     var ascendingValue= event.target.value;
      if(ascendingValue == "true"){
        this.ascending=true;
        this.GetLitigationRequestForFullAllReformer();
      }
      else{
        this.ascending=false;
        this.GetLitigationRequestForFullAllReformer();
      }
    }
    get filterFormcontrols() {
        return this.filterForm.controls;
    }
    private observeAreaControl(): void {
        this.filterFormcontrols.areaId.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(res => {
            console.log("this.controls.areasId.valueChange", res);
            if (res) {
                this.filterCity(res as string);
            }
        })
    };

    private filterCity(areaId: string): void {
        
        this.selectedArea = this.areasDropDownList.find(area => area.id == areaId) as AreaResponse;
        if (this.selectedArea.id) {
            this.citiesDropDownList = this.allCitiesDropDownList.filter(city => city.areaId == this.selectedArea.id)
        }
        this.filterFormcontrols.cityId.setValue(null)
    };

    lawsuitFullDetailsURL: string = '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitFullDetails
    public navigateToEditOrDetails(lawsuitId: string | undefined)
    {
            this._router.navigate([this.lawsuitFullDetailsURL, lawsuitId]);
    }
}
