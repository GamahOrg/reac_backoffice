import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LitigationRequestMircoDto } from '../../citizen-requests/models/litigation-request-mirco-dto';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';
import { LitigationRequestForArbitrationReportExplanationRequestDto } from '../models/litigation-request-for-arbitration-report-explanation-request-dto';
import { LitigationRequestArbitrationReportExplanationResponseDto } from '../models/litigation-request-arbitration-report-explanation-response-dto';
import { Configuration } from '@app/core/configurations/shared.config';
import { Pagination } from '@app/shared/models/pagination.model';

@Injectable()
export class LitigationRequestForReportExplanationService {

  constructor(private _httpClient : HttpClient) {
  }

  getLitigationRequestForReportExplanationRequest( pageIndex:number,  pageSize:number):  Observable<BaseResponse<Pagination<LitigationRequestMircoDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoDto[]>>>(Configuration.APIs.Arbitration.GetLitigationRequestForReportExplanationRequestForArbitrator, { params: queryParams })

  }
  addArbitrationReportExplanationRequestForArbitrator(litigationRequestArbitrationReportExplanationResponse: LitigationRequestArbitrationReportExplanationResponseDto): Observable<LitigationRequestForArbitrationReportExplanationRequestDto |null> {
    
   return this._httpClient.post<BaseResponse<LitigationRequestForArbitrationReportExplanationRequestDto>>
     (Configuration.APIs.Arbitration.AddArbitrationReportExplanationRequestForArbitrator, litigationRequestArbitrationReportExplanationResponse).pipe(
       map((res: BaseResponse<LitigationRequestForArbitrationReportExplanationRequestDto>) => {
         if ( res && res.data) {
           return res.data
         } else {
           return null
         }
       })
     )
 } 
  
   getLitigationRequestExtendPeriodForEmployeeByRequestId(requestId:string): Observable<LitigationRequestForArbitrationReportExplanationRequestDto | null> {
  let queryParams = new HttpParams();
  queryParams = queryParams.append("litigationRequestId", requestId);
  return this._httpClient.get<BaseResponse<LitigationRequestForArbitrationReportExplanationRequestDto>>(`${Configuration.APIs.Arbitration.GetLitigationRequestForReportExplanationRequestForArbitratorByRequestId}`, { params: queryParams }).pipe(
    map((res: BaseResponse<LitigationRequestForArbitrationReportExplanationRequestDto>) => {
     if(res.isDone){
       return res.data as LitigationRequestForArbitrationReportExplanationRequestDto;
     }
     else
     return {} as LitigationRequestForArbitrationReportExplanationRequestDto;
    })
  );
} 
}
