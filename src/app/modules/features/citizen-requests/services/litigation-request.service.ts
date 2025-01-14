import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse, EmptyBaseResponse } from '@app/core/models/base-response';
import { Pagination } from '@app/shared/models/pagination.model';
import { Observable } from 'rxjs';
import { LitigationRequestMircoForRequestReformerDto, LitigationRequestMircoForRequestSessionDto, LitigationRequestSessionDetailsDto } from '../models/litigation-request.model';
import { Configuration } from '@app/core/configurations/shared.config';
import { AssignRequestPayload } from '../models/citizen.model';

@Injectable()
export class LitigationRequestService {

  constructor(private _httpClient: HttpClient) { }

  GetLitigationRequestForFullAllSession(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<LitigationRequestMircoForRequestSessionDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoForRequestSessionDto[]>>>(`${Configuration.APIs.Reconciliation.GetLitigationRequestForFullAllSession}`, { params: queryParams })
  }

  GetLitigationRequestSessionDetails(meetingId: number): Observable<BaseResponse<LitigationRequestSessionDetailsDto>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("MeetingId", meetingId);
    return this._httpClient.get<BaseResponse<LitigationRequestSessionDetailsDto>>(`${Configuration.APIs.OTP.getZoomMeetingDetails}`, { params: queryParams })
  }

  GetLitigationRequestForFullAllReformer(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<LitigationRequestMircoForRequestReformerDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoForRequestReformerDto[]>>>(`${Configuration.APIs.Reconciliation.GetLitigationRequestForFullAllReformer}`, { params: queryParams })
  }


  assign(model: AssignRequestPayload): Observable<EmptyBaseResponse> {
    return this._httpClient.post<EmptyBaseResponse>(`${Configuration.APIs.Reconciliation.Assign}`, model)
  }



}
