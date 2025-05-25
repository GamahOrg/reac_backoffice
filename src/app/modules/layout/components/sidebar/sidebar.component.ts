import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';
import { Configuration } from '../../../../core/configurations/shared.config';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { translations } from 'translation-keys.enum';
import { StorageService } from '@app/core/services/storage-service/storage.service';
import { DepartmentType } from '@app/core/models/enums/department-type.model';
import { ModificationListItem } from '../../../features/lawsuits/models/modification-request.model';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent extends BaseComponent implements OnInit {
    private _storageService = inject(StorageService);
    departmentType: DepartmentType | null = null;
    isAdmin!: string | null;
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
        debugger;

        this.isAdmin = this._storageService.getUserType();
        
        console.log("this.departmentType", this.departmentType);

        // Profile Section
        this.menuItems.push(
            {
                id: 'profile-collapse',
                title: this.translate.instant(translations.layout.sidebar.profile),
                icon: 'assets/images/icons/sidebar/book.svg',
                children: [
                    {
                        id: 'change-password',
                        title: this.translate.instant(translations.layout.sidebar.changePassword),
                        icon: 'assets/images/icons/sidebar/book.svg',
                        url: '/' + Configuration.modules.profile + '/' + Configuration.pages.profile.changePassword,
                    },
                    {
                        id: 'vacation-request',
                        title: this.translate.instant(translations.layout.sidebar.vacationRequest),
                        icon: 'assets/images/icons/sidebar/book.svg',
                        url: '/' + Configuration.modules.profile + '/' + Configuration.pages.profile.vacationRequest,
                    },

                ]
            },
        );


        if (this.departmentType == DepartmentType.Review) {

            this.menuItems
                
                .push(
                    {
                        id: 'reports-collapse',
                        title: this.translate.instant(translations.layout.sidebar.reports),
                        icon: 'assets/images/icons/sidebar/book.svg',
                        children: [
                            {
                                id: 'claims-link',
                                title: this.translate.instant(translations.layout.sidebar.listOfLitigationReviewReport),
                                icon: 'assets/images/icons/sidebar/book.svg',
                                url: '/' + Configuration.modules.reports + '/' + Configuration.pages.reports.listReviewReport,
                            },
                            {
                                id: 'claims-link',
                                title: this.translate.instant(translations.layout.sidebar.litigationStatisticsReviewReport),
                                // icon: 'assets/images/icons/sidebar/menu.svg',
                                icon: 'assets/images/icons/sidebar/book.svg',
                                url: '/' + Configuration.modules.reports + '/' + Configuration.pages.reports.statisticsReviewReport,
                            }
    
                        ]
                    },
                );


            debugger;
            if(this.isAdmin === "true"){
                this.menuItems
                
                .push(
                    {
                        id: 'review-collapse',
                        title: this.translate.instant(translations.layout.sidebar.review),
                        icon: 'assets/images/icons/sidebar/book.svg',
                        children: [
                            {
                                id: 'claims-link',
                                title: this.translate.instant(translations.layout.sidebar.lawsuitsList),
                                icon: 'assets/images/icons/sidebar/book.svg',
                                url: '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitList,
                            },
                            {
                                id: 'claims-link',
                                title: this.translate.instant(translations.layout.sidebar.assignReviewers),
                                // icon: 'assets/images/icons/sidebar/menu.svg',
                                icon: 'assets/images/icons/sidebar/book.svg',
                                url: '/' + Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.reviewerList,
                            },
                            {
                                id: 'Review-Report',
                                title: this.translate.instant(translations.layout.sidebar.ReviewCountsReport),
                                // icon: 'assets/images/icons/sidebar/menu.svg',
                                icon: 'assets/images/icons/sidebar/book.svg',
                                url: '/' + Configuration.modules.reports + '/' + Configuration.pages.reports.statisticsReviewReport,
                            }
    
                        ]
                    },
                );
            }else{

                this.menuItems.push(
                    {
                        id: 'review-collapse',
                        title: this.translate.instant(translations.layout.sidebar.review),
                        icon: 'assets/images/icons/sidebar/book.svg',
                        children: [
                            {
                                id: 'claims-link',
                                title: this.translate.instant(translations.layout.sidebar.lawsuitsList),
                                icon: 'assets/images/icons/sidebar/book.svg',
                                url: '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitList,
                            },
                            // {
                            //     id: 'claims-link',
                            //     title: this.translate.instant(translations.layout.sidebar.modificationList),
                            //     // icon: 'assets/images/icons/sidebar/menu.svg',
                            //     icon: 'assets/images/icons/sidebar/book.svg',
                            //     url: '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.litigation.litigationModificationRequests,
                            // }
    
                        ]
                    },
                );
            }

            
            
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

                        {
                            id: 'litigation-request-correspondences-list',
                            icon:'',
                            title: this.translate.instant(translations.layout.sidebar.litigationRequestCorrespondences),
                            url: '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.litigation.litigationRequestCorrespondencesList,
                        },
                        // {
                        //     id: 'litigation-request-notes-list',
                        //     icon:'',
                        //     title: this.translate.instant(translations.layout.sidebar.litigationRequestNotes),
                        //     url: '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.litigation.litigationRequestNotesList,
                        // },

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
                        },
                        {
                            id: 'arbitration-request-correspondences-list',
                            icon:'',
                            title: this.translate.instant(translations.layout.sidebar.arbitrationRequestCorrespondences),
                            url: '/' + Configuration.modules.arbitration + '/' + Configuration.pages.arbitration.arbitrationRequestCorrespondencesList,
                          },
                          {
                            id: 'approve-arbitration-fees-paid-list',
                            icon:'',
                            title: this.translate.instant(translations.layout.sidebar.approveArbitrationFeesPaid),
                            url: '/' + Configuration.modules.arbitration + '/' + Configuration.pages.arbitration.approveArbitrationFeesPaidList,
                          },

                    ]
                },
            );
        }else if (this.departmentType == DepartmentType.SystemManagement){
            // Management Section
            this.menuItems.push(
                {
                    id: 'management-collapse',
                    title: this.translate.instant(translations.layout.sidebar.management),
                    icon: 'assets/images/icons/sidebar/book.svg',
                    children: [
                        {
                            id: 'dashbourd',
                            title: this.translate.instant(translations.layout.sidebar.dashbourd),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.Dashbourd,
                        },
                        {
                            id: 'dashbourd-litigationtypes',
                            title: this.translate.instant(translations.layout.sidebar.dashbourdTypes),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.DashbourdTypes,
                        },
                        // {
                        //     id: 'create-user',
                        //     title: this.translate.instant(translations.layout.sidebar.createEmployee),
                        //     icon: 'assets/images/icons/sidebar/book.svg',
                        //     url: '/' + Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.createUser,
                        // },
                        {
                            id: 'users-list',
                            title: this.translate.instant(translations.layout.sidebar.employeeList),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.userList,
                        },
                        {
                            id: 'terms-settings',
                            title: this.translate.instant(translations.layout.sidebar.termsSettings),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.TermsSettings,
                        },
                        {
                            id: 'vacation-request-reply',
                            title: this.translate.instant(translations.layout.sidebar.vacationRequestReply),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.profile + '/' + Configuration.pages.profile.vacationRequestReply,
                        },
                    ],
                },
                {
                id: 'managementReview-collapse',
                title: this.translate.instant(translations.layout.sidebar.managementReview),
                icon: 'assets/images/icons/sidebar/book.svg',
                children: [
                        {
                            id: 'admistrative-fees',
                            title: this.translate.instant(translations.layout.sidebar.adminstrationFees),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.admistrativeFees,
                        },
                        {
                            id: 'review-setting',
                            title: this.translate.instant(translations.layout.sidebar.reviewSetting),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.reviewSettings,
                        },
                    ]
                },
                {
                    id: 'managementReconciliation-collapse',
                    title: this.translate.instant(translations.layout.sidebar.managementReconciliation),
                    icon: 'assets/images/icons/sidebar/book.svg',
                    children: [
                        {
                            id: 'reconciliation-fees',
                            title: this.translate.instant(translations.layout.sidebar.reconciliationFees),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.reconciliationFees,
                        },
                        {
                            id: 'reconciliation-setting-fees',
                            title: this.translate.instant(translations.layout.sidebar.reconciliationSettingFees),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.reconciliationSettings,
                        },
                    ]
                },
                {
                    id: 'managementArbitiration-collapse',
                    title: this.translate.instant(translations.layout.sidebar.managementArbitiration),
                    icon: 'assets/images/icons/sidebar/book.svg',
                    children: [
                        {
                            id: 'arbitiration-fees',
                            title: this.translate.instant(translations.layout.sidebar.arbitirationFees),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.arbitirationFees,
                        },
                        {
                            id: 'arbitiration-settings',
                            title: this.translate.instant(translations.layout.sidebar.arbitirationsettings),
                            icon: 'assets/images/icons/sidebar/book.svg',
                            url: '/' + Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.arbitirationsettings,
                        },
                  
                    ]
                },
            );

        }
    }

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }
}
