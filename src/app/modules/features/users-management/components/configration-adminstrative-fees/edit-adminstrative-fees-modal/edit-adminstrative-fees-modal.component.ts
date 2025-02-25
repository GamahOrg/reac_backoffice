import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AdminstrativeFeesDto } from '../../../models/AdminstrativeFeesDto';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminstrativeFeesService } from '../../../services/adminstrativeFeesService';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Configuration } from '@app/core/configurations/shared.config';

@Component({
  selector: 'app-edit-adminstrative-fees-modal',
  templateUrl: './edit-adminstrative-fees-modal.component.html',
  styleUrl: './edit-adminstrative-fees-modal.component.scss'
})
export class EditAdminstrativeFeesModalComponent extends BaseComponent implements OnInit {
  feesForm!: FormGroup;
  itemId!: string;
  arbitiratorCounts: number[] = [1, 3, 5, 7, 9];

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.itemId = params['id'];  // '+' is used to cast to number
      console.log('Item ID from URL:', this.itemId);
      this.GetFeesById(this.itemId);  // Fetch data based on the ID
      this.iniateForm();
    });
    this.updateBreadcrumb();
    // this.feesForm = new FormGroup({
    //   fees: new FormControl('', [Validators.required,  Validators.min(0)]),
    //   fromAmount: new FormControl('', [Validators.required,Validators.min(0)]),
    //   toAmount: new FormControl('', [Validators.required,Validators.min(0)]),
    //   id: new FormControl(''),
    //   litigationAmount : new FormControl('') ,
      
    // });
    // if (this.selectedItem) {
    //   this.GetFeesById();
    // }

  }


  constructor( private _configrationAdmistrationFeesService:AdminstrativeFeesService,private route: ActivatedRoute,private fb: FormBuilder,  private _translateService: TranslateService, private _toastrNotificationService:ToastrNotificationService, private _breadcrumbService: BreadcrumbService) {
    super();
    
  }
  selectedItem: AdminstrativeFeesDto | null = null; 
  // @Output() onSave = new EventEmitter<AdminstrativeFeesDto>(); 


  GetFeesById(id:string){
    if (id) {
       this._configrationAdmistrationFeesService.GetFeesById(id)
    .subscribe((res:any) => {
      if(res.isDone){
        console.log(res);
        this.selectedItem = res.data;
        this.feesForm.patchValue(res.data);
        this.patchLitigationRequestFees(res.data.litigationRequestFees?.sort((a:any,b:any) =>{return a.arbitratorsCount - b.arbitratorsCount}));
      }
    })
    }
   
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['selectedItem'] && this.selectedItem) {
  //     // this.feesForm.reset(); // Reset the form state
  //     this.GetFeesById(); // Update the form values
  //   }
  // } 

  // closeModal(): void { 
  //   this.selectedItem = null;
  //   this.feesForm.reset(); 
  // }

  iniateForm(){
    this.feesForm = new FormGroup({
      id:new FormControl(),
      fees: new FormControl('', [Validators.required,  Validators.min(1)]),
      fromAmount: new FormControl('', [Validators.required,Validators.min(0)]),
      toAmount: new FormControl('', [Validators.required,Validators.min(1)]),
      // id: new FormControl(''),
      litigationAmount : new FormControl('') ,
      litigationRequestFees: this.fb.array([]),
    });
    
  }


  patchLitigationRequestFees(feesArray: any[]): void {
    const litigationRequestFeesArray = this.feesForm.get('litigationRequestFees') as FormArray;

    // Clear any existing items in the FormArray
    litigationRequestFeesArray.clear();

    // Patch each fee object into the form array
    feesArray.forEach(fee => {
      litigationRequestFeesArray.push(this.fb.group({
        amountId:[fee.amountId],
        id:[fee.id],
        arbitratorsCount: [fee.arbitratorsCount],
        arbitrationFees: [fee.arbitrationFees],
        percentageExtraAmount: [fee.percentageExtraAmount],
        extraAmount: [fee.extraAmount]
      }));
    });
  }

    // Create a new group of controls for each row
    // createItem(arbitiratorCount: number): FormGroup {
    //   return this.fb.group({
    //     amountId:[],
    //     id:[],
    //     arbitratorsCount: [{ value: arbitiratorCount , disabled: true }],
    //     arbitrationFees: [null, [Validators.required, Validators.min(1)]],
    //     percentageExtraAmount: [null, [Validators.required, Validators.min(0)]],
    //     extraAmount: [null, [Validators.required, Validators.min(0)]],
    //   });
    // }

  get items(): FormArray {
    return this.feesForm.get('litigationRequestFees') as FormArray;
  }

  save(): void {
    if (this.feesForm.valid) {
      console.log("form value :",this.feesForm.value)
      this.feesForm.patchValue({
        litigationAmount: `${this.feesForm.get('fromAmount')?.value} - ${this.feesForm.get('toAmount')?.value} \\ رسوم التسجيل ${this.feesForm.get('fees')?.value}`
                                });
      // this.feesForm.patchValue({ id: this.selectedItem?.id ,litigationAmount:this.selectedItem?.litigationAmount });
      // this.onSave.emit(this.feesForm.value);
      // this.closeModal();
      this._configrationAdmistrationFeesService.UpdateFees(this.feesForm.value).subscribe(
        (response) => {
          console.log(response);
          if(response.isDone){
             this.showSuccess(this._translateService.instant(this.translations.general.successfullySave));
          
          }
          else{
            console.error('Error updating item:');
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
        {
          label: this._translateService.instant(this.translations.layout.sidebar.home),
          link: '/'
        },
        { label: this._translateService.instant(this.translations.UsersManagement.AdminstrationFees.listFees), link: `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.admistrativeFees}/`}
        ,{
          label: this._translateService.instant(this.translations.UsersManagement.AdminstrationFees.updateFees), link: Configuration.modules.UsersManagement 
        },
      ])
    }
}
