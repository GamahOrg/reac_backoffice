import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Pagination } from '@app/shared/models/pagination.model';
import { Observable } from 'rxjs';
import { GetArbitratorsCountResponseDto } from '../../models/get-arbitrators-count-response-dto.model';

@Injectable()
export class ArbitratorCountListService {

  constructor(private _httpClient: HttpClient) { }

  GetLitigationRequestForAddArbitratorsCount(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<GetArbitratorsCountResponseDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<GetArbitratorsCountResponseDto[]>>>(Configuration.APIs.Arbitration.GetLitigationRequestForAddArbitratorsCount, { params: queryParams })
  }
}
