import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { CitizenFullLookupArbirator, CitizenReformer } from '../models/citizen.model';
import { EmployeeReviewer } from '../models/employee.model';

@Injectable()
export class EmployeeService {

  constructor(private _httpClient: HttpClient) { }

  getReviewesLookup(citizenId: string, requestId: string): Observable<BaseResponse<EmployeeReviewer[]>> {
    let queryParams = new HttpParams();
    if (citizenId && requestId)
      // queryParams = queryParams.append("citizenId", citizenId);
    queryParams = queryParams.append("requestId", requestId);
    return this._httpClient.get<BaseResponse<any[]>>(`${Configuration.APIs.LitigationRequest.GetReviewersLookup}`, { params: queryParams })
  }

  
}
