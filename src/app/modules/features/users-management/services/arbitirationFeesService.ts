import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { ArbitirationFeesDto } from '../models/arbitirationFeesDto';

@Injectable()
export class ArbitirationFeesService {

  constructor(private _httpClient: HttpClient) { }

  getAllFees(): Observable<BaseResponse<ArbitirationFeesDto[]>> {
    return this._httpClient.get<BaseResponse<ArbitirationFeesDto[]>>(`${Configuration.APIs.arbitirationFees.getFees}`)
  }
  
  getAllSetting(): Observable<BaseResponse<ArbitirationFeesDto[]>> {
    return this._httpClient.get<BaseResponse<ArbitirationFeesDto[]>>(`${Configuration.APIs.arbitirationFees.getsetting}`)
  }

  UpdateFees(FeesUpdateRange:ArbitirationFeesDto[]):Observable<BaseResponse<any>>{
    console.log(FeesUpdateRange);
    return this._httpClient.put<BaseResponse<any>>(Configuration.APIs.arbitirationFees.updateFees,FeesUpdateRange)
  }
  
}
