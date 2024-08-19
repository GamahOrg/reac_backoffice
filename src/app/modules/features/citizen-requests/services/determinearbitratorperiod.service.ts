import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { Pagination } from '@app/shared/models/pagination.model';
import { map, Observable } from 'rxjs';
import { LitigationRequestMircoForArbitratorsSelectionDurationDto } from '../models/litigation-request-mirco-for-arbitrators-selection-duration-dto';
// import { BaseResponse } from '@app/core/models/base-response';
import { BaseResponse, EmptyBaseResponse } from '@app/core/models/base-response';
import { ArbitratorSelectionDurationRequestPayload } from '../models/arbitrator-selection-duration-request-payload';
import { ArbitratorNominationListRequestPayload, LitigationRequestForAllArbitratorNominationCharmanListDto, LitigationRequestForAllArbitratorNominationListDto, LitigationRequestForArbitratorSelectionDurationDto } from '../models/litigation-request-for-arbitrator-selection-duration-dto';
import { LitigationRequestMircoDto } from '../models/litigation-request-mirco-dto';

@Injectable()
export class DeterminearbitratorperiodService {

  constructor(private _httpClient: HttpClient) {
  }

  getLitigationRequestForArbitratorSelectionDuration(pageIndex: number, pageSize: number): Observable<Pagination<LitigationRequestMircoForArbitratorsSelectionDurationDto[]>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoForArbitratorsSelectionDurationDto[]>>>(`${Configuration.APIs.Arbitration.GetLitigationRequestForArbitratorSelectionDuration}`, {params: queryParams})
    .pipe(
      map((res: BaseResponse<Pagination<LitigationRequestMircoForArbitratorsSelectionDurationDto[]>>) => {
       if(res.isDone){
         return res.data as Pagination<LitigationRequestMircoForArbitratorsSelectionDurationDto[]>;
       }
       else
       return {} as Pagination<LitigationRequestMircoForArbitratorsSelectionDurationDto[]>;
      })
    );
  }
  addArbitratorSelectionDuration(arbitratorSelectionDurationRequestPayload: ArbitratorSelectionDurationRequestPayload): Observable<LitigationRequestForArbitratorSelectionDurationDto | null> {
    return this._httpClient.post<BaseResponse<LitigationRequestForArbitratorSelectionDurationDto>>
      (Configuration.APIs.Arbitration.AddArbitratorSelectionDuration, arbitratorSelectionDurationRequestPayload).pipe(
        map((res: BaseResponse<LitigationRequestForArbitratorSelectionDurationDto>) => {
          if (res && res.data) {
            return res.data
          } else {
            return null
          }
        })
      )
  }

  getLitigationRequestForAddArbitratorSelectionDurationByRequestId(requestId: string): Observable<LitigationRequestForArbitratorSelectionDurationDto | null> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("requestId", requestId);
    return this._httpClient.get<BaseResponse<LitigationRequestForArbitratorSelectionDurationDto>>(`${Configuration.APIs.Arbitration.GetLitigationRequestForAddArbitratorSelectionDurationByRequestId}`, { params: queryParams }).pipe(
      map((res: BaseResponse<LitigationRequestForArbitratorSelectionDurationDto>) => {
        if (res.isDone) {
          return res.data as LitigationRequestForArbitratorSelectionDurationDto;
        }
        else
          return {} as LitigationRequestForArbitratorSelectionDurationDto;
      })
    );
  }

  assignArbitrationMemeberList(pageIndex: number, pageSize: number): Observable<Pagination<LitigationRequestMircoDto[]>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoDto[]>>>(`${Configuration.APIs.Arbitration.assignArbitrationMemeberList}`, { params: queryParams }).pipe(
      map((res: BaseResponse<Pagination<LitigationRequestMircoDto[]>>) => {
        if (res.isDone) {
          return res.data as Pagination<LitigationRequestMircoDto[]>;
        }
        else
          return {} as Pagination<LitigationRequestMircoDto[]>;
      })
    );
  }

  GetLitigationRequestForAddArbitratorsNominationListByRequestId(requestId: string): Observable<LitigationRequestForAllArbitratorNominationListDto | null> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationRequestId", requestId);
    return this._httpClient.get<BaseResponse<LitigationRequestForAllArbitratorNominationListDto>>(`${Configuration.APIs.Arbitration.GetLitigationRequestForAddArbitratorsNominationListByRequestId}`, { params: queryParams }).pipe(
      map((res: BaseResponse<LitigationRequestForAllArbitratorNominationListDto>) => {
        if (res.isDone) {
          return res.data as LitigationRequestForAllArbitratorNominationListDto;
        }
        else
          return {} as LitigationRequestForAllArbitratorNominationListDto;
      })
    );
  }



  AddLitigationRequestArbitratorsNominationList(model: ArbitratorNominationListRequestPayload): Observable<BaseResponse<LitigationRequestForAllArbitratorNominationListDto>> {
    return this._httpClient.post<BaseResponse<LitigationRequestForAllArbitratorNominationListDto>>(`${Configuration.APIs.Arbitration.AddLitigationRequestArbitratorsNominationList}`, model)
  }

  GetLitigationRequestForAddArbitratorsChairmanNominationList(pageIndex: number, pageSize: number): Observable<Pagination<LitigationRequestMircoDto[]>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoDto[]>>>(`${Configuration.APIs.Arbitration.GetLitigationRequestForAddArbitratorsChairmanNominationList}`, { params: queryParams }).pipe(
      map((res: BaseResponse<Pagination<LitigationRequestMircoDto[]>>) => {
        if (res.isDone) {
          return res.data as Pagination<LitigationRequestMircoDto[]>;
        }
        else
          return {} as Pagination<LitigationRequestMircoDto[]>;
      })
    );
  }

  GetLitigationRequestForAddArbitratorsChairmanNominationListByRequestId(requestId: string): Observable<LitigationRequestForAllArbitratorNominationCharmanListDto | null> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationRequestId", requestId);
    return this._httpClient.get<BaseResponse<LitigationRequestForAllArbitratorNominationCharmanListDto>>(`${Configuration.APIs.Arbitration.GetLitigationRequestForAddArbitratorsChairmanNominationListByRequestId}`, { params: queryParams }).pipe(
      map((res: BaseResponse<LitigationRequestForAllArbitratorNominationCharmanListDto>) => {
        if (res.isDone) {
          return res.data as LitigationRequestForAllArbitratorNominationCharmanListDto;
        }
        else
          return {} as LitigationRequestForAllArbitratorNominationCharmanListDto;
      })
    );
  }

  AddLitigationRequestArbitratorsChairmanNominationList(model: ArbitratorNominationListRequestPayload): Observable<BaseResponse<LitigationRequestForAllArbitratorNominationCharmanListDto>> {
    return this._httpClient.post<BaseResponse<LitigationRequestForAllArbitratorNominationCharmanListDto>>(`${Configuration.APIs.Arbitration.AddLitigationRequestArbitratorsChairmanNominationList}`, model)
  }



}
