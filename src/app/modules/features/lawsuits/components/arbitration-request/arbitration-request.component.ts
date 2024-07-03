import { Component } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LawsuitDetailsItem } from '../../models/lawsuit-details.model';

@Component({
    selector: 'app-arbitration-request',
    templateUrl: './arbitration-request.component.html',
    styleUrl: './arbitration-request.component.scss'
})
export class ArbitrationRequestComponent extends BaseComponent {
    arbitrationAgreementEjar: LawsuitDetailsItem[] = [
        {
            icon: 'assets/images/icons/lawsuit-details/hashtag.svg',
            title: 'رقم الدعوى',
            value: '346780435678',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/hashtag.svg',
            title: 'رقم عقد الإيجار',
            value: '5678453',
            isDownload: false,
        },
    ]


    plaintiffData: LawsuitDetailsItem[] = [
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: 'اسم المدعي',
            value: 'سارة إبراهيم أحمد الجارحي',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/hashtag.svg',
            title: 'رقم الهوية',
            value: '051789497',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/call.svg',
            title: 'رقم الجوال',
            value: '+966452894562',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: 'الجنسية',
            value: 'سعودي',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: 'العنوان الوطني',
            value: 'العنوان الوطني',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: 'البريد الإلكتروني',
            value: 'mohamed@gmail.com',
            isDownload: false,
        },
    ]

    defendantData: LawsuitDetailsItem[] = [
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: 'اسم المدعي',
            value: 'سارة إبراهيم أحمد الجارحي',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/hashtag.svg',
            title: 'رقم الهوية',
            value: '051789497',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/call.svg',
            title: 'رقم الجوال',
            value: '+966452894562',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: 'الجنسية',
            value: 'سعودي',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: 'العنوان الوطني',
            value: 'العنوان الوطني',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: 'البريد الإلكتروني',
            value: 'mohamed@gmail.com',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: 'مبلغ النزاع المالي',
            value: '10000',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: 'تفاصيل الدعوى',
            value: 'تفاصيل الدعوى',
            isDownload: false,
        },
    ]

    lawsuitRequests: LawsuitDetailsItem[] = [
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: 'المرفقات',
            value: 'يتم هنا عرض الطلبات يتم هنا عرض الطلبات ',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/hashtag.svg',
            title: 'الطلبات',
            value: 'اسم الملف يكون هنا.pdf',
            isDownload: true,
        },
    ]
}
