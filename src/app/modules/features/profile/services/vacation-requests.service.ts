import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { SysVacationRequestCreateUpdateDto } from '../models/vacation-requests.model';
import { Pagination } from '@app/shared/models/pagination.model';

@Injectable()
export class VacationRequestService {

  constructor(private _httpClient: HttpClient) { }

  
  CreateVacation(model: SysVacationRequestCreateUpdateDto):Observable<BaseResponse<any>>{
    return this._httpClient.post<BaseResponse<any>>(Configuration.APIs.profile.createVacationRequest,model)
  }

  ProcessVacation(requestId: string , result: boolean):Observable<BaseResponse<any>>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("requestId", requestId);
    queryParams = queryParams.append("result", result);
    return this._httpClient.post<BaseResponse<any>>(Configuration.APIs.profile.ProcessVacationRequest,null,{ params: queryParams })
  }

  GetVacationRequestsForEmployee(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<SysVacationRequestCreateUpdateDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<SysVacationRequestCreateUpdateDto[]>>>(`${Configuration.APIs.profile.getVacationRequestsForEmployee}`, { params: queryParams })
  }
  GetVacationRequestsForAdmin(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<SysVacationRequestCreateUpdateDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<SysVacationRequestCreateUpdateDto[]>>>(`${Configuration.APIs.profile.getVacationRequestsForAdmin}`, { params: queryParams })
  }
}
