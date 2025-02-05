import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AdminstrativeFeesDto } from '../../../models/AdminstrativeFeesDto';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminstrativeFeesService } from '../../../services/adminstrativeFeesService';

@Component({
  selector: 'app-edit-adminstrative-fees-modal',
  templateUrl: './edit-adminstrative-fees-modal.component.html',
  styleUrl: './edit-adminstrative-fees-modal.component.scss'
})
export class EditAdminstrativeFeesModalComponent extends BaseComponent implements OnInit {
  feesForm!: FormGroup;

  ngOnInit(): void {
    this.feesForm = new FormGroup({
      fees: new FormControl('', [Validators.required,  Validators.min(0)]),
      fromAmount: new FormControl('', [Validators.required,Validators.min(0)]),
      toAmount: new FormControl('', [Validators.required,Validators.min(0)]),
      id: new FormControl(''),
      litigationAmount : new FormControl('') 
    });
    // if (this.selectedItem) {
    //   this.GetFeesById();
    // }

  }


  constructor( private _configrationAdmistrationFeesService:AdminstrativeFeesService,) {
    super();
    
  }
  @Input() selectedItem: AdminstrativeFeesDto | null = null; 
  @Output() onSave = new EventEmitter<AdminstrativeFeesDto>(); 


  GetFeesById(){
    if (this.selectedItem) {
       this._configrationAdmistrationFeesService.GetFeesById(this.selectedItem.id)
    .subscribe((res:any) => {
      if(res.isDone){
        console.log(res);
        this.selectedItem = res.data;
        this.feesForm.patchValue(res.data);
      }
    })
    }
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedItem'] && this.selectedItem) {
      // this.feesForm.reset(); // Reset the form state
      this.GetFeesById(); // Update the form values
    }
  } 

  closeModal(): void { 
    this.selectedItem = null;
    this.feesForm.reset(); 
  }

  save(): void {
    if (this.feesForm.valid) {
      this.feesForm.patchValue({ id: this.selectedItem?.id ,litigationAmount:this.selectedItem?.litigationAmount });
      this.onSave.emit(this.feesForm.value);
      this.closeModal();
    }
  }
  public override ngOnDestroy(): void {
    this.selectedItem = null;
  }
}
