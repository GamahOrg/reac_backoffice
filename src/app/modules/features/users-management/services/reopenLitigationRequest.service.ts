import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { Pagination } from '@app/shared/models/pagination.model';
import {
  LitigationRequestClosedListDto,
  LitigationRequestReopenInfoDto,
  ReopenLitigationRequestDto
} from '../models/reopenLitigationRequestDto';

@Injectable()
export class ReopenLitigationRequestService {

  constructor(private _httpClient: HttpClient) { }

  GetClosedLitigationRequests(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<LitigationRequestClosedListDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestClosedListDto[]>>>(
      `${Configuration.APIs.reopenLitigationRequest.GetClosedLitigationRequests}`, { params: queryParams }
    );
  }

  GetLitigationRequestReopenInfo(litigationRequestId: string): Observable<BaseResponse<LitigationRequestReopenInfoDto>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationRequestId", litigationRequestId);
    return this._httpClient.get<BaseResponse<LitigationRequestReopenInfoDto>>(
      `${Configuration.APIs.reopenLitigationRequest.GetLitigationRequestReopenInfo}`, { params: queryParams }
    );
  }

  ReopenLitigationRequest(model: ReopenLitigationRequestDto): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(
      `${Configuration.APIs.reopenLitigationRequest.ReopenLitigationRequest}`, model
    );
  }
}
