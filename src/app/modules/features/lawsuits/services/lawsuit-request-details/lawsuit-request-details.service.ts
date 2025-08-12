import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { Observable, map, of } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';
import { createQuery } from '@app/shared/helpers/create-query';
import { LawsuitItemDetails } from '../../models/lawsuit-details.model';

@Injectable()
export class LawsuitRequestDetailsService {
  litigationDetails: WritableSignal<any | null> = signal(null);

  constructor(private _httpClient: HttpClient) { }
  
 GetLitigationFullDetailsById(litigationId: string): Observable<BaseResponse<LawsuitItemDetails>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationId", litigationId);
    return this._httpClient.get<BaseResponse<LawsuitItemDetails>>(`${Configuration.APIs.LitigationRequest.GetLitigationFullDetailsById}`, { params: queryParams })
  }  

  GetLitigationById(body: {litigationId: string}): Observable<BaseResponse<any>> {
    return this._httpClient.get<BaseResponse<LawsuitItemDetails>>(`${Configuration.APIs.LitigationRequest.GetLitigationById}`, { params: createQuery(body) })
  }  
}
