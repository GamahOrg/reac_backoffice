import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contract } from '../../models/lawsuit-details.model';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { Configuration } from '@app/core/configurations/shared.config';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '@app/core/services/storage-service/storage.service';

@Component({
    selector: 'app-lawsuit-defendant-data',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule
    ],
    templateUrl: './lawsuit-defendant-data.component.html',
    styleUrl: './lawsuit-defendant-data.component.scss'
})
export class LawsuitDefendantDataComponent extends BaseComponent implements OnInit {
    _injector = inject(Injector);
    contract!: Contract | undefined;
    defendantCitizen!: any;
    defendantFacility!: any;
    showAddMobile: boolean = false;
    showAddEmail: boolean = false;
    showAddContact: boolean = false;
    additionalMobile: string = '';
    additionalEmail: string = '';

    constructor(
        private _lawsuitRequestDetailsService: LawsuitRequestDetailsService,
        private _toastrService: ToastrService,
        private _storageService: StorageService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.observeLawsuitRequestDetailsSignal();
    }

    showAddAdditionalData() {
       return this._storageService.getDepartmentType() == '1' && this._storageService.getUserType() == 'false'  ?  true : false;
    }

    public get nationalAddress(): string {
        const address: string | undefined = this._lawsuitRequestDetailsService.litigationDetails()?.contractAddress
        return address || '--'
    }

    private observeLawsuitRequestDetailsSignal() {
        effect(() => {
            debugger;
            this.contract = this._lawsuitRequestDetailsService.litigationDetails()?.contract;
            this.defendantCitizen = this._lawsuitRequestDetailsService.litigationDetails()?.defendantCitizen;
            this.defendantFacility = this._lawsuitRequestDetailsService.litigationDetails()?.defendantFacility;
        }, {
            injector: this._injector,
            allowSignalWrites: true
        })
    }

    saveAdditionalMobile() {

        debugger;
        if (this.additionalMobile) {
            const phoneRegex = new RegExp(Configuration.validators.PhoneNumber); 
            if (!phoneRegex.test(this.additionalMobile)) {
                this._toastrService.error("برجاء ادخل رقم جوال صحيح");
                return;
            }
            this._lawsuitRequestDetailsService.ChangeCitizenData({
                litigationRequestId: this._lawsuitRequestDetailsService.litigationDetails()?.id || '',
            citizenId: this.contract?.secondPartyCitizen?.id,
            mobile2: this.additionalMobile,
            email2: null
            }).subscribe((res) => {
                if(res.isDone){
                    this._toastrService.success(res.message);
                }
            });
        }
    }

    saveAdditionalEmail() {
        debugger;

        if (this.additionalEmail) {

            if (this.additionalEmail) {
            const phoneRegex = new RegExp(Configuration.validators.emailPattern); // Example regex for phone number validation
            if (!phoneRegex.test(this.additionalEmail)) {
                this._toastrService.error("برجاء ادخل ايميل صحيح");
                return;
            }

            this._lawsuitRequestDetailsService.ChangeCitizenData({
                litigationRequestId: this._lawsuitRequestDetailsService.litigationDetails()?.id || '',
                citizenId: this.contract?.secondPartyCitizen?.id,
                mobile2: null,
                email2: this.additionalEmail
            }).subscribe((res) => {
                if(res.isDone){
                    this._toastrService.success(res.message);
                }
            });
        }
    }
}


}
