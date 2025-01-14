import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { GetArbitratorsCountByRequestIdResponseDto } from '../../models/get-arbitrators-count-by-request-id-response-dto.model';
import { AddArbitratorsCountRequestDto } from '../../models/add-arbitrators-count-request-dto.model';
import { ArbitratorCountResponseDto } from '../../models/arbitrator-count-response-dto.model';

@Injectable()
export class ArbitratorCountDetailsService {

  constructor(private _httpClient: HttpClient) { }

  GetLitigationRequestForAddArbitratorsCountByRequestId(requestId: string): Observable<BaseResponse<GetArbitratorsCountByRequestIdResponseDto>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("requestId", requestId);
    return this._httpClient.get<BaseResponse<GetArbitratorsCountByRequestIdResponseDto>>(Configuration.APIs.Arbitration.GetLitigationRequestForAddArbitratorsCountByRequestId, { params: queryParams })
  }
  AddArbitratorsCount(AddArbitratorsCountRequest: AddArbitratorsCountRequestDto): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(Configuration.APIs.Arbitration.AddArbitratorsCount, AddArbitratorsCountRequest)
  }
  GetSysArbitratorCount(): Observable<BaseResponse<ArbitratorCountResponseDto[]>> {
    return this._httpClient.get<BaseResponse<ArbitratorCountResponseDto[]>>(Configuration.APIs.SysArbitratorCount.Get)
  }
}
