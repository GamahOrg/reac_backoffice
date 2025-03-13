import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { AreaResponse } from '@app/modules/features/citizen-requests/models/area-response.model';
import { CityResponse } from '@app/modules/features/citizen-requests/models/city-response.model';
import { Observable } from 'rxjs';


@Injectable()
export class LookupsService {

  constructor(private _httpClient: HttpClient) { }

  SysCity(): Observable<BaseResponse<CityResponse[]>> {
    return this._httpClient.get<BaseResponse<CityResponse[]>>(Configuration.APIs.SysCity.Get)
  }

  GetSysArea(): Observable<BaseResponse<AreaResponse[]>> {
    return this._httpClient.get<BaseResponse<AreaResponse[]>>(Configuration.APIs.SysArea.Get)
  }

}
