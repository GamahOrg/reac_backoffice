import { Component, inject } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LawsuitDetailsItem } from '../../models/lawsuit-details.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-arbitration-request',
    templateUrl: './arbitration-request.component.html',
    styleUrl: './arbitration-request.component.scss'
})
export class ArbitrationRequestComponent extends BaseComponent {
    private _translate = inject(TranslateService)

    arbitrationAgreementEjar: LawsuitDetailsItem[] = [
        {
            icon: 'assets/images/icons/lawsuit-details/hashtag.svg',
            title: this._translate.instant(this.translations.lawsuits.lawsuitsList.lawsuitNumber),
            value: '346780435678',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/hashtag.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.rentalContractNumber),
            value: '5678453',
            isDownload: false,
        },
    ]


    plaintiffData: LawsuitDetailsItem[] = [
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.plaintiffName),
            value: 'سارة إبراهيم أحمد الجارحي',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/hashtag.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.identityNumber),
            value: '051789497',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/call.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.mobileNumber),
            value: '+966452894562',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.nationality),
            value: 'سعودي',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.nationalAddress),
            value: 'العنوان الوطني',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.email),
            value: 'mohamed@gmail.com',
            isDownload: false,
        },
    ]

    defendantData: LawsuitDetailsItem[] = [
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.plaintiffName),
            value: 'سارة إبراهيم أحمد الجارحي',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/hashtag.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.identityNumber),
            value: '051789497',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/call.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.mobileNumber),
            value: '+966452894562',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.nationality),
            value: 'سعودي',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.nationalAddress),
            value: 'العنوان الوطني',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.email),
            value: 'mohamed@gmail.com',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: this._translate.instant(this.translations.lawsuits.lawsuitDetails.financialDisputeAmount),
            value: '10000',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/book.svg',
            title: this._translate.instant(this.translations.lawsuits.lawsuitDetails.lawsuitDetails),
            value: 'تفاصيل الدعوى',
            isDownload: false,
        },
    ]

    lawsuitRequests: LawsuitDetailsItem[] = [
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.lawsuits.lawsuitDetails.attachments),
            value: 'يتم هنا عرض الطلبات يتم هنا عرض الطلبات ',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/hashtag.svg',
            title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.requests),
            value: 'اسم الملف يكون هنا.pdf',
            isDownload: true,
        },
    ]
}
