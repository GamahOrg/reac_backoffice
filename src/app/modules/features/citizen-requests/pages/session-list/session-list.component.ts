import { Component, effect, Injector, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LitigationRequestMircoForRequestSessionDto, LitigationRequestSessionDetailsDto } from '../../models/litigation-request.model';
import { LitigationRequestService } from '../../services/litigation-request.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { Configuration } from '@app/core/configurations/shared.config';

@Component({
    selector: 'app-session-list',
    templateUrl: './session-list.component.html',
    styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent extends BaseComponent implements OnInit {

    page = 1;
    pageSize = 10;
    collectionSize!: number;
    pagintationData = {
        currentPage: this.page,
        pageSize: 0,
        totalCount: 0,
    }

    sessionsList: LitigationRequestMircoForRequestSessionDto[] | undefined = [];
    sessionDetails: LitigationRequestSessionDetailsDto | undefined;
    participantList : any[] = [];


    constructor(private litigationRequestService: LitigationRequestService,
        private _paginationService: PaginationService,
        private _injector: Injector,
        private modalService: NgbModal,
        private _breadcrumbService: BreadcrumbService,
        private _translateService: TranslateService,
        private _router:Router
    ) {
        super();
    }

    ngOnInit() {
        this.setBreadcrumb()
        this.observePageChange()
    }

    private setBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translateService.instant(this.translations.layout.sidebar.sessionList) }
        ])
    }

    private list(pageIndex: number, pageSize: number): void {
        this.litigationRequestService.GetLitigationRequestForFullAllSession(pageIndex, pageSize).subscribe({
            next: (res) => {
                console.log(res);

                this.sessionsList = res?.data?.results;

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


    openSession(content: TemplateRef<any>, url: string | null) {
        this.selectedUrl = url;
        this.modalService.open(content)
    }
    openSessionDetails(content: TemplateRef<any>, meetingId: number | null) {
        
        this.litigationRequestService.GetLitigationRequestSessionDetails(meetingId!).subscribe({
            next: (res) => {
                
                if(res.isDone){
                    this.sessionDetails = res.data
                    this.sessionDetails?.participants.forEach(participant => {
                        if(this.participantList.findIndex(x => x.name == participant.name) == -1){

                            this.participantList.push(participant)
                        }
                    });

                    this.modalService.open(content)

                }else{

                }

            }
        })


    }

    selectedUrl: string | null = ''
    startSession(modal: any) {
        modal.dismiss()
        if (this.selectedUrl)
            window.open(this.selectedUrl, '_blank')
    }

     lawsuitFullDetailsURL: string = '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitFullDetails
        public navigateToEditOrDetails(lawsuitId: string | undefined)
        {
                this._router.navigate([this.lawsuitFullDetailsURL, lawsuitId]);
        }



}
