import { Component, effect, Injector, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LitigationRequestMircoForRequestSessionDto } from '../../models/litigation-request.model';
import { LitigationRequestService } from '../../services/litigation-request.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private litigationRequestService: LitigationRequestService,
    private _paginationService: PaginationService,
    private _injector: Injector,
    private modalService :NgbModal
  ) {
    super();
  }

  ngOnInit() {
    this.observePageChange()
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


  openSession(content: TemplateRef<any>,url: string | null) {
    this.selectedUrl=url;
    this.modalService.open(content)
  }

  selectedUrl:string| null=''
  startSession(modal:any){
    modal.dismiss()
    if(this.selectedUrl)
    window.open(this.selectedUrl,'_blank')
  }



}
