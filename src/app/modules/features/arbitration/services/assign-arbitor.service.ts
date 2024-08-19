import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse, EmptyBaseResponse } from '@app/core/models/base-response';
import { Pagination } from '@app/shared/models/pagination.model';
import { Observable } from 'rxjs';
import { LitigationRequestMircoArbitratorDto } from '../models/litigation-request-mirco-arbitrator-dto';
import { Configuration } from '@app/core/configurations/shared.config';
import { ArbitratorsLookupDto } from '../models/arbitrators-lookup-dto';
import { AssignArbitratorRequestPayload } from '../models/assign-arbitrator-request-payload';

@Injectable()
export class AssignArbitorService {
  constructor(private _httpClient: HttpClient) { }

  getAllArbitrationLitigationRequest(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<LitigationRequestMircoArbitratorDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoArbitratorDto[]>>>(`${Configuration.APIs.Arbitration.GetAllArbitrationLitigationRequest}`, { params: queryParams })
  }

  getArbitratorsLookup(citizenId: string, requestId: string): Observable<BaseResponse<ArbitratorsLookupDto[]>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("citizenId", citizenId);
    queryParams = queryParams.append("requestId", requestId);
    return this._httpClient.get<BaseResponse<ArbitratorsLookupDto[]>>(`${Configuration.APIs.Citizen.GetArbitratorsLookup}`, { params: queryParams })
  }


  assign(model: AssignArbitratorRequestPayload): Observable<EmptyBaseResponse> {
    return this._httpClient.post<EmptyBaseResponse>(`${Configuration.APIs.Arbitration.Assign}`, model)
  }

}
