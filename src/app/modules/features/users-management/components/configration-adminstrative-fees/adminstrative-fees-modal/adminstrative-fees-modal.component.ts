import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { AdminstrativeFeesService } from '../../../services/adminstrativeFeesService';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Configuration } from '@app/core/configurations/shared.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminstrative-fees-modal',
  templateUrl: './adminstrative-fees-modal.component.html',
  styleUrl: './adminstrative-fees-modal.component.scss'
})
export class AdminstrativeFeesModalComponent extends BaseComponent implements OnInit  {
  feesForm!: FormGroup;
  // @Input() isVisible: boolean | null = null; 
  // @Output() ontoggle = new EventEmitter<boolean>(); 
  arbitiratorCounts: number[] = [1, 3, 5, 7, 9];

  ngOnInit(): void {
    this.feesForm = new FormGroup({
      fees: new FormControl('', [Validators.required,  Validators.min(1)]),
      fromAmount: new FormControl('', [Validators.required,Validators.min(0)]),
      toAmount: new FormControl('', [Validators.required,Validators.min(1)]),
      // id: new FormControl(''),
      litigationAmount : new FormControl('') ,
      litigationRequestFees: this.fb.array([]),
    });
    this.addItems();
    this.updateBreadcrumb();
  }


  constructor( private _configrationAdmistrationFeesService:AdminstrativeFeesService,  private _translateService: TranslateService,
    private _toastrNotificationService:ToastrNotificationService,private fb: FormBuilder, private _breadcrumbService: BreadcrumbService, private _router : Router) {
    super();
    
  }


  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['isVisible']) {
  //     this.openModal()
  //   }
  // } 
  // Add 5 rows to the FormArray
  addItems() {
    this.arbitiratorCounts.forEach((count, index) => {
      this.items.push(this.createItem(count)); // Add each item with its corresponding arbitiratorCount
    });
  }

  // Create a new group of controls for each row
  createItem(arbitiratorCount: number): FormGroup {
    return this.fb.group({
      // amountId:[],
      // id:[],
      arbitratorsCount: [arbitiratorCount],
      arbitrationFees: [null, [Validators.required, Validators.min(1)]],
      percentageExtraAmount: [null, [ Validators.min(0)]],
      extraAmount: [null, [Validators.min(0)]],
    });
  }

  // Get the FormArray of items
 get items(): FormArray {
  return this.feesForm.get('litigationRequestFees') as FormArray;
}
  
  // openModal(): void {
  //   this.isVisible = true;
  // }


  // closeModal(): void { 
  //   this.isVisible = null;
  //   this.feesForm.reset(); 
  //   this.ontoggle.emit(false);
  // }

  save(): void {
    if (this.feesForm.valid) {
               this.feesForm.patchValue({
               litigationAmount: `${this.feesForm.get('fromAmount')?.value} - ${this.feesForm.get('toAmount')?.value} \\ رسوم إدارية ${this.feesForm.get('fees')?.value}`
                                       });
      this._configrationAdmistrationFeesService.CreateFees(this.feesForm.value).subscribe(
        (response) => {
          console.log(response);
          if(response.isDone){
             this.showSuccess(this._translateService.instant(this.translations.general.successfullySave));
             this.navigateToList();
            //  this.ontoggle.emit(true);
            //  this.closeModal();
          }
          else{
            // this.ontoggle.emit(true);
            // this.closeModal();
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
    private updateBreadcrumb(): void {
      this._breadcrumbService.updateBreadcrumbListContent([
              { label: this._translateService.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.HomePage}` },

        { label: this._translateService.instant(this.translations.UsersManagement.AdminstrationFees.listFees), link: `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.admistrativeFees}/`}
        ,{
          label: this._translateService.instant(this.translations.UsersManagement.AdminstrationFees.createFees), link: Configuration.modules.UsersManagement 
        },
      ])
    }

    private navigateToList(): void {
      this._router.navigate([`/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.admistrativeFees}/`])
   }
}
