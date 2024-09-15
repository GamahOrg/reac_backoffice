import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';
import { Configuration } from '../../../../core/configurations/shared.config';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { translations } from 'translation-keys.enum';
import { StorageService } from '@app/core/services/storage-service/storage.service';
import { DepartmentType } from '@app/core/models/enums/department-type.model';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent extends BaseComponent implements OnInit {
    private _storageService = inject(StorageService);
    departmentType: DepartmentType | null = null;
    isCollapsed: boolean | undefined;

    menuItems: MenuItem[] = [];

    constructor(private translate: TranslateService) {
        super();
        this.isCollapsed = window.innerWidth < 992;
    }
    ngOnInit(): void {
        this.getDepartmentType();
    }
    private getDepartmentType(): void {
        this.departmentType = Number(this._storageService.getDepartmentType());
        console.log("this.departmentType", this.departmentType);

        if (this.departmentType == DepartmentType.Review) {
            this.menuItems.push(
                {
                    id: 'review-collapse',
                    title: this.translate.instant(translations.layout.sidebar.review),
                    icon: 'assets/images/icons/sidebar/book.svg',
                    children: [
                        {
                            id: 'claims-link',
                            title: this.translate.instant(translations.layout.sidebar.lawsuitsList),
                            // icon: 'assets/images/icons/sidebar/menu.svg',
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitList,
                        },

                    ]
                },
            );
        } else if (this.departmentType == DepartmentType.Reconciliation) {
            this.menuItems.push(
                {
                    id: 'reformation-collapse',
                    title: this.translate.instant(translations.layout.sidebar.reformation),
                    icon: 'assets/images/icons/home/hands.svg',
                    children: [
                        // {
                        //     id: 'claims-link',
                        //     title: this.translate.instant(translations.layout.sidebar.lawsuitsList),
                        //     // icon: 'assets/images/icons/sidebar/menu.svg',
                        //     icon: 'assets/images/icons/sidebar/book.svg',
                        //     url: '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.AuditngListReconciliation,
                        // },
                        {
                            id: 'stop-and-release-reformer',
                            title: this.translate.instant(translations.layout.sidebar.reformationLawsuitsList),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.reformerassigningrequestforall,
                        },
                        {
                            id: 'stop-and-release-reformer',
                            title: this.translate.instant(translations.layout.sidebar.sessionList),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.sessionList,
                        },
                        {
                            id: 'claims-link',
                            title: this.translate.instant(translations.layout.sidebar.assignReformers),
                            // icon: 'assets/images/icons/sidebar/menu.svg',
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.reformerList,
                        },
                        {
                            id: 'claims-link',
                            title: this.translate.instant(translations.layout.sidebar.reformerRequestList),
                            // icon: 'assets/images/icons/sidebar/menu.svg',
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.reformerRequestList,
                        },
                        {
                            id: 'stop-and-release-reformer',
                            title: this.translate.instant(translations.layout.sidebar.stopAndReleaseReformer),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.stopAndReleaseReformer,
                        },

                        {
                            id: 'stop-and-release-reformer',
                            title: this.translate.instant(translations.layout.sidebar.requestToExtendSettlementPeriod),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.requestToExtendSettlementPeriodList,
                        },

                    ]
                },
            );
        } else if (this.departmentType == DepartmentType.Arbitration) {
            this.menuItems.push(
                {
                    id: 'arbitration-collapse',
                    title: this.translate.instant(translations.layout.sidebar.arbitration),
                    icon: 'assets/images/icons/home/judge.svg',
                    children: [
                        // {
                        //     id: 'claims-link',
                        //     title: this.translate.instant(translations.layout.sidebar.lawsuitsList),
                        //     // icon: 'assets/images/icons/sidebar/menu.svg',
                        //     icon: 'assets/images/icons/sidebar/book.svg',
                        //     url: '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.AuditngListArbitration,
                        // },
                        {
                            id: 'claims-link',
                            title: this.translate.instant(translations.layout.sidebar.arbitratorRequestTaskList),
                            // icon: 'assets/images/icons/sidebar/menu.svg',
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.arbitration + '/' + Configuration.pages.arbitration.assignedArbitrationRequests,
                        },
                        {
                            id: 'stop-and-release-reformer',
                            title: this.translate.instant(translations.layout.sidebar.arbitrationSessionList),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.arbitration + '/' + Configuration.pages.arbitration.arbitratorSessionList,
                        },
                        {
                            id: 'claims-link',
                            title: this.translate.instant(translations.layout.sidebar.litigationRequestForArbitratorSelectionDurationList),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.litigationRequestForArbitratorSelectionDurationList,
                        },
                        {
                            id: 'claims-link',
                            title: this.translate.instant(translations.layout.sidebar.arbitratorCount),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.arbitration + '/' + Configuration.pages.arbitration.arbitratorCountList,
                        },
                        {
                            id: 'stop-and-release-reformer',
                            title: this.translate.instant(translations.layout.sidebar.assignArbitrationMemberList),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.assignArbitrationMemberList,
                        },
                        {
                            id: 'stop-and-release-reformer',
                            title: this.translate.instant(translations.layout.sidebar.assignArbitrationHeadList),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.assignArbitrationHeadList,
                        },
                        {
                            id: 'claims-link',
                            title: this.translate.instant(translations.layout.sidebar.arbitratorRequestList),
                            // icon: 'assets/images/icons/sidebar/menu.svg',
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.arbitratorRequestList,
                        },
                        {
                            id: 'stop-and-release-reformer',
                            title: this.translate.instant(translations.layout.sidebar.stopAndReleaseArbitrator),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.stopAndReleaseArbitrator,
                        },
                        {
                            id: 'stop-and-release-reformer',
                            title: this.translate.instant(translations.layout.sidebar.requestToExtendArbitrationPeriodList),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.requestToExtendArbitrationPeriodList,
                        },
                        // {
                        //     id: 'stop-and-release-reformer',
                        //     title: this.translate.instant(translations.layout.sidebar.arbitratorCount),
                        //     icon: 'assets/images/icons/sidebar/book.svg',
                        //     url: '/' + Configuration.modules.arbitration + '/' + Configuration.pages.arbitration.arbitratorCountList,
                        // },
                        // {
                        //     id: 'stop-and-release-reformer',
                        //     title: this.translate.instant(translations.layout.sidebar.litigationRequestForArbitratorSelectionDurationList),
                        //     icon: 'assets/images/icons/sidebar/book.svg',
                        //     url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.litigationRequestForArbitratorSelectionDurationList,
                        // },
                        {
                            id: 'stop-and-release-reformer',
                            title: this.translate.instant(translations.layout.sidebar.assignarbitratorlist),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.arbitration + '/' + Configuration.pages.arbitration.assignarbitratorlist,
                        },
                        {
                            id: 'arbitrator-recusal-request',
                            title: this.translate.instant(translations.layout.sidebar.arbitratorRecusalRequests),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.arbitration + '/' + Configuration.pages.arbitration.arbitratorRecusalRequests,
                        }

                    ]
                },
            );
        }
    }

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }
}
