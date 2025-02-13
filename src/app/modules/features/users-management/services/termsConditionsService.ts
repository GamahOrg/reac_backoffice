import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { termsConditionsDto, termsConditionsUpdateDto } from '../models/termsConditionsDto';

@Injectable()
export class termsConditionsService {

  constructor(private _httpClient: HttpClient) { }


  getAllTerms(): Observable<BaseResponse<termsConditionsDto[]>> {
    return this._httpClient.get<BaseResponse<termsConditionsDto[]>>(`${Configuration.APIs.termsSettings.getTerms}`)
  }

  UpdateTerms(UpdateRange:termsConditionsDto[]):Observable<BaseResponse<any>>{
    console.log(UpdateRange);
    return this._httpClient.put<BaseResponse<any>>(Configuration.APIs.termsSettings.updateTerms,UpdateRange)
  }
  
}
