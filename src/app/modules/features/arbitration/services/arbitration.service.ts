import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse, type EmptyBaseResponse } from '@app/core/models/base-response';
import { Pagination } from '@app/shared/models/pagination.model';
import { Observable } from 'rxjs';
import { LitigationRequestMircoForRequestSessionDto, LitigationRequestSessionDetailsDto } from '../../citizen-requests/models/litigation-request.model';
import { Configuration } from '@app/core/configurations/shared.config';

@Injectable()
export class ArbitrationService {

  constructor(private _httpClient: HttpClient) { }

  GetLitigationRequestForFullAllSession(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<LitigationRequestMircoForRequestSessionDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoForRequestSessionDto[]>>>(`${Configuration.APIs.Arbitration.GetLitigationRequestForFullAllSession}`, { params: queryParams })
  }

  GetLitigationRequestSessionDetails(meetingId: number): Observable<BaseResponse<LitigationRequestSessionDetailsDto>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("MeetingId", meetingId);
    return this._httpClient.get<BaseResponse<LitigationRequestSessionDetailsDto>>(`${Configuration.APIs.OTP.getZoomMeetingDetails}`, { params: queryParams })
  }

  ApproveArbitrationFeesPaid(requestId: string): Observable<EmptyBaseResponse> {
      return this._httpClient.get<EmptyBaseResponse>(`${Configuration.APIs.LitigationRequest.ApproveArbitrationFeesPaid}/${requestId}`)
    }

}
