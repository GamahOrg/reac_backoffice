import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { map, Observable } from 'rxjs';
import { LitigationRequestMircoDtoReformer } from '@app/modules/features/citizen-requests/models/litigation-request-mirco-dto-reformer';
import { Pagination } from '@app/shared/models/pagination.model';
import { LitigationRequestForCorrespondences, LitigationRequestCorrespondenceCreateUpdateDto, LitigationRequestCorrespondencesDto } from '@app/modules/features/arbitration/models/arbitration-request-correspondences.model';

@Injectable()
export class LitigationRequestCorrespondencesService {

  constructor(private _httpClient: HttpClient) { }

  GetLitigationCorrespondencesById(litigationId: string, litigationRequestCategoryIds: number[]): Observable<BaseResponse<LitigationRequestForCorrespondences>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationId", litigationId);
    return this._httpClient.post<BaseResponse<LitigationRequestForCorrespondences>>(`${Configuration.APIs.LitigationRequestCorrespondence.getCorrespondencesById}`, litigationRequestCategoryIds, { params: queryParams })
  }

  AddLitigationCorrespondences(input: LitigationRequestCorrespondenceCreateUpdateDto): Observable<BaseResponse<LitigationRequestCorrespondencesDto[]>> {

    return this._httpClient.post<BaseResponse<LitigationRequestCorrespondencesDto[]>>(`${Configuration.APIs.LitigationRequestCorrespondence.addCorrespondence}`, input)
  }

  GetLitigationRequestLitigationCorrespondence(pageIndex: number, pageSize: number):  Observable<Pagination<LitigationRequestMircoDtoReformer[] >> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoDtoReformer[]>>>(`${Configuration.APIs.LitigationRequestCorrespondence.getLitigationRequestReconciliationCorrespondence}`, { params: queryParams }).pipe(
      map((res: BaseResponse<Pagination<LitigationRequestMircoDtoReformer[]>>) => {
       if(res.isDone){
        
         return res.data as Pagination<LitigationRequestMircoDtoReformer[]>;
       }
       else
       return {} as Pagination<LitigationRequestMircoDtoReformer[]>;
      })
    );}


}
