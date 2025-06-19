import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { DashbourdRequestDto } from '../models/dashbourdRequestDto';


@Injectable()
export class StatisticDashbourdService {

  constructor(private _httpClient: HttpClient) { }


  getAllStatistics(requestDto:DashbourdRequestDto): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(`${Configuration.APIs.dashbourd.getStatistics}`,requestDto)
  }


  getAllLitigationByTypesStatusStatistics(requestDto:DashbourdRequestDto): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(`${Configuration.APIs.dashbourd.DetailsForAllStages}`,requestDto)
  }

  getAllLitigationStatistics(requestDto:DashbourdRequestDto): Observable<BaseResponse<any>> {
    return this._httpClient.post<BaseResponse<any>>(`${Configuration.APIs.dashbourd.GetLitigationStatisticsReviewReports}`,requestDto)
  }

  GetReviewrsReformersArbitratorsStatisticsReport(): Observable<BaseResponse<any>> {
    return this._httpClient.get<BaseResponse<any>>(`${Configuration.APIs.dashbourd.GetReviewrsReformersArbitratorsStatisticsReport}`)
  }
}
