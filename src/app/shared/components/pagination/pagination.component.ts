import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../base/base.component';
import { pagination } from '@app/shared/models/pagination.model';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule, NgbPaginationModule, TranslateModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent extends BaseComponent implements OnInit {
    private _paginationService = inject(PaginationService);

    public currentLang: string = '';

    // currentPage: number = 1;
    public nextPage: number = 1;
    // size = 10;

    public currentPage: number = 1;
    public pagintationData: pagination = {
        currentPage: 0,
        // pageCount: 0,
        pageSize: 0,
        totalCount: 0,
    };
    constructor(private _injector: Injector) {
        super()
    }
    ngOnInit(): void {
        this.observePaginationData();
        this.observeCurrentPage();
        this.observeNextPage();
    }

    private observePaginationData(): void {
        effect(() => {
            this.pagintationData = this._paginationService.paginationData();
            console.log('this.pagintationData this.pagintationData', this.pagintationData)
        }, {
            injector: this._injector,
            allowSignalWrites: true
        });
    }

    private observeCurrentPage(): void {
        effect(() => {
            this.currentPage = this._paginationService.currentPage();
        }, {
            injector: this._injector,
            allowSignalWrites: true
        });
    }

    private observeNextPage(): void {
        this._paginationService.pageChanged.pipe(takeUntil(this.destroy$)).subscribe((nextPage: number) => {
            this.nextPage = nextPage;
        });
    }
    public pageChanged(e: any): void {
        this.nextPage = e;
        this._paginationService.updatePageChanged(this.nextPage);
        this._paginationService.updateCurrentPage(this.nextPage);
    }
    public clickOnPagination(event: any): void {
        if (!event?.srcElement.className.includes('disabled')) {
            this._paginationService.updatePageClicked(this.nextPage);
        }
    }
}
