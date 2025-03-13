import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { SysSettings } from '@app/shared/models/system-settings.model';
import { Observable } from 'rxjs';

@Injectable()
export class SystemSettingsService {

  constructor(private _httpClient: HttpClient) { }

  
  GetSystemSettingsByKey(input : string): Observable<BaseResponse<SysSettings>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("key", input);

    return this._httpClient.get<BaseResponse<SysSettings>>(Configuration.APIs.SysSetting.GetSettingByKey, {params : queryParams})
  }

  ToggleAutoDistributionOnAndOff(departmentType: number, status: number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("departmentType", departmentType);
    queryParams = queryParams.append("status", status);

    return this._httpClient.get<any>(Configuration.APIs.SysSetting.ToggleAutoDistributionOnAndOff, {params : queryParams})

  }

  GetDistributionModeByDepartmentType(departmentType: number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("departmentType", departmentType);

    return this._httpClient.get<any>(Configuration.APIs.SysSetting.GetDistributionModeByDepartmentType, {params : queryParams})

  }
}
