import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { ArbitrationRequests, CustomLitigationRequestMircoArbitratorDto } from '../../models/arbitration-request.model';

@Injectable()
export class TasksRequestsListService {

  constructor(private _httpClient: HttpClient) { }


  getLitigationRequestArbitrationAssigningRequests(pageIndex: number, pageSize: number): Observable<BaseResponse<ArbitrationRequests>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<ArbitrationRequests>>(Configuration.APIs.Arbitration.GetLitigationRequestArbitratorAssigningRequestsAll,{params:queryParams})
}


}
