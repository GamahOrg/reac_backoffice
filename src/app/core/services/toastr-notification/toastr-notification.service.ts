import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
// export interface ActiveToast {
//   /** Your Toast ID. Use this to close it individually */
//   toastId: number;
//   /** the title of your toast. Stored to prevent duplicates if includeTitleDuplicates set */
//   title: string;
//   /** the message of your toast. Stored to prevent duplicates */
//   message: string;
//   /** a reference to the component see portal.ts */
//   portal: ComponentRef<any>;
//   /** a reference to your toast */
//   toastRef: ToastRef<any>;
//   /** triggered when toast is active */
//   onShown: Observable<any>;
//   /** triggered when toast is destroyed */
//   onHidden: Observable<any>;
//   /** triggered on toast click */
//   onTap: Observable<any>;
//   /** available for your use in custom toast */
//   onAction: Observable<any>;
// }
@Injectable()
export class ToastrNotificationService {
  closeButton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  timeOut: BehaviorSubject<number> = new BehaviorSubject<number>(5000); // Time to live in milliseconds
  
  constructor(private _toastrService: ToastrService) { }

  showError(errorMsgBody: string = 'No Data!', titleMsgBody: string = '') {
    this._toastrService.error(errorMsgBody, titleMsgBody,{
      // toastComponent: ToastrNotificationComponent,
      closeButton: this.closeButton.value,
      timeOut: this.timeOut.value,
      positionClass:'toast-top-right'
    });
  }
  
  showInfo(InfoMsgBody:string, titleMsgBody: string ="") {
    this._toastrService.info(InfoMsgBody, titleMsgBody,{
      // toastComponent: ToastrNotificationComponent,
      closeButton: this.closeButton.value,
      timeOut: this.timeOut.value,
      positionClass:'toast-top-right'
    });
  }

  showSuccess(InfoMsgBody:string, titleMsgBody: string ="") {
    this._toastrService.success(InfoMsgBody, titleMsgBody,{
      // toastComponent: ToastrNotificationComponent,
      closeButton: this.closeButton.value,
      timeOut: this.timeOut.value,
      positionClass:'toast-top-right'
    });
  }
}
