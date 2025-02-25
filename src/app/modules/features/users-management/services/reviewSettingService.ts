import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { ReviewSettingsDto } from '../models/reviewSettingDto';

@Injectable()
export class ReviewSettingService {

  constructor(private _httpClient: HttpClient) { }


  getAllSettings(): Observable<BaseResponse<ReviewSettingsDto[]>> {
    return this._httpClient.get<BaseResponse<ReviewSettingsDto[]>>(`${Configuration.APIs.reviewSettings.getsetting}`)
  }

  UpdateSettings(UpdateRange:ReviewSettingsDto[]):Observable<BaseResponse<any>>{
    console.log(UpdateRange);
    return this._httpClient.put<BaseResponse<any>>(Configuration.APIs.reviewSettings.updatesetting,UpdateRange)
  }
  
}
