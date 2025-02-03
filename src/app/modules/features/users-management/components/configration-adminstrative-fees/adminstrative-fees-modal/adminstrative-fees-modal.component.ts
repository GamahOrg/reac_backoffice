import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { AdminstrativeFeesService } from '../../../services/adminstrativeFeesService';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-adminstrative-fees-modal',
  templateUrl: './adminstrative-fees-modal.component.html',
  styleUrl: './adminstrative-fees-modal.component.scss'
})
export class AdminstrativeFeesModalComponent extends BaseComponent implements OnInit  {
  feesForm!: FormGroup;
  @Input() isVisible: boolean | null = null; 
  @Output() ontoggle = new EventEmitter<boolean>(); 

  ngOnInit(): void {
    this.feesForm = new FormGroup({
      fees: new FormControl('', [Validators.required,  Validators.min(0)]),
      fromAmount: new FormControl('', [Validators.required,Validators.min(0)]),
      toAmount: new FormControl('', [Validators.required,Validators.min(0)]),
      // id: new FormControl(''),
      litigationAmount : new FormControl('') 
    });
  }


  constructor( private _configrationAdmistrationFeesService:AdminstrativeFeesService,  private _translateService: TranslateService,
    private _toastrNotificationService:ToastrNotificationService) {
    super();
    
  }


  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['isVisible']) {
  //     this.openModal()
  //   }
  // } 

  openModal(): void {
    this.isVisible = true;
  }


  closeModal(): void { 
    this.isVisible = null;
    this.feesForm.reset(); 
    this.ontoggle.emit(false);
  }

  save(): void {
    if (this.feesForm.valid) {
               this.feesForm.patchValue({
               litigationAmount: `${this.feesForm.get('fromAmount')?.value} - ${this.feesForm.get('toAmount')?.value} \\ رسوم التسجيل ${this.feesForm.get('fees')?.value}`
                                       });
      this._configrationAdmistrationFeesService.CreateFees(this.feesForm.value).subscribe(
        (response) => {
          console.log(response);
          if(response.isDone){
             this.showSuccess(this._translateService.instant(this.translations.general.successfullySave));
             this.ontoggle.emit(true);
             this.closeModal();
          }
          else{
            this.ontoggle.emit(true);
            this.closeModal();
          }
        },
        (error: any) => {
          console.error('Error updating item:', error);
         
        }
      );
    }
  }
   private showSuccess(msg: string): void {
      this._toastrNotificationService.showSuccess(msg);
    }

}
