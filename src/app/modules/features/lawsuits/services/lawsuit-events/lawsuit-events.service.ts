import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { GetRequestLogForEmployeeResponseDto } from '../../models/get-request-log-for-employee-response-dto.model';

@Injectable()
export class LawsuitEventsService {

  constructor(private _httpClient: HttpClient) { }

  GetRequestLogForEmployee(requestId: string): Observable<BaseResponse<GetRequestLogForEmployeeResponseDto[]>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("requestId", requestId);
    return this._httpClient.get<BaseResponse<GetRequestLogForEmployeeResponseDto[]>>(Configuration.APIs.BpfService.GetRequestLogForEmployee, { params: queryParams })
  }
}
