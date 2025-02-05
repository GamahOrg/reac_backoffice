import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { ReconciliationFeesDto } from '../models/reconciliationFeesDto';

@Injectable()
export class ReconciliationFeesService {

  constructor(private _httpClient: HttpClient) { }

  getAllFees(): Observable<BaseResponse<ReconciliationFeesDto[]>> {
    return this._httpClient.get<BaseResponse<ReconciliationFeesDto[]>>(`${Configuration.APIs.reconciliationFees.getFees}`)
  }
  
  UpdateFees(FeesUpdateRange:ReconciliationFeesDto[]):Observable<BaseResponse<any>>{
    console.log(FeesUpdateRange);
    return this._httpClient.put<BaseResponse<any>>(Configuration.APIs.reconciliationFees.updateFees,FeesUpdateRange)
  }
  
}
