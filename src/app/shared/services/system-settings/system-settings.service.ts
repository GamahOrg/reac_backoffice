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
}
