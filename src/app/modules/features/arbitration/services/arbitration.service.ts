import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse, type EmptyBaseResponse } from '@app/core/models/base-response';
import { Pagination } from '@app/shared/models/pagination.model';
import { map, Observable } from 'rxjs';
import { LitigationRequestMircoForRequestSessionDto, LitigationRequestSessionDetailsDto } from '../../citizen-requests/models/litigation-request.model';
import { Configuration } from '@app/core/configurations/shared.config';
import { LitigationRequestMircoDto } from '../../citizen-requests/models/litigation-request-mirco-dto';
import { ArbitratorNominationListRequestReplyPayload, LitigationRequestForAllArbitratorNominationListWithPartiesValueDto } from '../../citizen-requests/models/assign-arbitrators.model';
import { ArbitrationReportDto, LitigationRequestForArbitrationReportDto, LitigationRequestMircoDto as ArbitrationMircoDto, LitigationRequestReportAdminFilterDto } from '../models/arbitration-request.model';
import { LitigationRequestForArbitrationReportCorrectionRequestDto } from '../models/arbitration-report-correction-request-dto';
import { ArbitrationReportCorrectionRequestCreateDto } from '../models/arbitration-report-correction-request-create-dto';
import { ArbitrationCorrectionRequestResponseDto } from '../models/arbitration-correction-request-response-dto';

@Injectable()
export class ArbitrationService {

  constructor(private _httpClient: HttpClient) { }

  GetCitizenLitigationRequestForArbitratorsNominationListReplyByRequestId(requestId: string): Observable<LitigationRequestForAllArbitratorNominationListWithPartiesValueDto | null> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationRequestId", requestId);
    return this._httpClient.get<BaseResponse<LitigationRequestForAllArbitratorNominationListWithPartiesValueDto>>(`${Configuration.APIs.Arbitration.GetCitizenLitigationRequestForArbitratorsNominationListReplyByRequestId}`, { params: queryParams }).pipe(
      map((res: BaseResponse<LitigationRequestForAllArbitratorNominationListWithPartiesValueDto>) => {
        if (res.isDone) {
          return res.data as LitigationRequestForAllArbitratorNominationListWithPartiesValueDto;
        }
        else
          return {} as LitigationRequestForAllArbitratorNominationListWithPartiesValueDto;
      })
    );
  }
  ReNotifyPartiesToSelectArbitrators(requestId: string): Observable<BaseResponse<any>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationRequestId", requestId);
    return this._httpClient.get<BaseResponse<any>>(`${Configuration.APIs.Arbitration.ReNotifyPartiesToSelectArbitrators}`, { params: queryParams }).pipe(
      map((res: BaseResponse<any>) => {
        if (res.isDone) {
          debugger;
          return res as BaseResponse<any>;
        }
        else
          return {} as BaseResponse<any>;
      })
    );
  }

    AddCitizenLitigationRequestForReportArbitratorsNominationListReplyForCoAdmin(model: ArbitratorNominationListRequestReplyPayload): Observable<BaseResponse<LitigationRequestForAllArbitratorNominationListWithPartiesValueDto>> {
    return this._httpClient.post<BaseResponse<LitigationRequestForAllArbitratorNominationListWithPartiesValueDto>>(`${Configuration.APIs.Arbitration.AddCitizenLitigationRequestForReportArbitratorsNominationListReplyForCoAdmin}`, model)
  }

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

    GetDueDateLitigationRequestForAssignArbitrators(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<LitigationRequestMircoDto[]>>> {
        let queryParams = new HttpParams();
            queryParams = queryParams.append("pageIndex", pageIndex);
            queryParams = queryParams.append("pageSize", pageSize);
            return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoDto[]>>>(`${Configuration.APIs.Arbitration.GetDueDateLitigationRequestForAssignArbitrators}`, { params: queryParams });
      }

  getReconciliationRequestForReport(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<ArbitrationMircoDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<ArbitrationMircoDto[]>>>(Configuration.APIs.Arbitration.GetLitigationRequestForReport, { params: queryParams })
  }

  getLitigationRequestForReport(requestId: string): Observable<BaseResponse<LitigationRequestForArbitrationReportDto>> {
    return this._httpClient.get<BaseResponse<LitigationRequestForArbitrationReportDto>>(`${Configuration.APIs.Arbitration.GetLitigationRequestForReportByRequestId}?litigationRequestId=${requestId}`)
  }

  addArbitrationReport(model: ArbitrationReportDto): Observable<BaseResponse<LitigationRequestForArbitrationReportDto>> {
    return this._httpClient.post<BaseResponse<LitigationRequestForArbitrationReportDto>>(`${Configuration.APIs.Arbitration.AddArbitrationReport}`, model)
  }

  getArbitrationReportCorrectionRequestByRequestId(requestId: string): Observable<LitigationRequestForArbitrationReportCorrectionRequestDto | null> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationRequestId", requestId);
    return this._httpClient.get<BaseResponse<LitigationRequestForArbitrationReportCorrectionRequestDto>>(
      `${Configuration.APIs.Arbitration.GetArbitrationReportCorrectionRequestByRequestId}`, { params: queryParams }
    ).pipe(
      map((res: BaseResponse<LitigationRequestForArbitrationReportCorrectionRequestDto>) => {
        if (res.isDone) {
          return res.data as LitigationRequestForArbitrationReportCorrectionRequestDto;
        }
        return {} as LitigationRequestForArbitrationReportCorrectionRequestDto;
      })
    );
  }

  addArbitrationReportCorrectionRequest(dto: ArbitrationReportCorrectionRequestCreateDto): Observable<LitigationRequestForArbitrationReportCorrectionRequestDto | null> {
    return this._httpClient.post<BaseResponse<LitigationRequestForArbitrationReportCorrectionRequestDto>>(
      Configuration.APIs.Arbitration.AddArbitrationReportCorrectionRequest, dto
    ).pipe(
      map((res: BaseResponse<LitigationRequestForArbitrationReportCorrectionRequestDto>) => {
        if (res && res.data) {
          return res.data;
        }
        return null;
      })
    );
  }

  addArbitrationCorrectionRequestResponse(dto: ArbitrationCorrectionRequestResponseDto): Observable<BaseResponse<LitigationRequestForArbitrationReportCorrectionRequestDto>> {
    return this._httpClient.post<BaseResponse<LitigationRequestForArbitrationReportCorrectionRequestDto>>(
      Configuration.APIs.Arbitration.AddArbitrationCorrectionRequestResponse, dto
    );
  }

    getArbitrationRequestForAdminReport(pageIndex: number, pageSize: number, filter?: LitigationRequestReportAdminFilterDto): Observable<BaseResponse<Pagination<ArbitrationMircoDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          queryParams = queryParams.append(key.charAt(0).toUpperCase() + key.slice(1), value);
        }
      });
    }
    return this._httpClient.get<BaseResponse<Pagination<ArbitrationMircoDto[]>>>(Configuration.APIs.Arbitration.GetLitigationRequestForReportForAdmin, { params: queryParams })
  }

}
