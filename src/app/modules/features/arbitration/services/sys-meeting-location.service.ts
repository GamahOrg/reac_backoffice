import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { SysMeetingLocationCreateUpdateDto } from '../models/meeting-location.model';
import { Configuration } from '@app/core/configurations/shared.config';

@Injectable()
export class SysMeetingLocationService {

  constructor(private _httpClient: HttpClient) { }

  getMeetingLocations(): Observable<BaseResponse<SysMeetingLocationCreateUpdateDto[]>> {
    return this._httpClient.get<BaseResponse<SysMeetingLocationCreateUpdateDto[]>>(Configuration.APIs.Arbitration.GetMeetingLocations);
  }
}
