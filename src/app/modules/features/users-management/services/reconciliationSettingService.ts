import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { AdminstrativeFeesDto } from '../models/AdminstrativeFeesDto';
import { ReconciliationFeesDto } from '../models/reconciliationFeesDto';

@Injectable()
export class ReconciliationSettingService {

  constructor(private _httpClient: HttpClient) { }


  getAllSettings(): Observable<BaseResponse<ReconciliationFeesDto[]>> {
    return this._httpClient.get<BaseResponse<ReconciliationFeesDto[]>>(`${Configuration.APIs.reconciliationSettings.getsetting}`)
  }

  UpdateSettings(FeesUpdateRange:ReconciliationFeesDto[]):Observable<BaseResponse<any>>{
    console.log(FeesUpdateRange);
    return this._httpClient.put<BaseResponse<any>>(Configuration.APIs.reconciliationFees.updateFees,FeesUpdateRange)
  }
  
}
