import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { map, Observable } from 'rxjs';
import { ArbitrationRequests, CustomLitigationRequestMircoArbitratorDto } from '../../models/arbitration-request.model';
import { LitigationRequestForCorrespondences, LitigationRequestCorrespondenceCreateUpdateDto, LitigationRequestCorrespondencesDto } from '../../models/arbitration-request-correspondences.model';
import { Pagination } from '@app/shared/models/pagination.model';

@Injectable()
export class ArbitrationRequestCorrespondencesService {

  constructor(private _httpClient: HttpClient) { }

  GetArbitrationCorrespondencesById(litigationId: string, litigationRequestCategoryIds: number[]): Observable<BaseResponse<LitigationRequestForCorrespondences>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationId", litigationId);
    return this._httpClient.post<BaseResponse<LitigationRequestForCorrespondences>>(`${Configuration.APIs.LitigationRequestCorrespondence.getCorrespondencesById}`, litigationRequestCategoryIds, { params: queryParams })
  }

  AddArbitrationCorrespondences(input: LitigationRequestCorrespondenceCreateUpdateDto): Observable<BaseResponse<LitigationRequestCorrespondencesDto[]>> {

    return this._httpClient.post<BaseResponse<LitigationRequestCorrespondencesDto[]>>(`${Configuration.APIs.LitigationRequestCorrespondence.addCorrespondence}`, input)
  }

  GetLitigationRequestArbitrationCorrespondence(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<CustomLitigationRequestMircoArbitratorDto[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<CustomLitigationRequestMircoArbitratorDto[]>>>(Configuration.APIs.LitigationRequestCorrespondence.getLitigationRequestArbitrationCorrespondence,{params:queryParams}).pipe(
      map((res: BaseResponse<Pagination<CustomLitigationRequestMircoArbitratorDto[]>>) => {
       if (res.isDone) {
         return res;
       } else {
         return {
           isDone: false,
           message: 'Failed to fetch data',
           data: {} as Pagination<CustomLitigationRequestMircoArbitratorDto[]>
         } as BaseResponse<Pagination<CustomLitigationRequestMircoArbitratorDto[]>>;
       }
      })
    );
    }
}