import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable, map, of } from 'rxjs';
import { AuditngList, AuditngListItem } from '../../models/lawsuit-list.model';
import { createQuery } from '@app/shared/helpers/create-query';
import { AuditingListFilter } from '../../models/auditing-list-filter.model';
import { Pagination } from '@app/shared/models/pagination.model';

@Injectable()
export class LawsuitListService {

  constructor(private _httpClient: HttpClient) { }

  AuditngList(pageIndex: number, pageSize: number): Observable<BaseResponse<Pagination<AuditngListItem[]>>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<Pagination<AuditngListItem[]>>>(`${Configuration.APIs.LitigationRequest.AuditngList}`, { params: queryParams })
  }

  AuditngListArbitration(body: AuditingListFilter): Observable<BaseResponse<AuditngList>> {
    return this._httpClient.get<BaseResponse<AuditngList>>(`${Configuration.APIs.LitigationRequest.AuditngListArbitration}`, { params: createQuery(body) })
  }

  AuditngListReconciliation(body: AuditingListFilter): Observable<BaseResponse<AuditngList>> {
    return this._httpClient.get<BaseResponse<AuditngList>>(`${Configuration.APIs.LitigationRequest.AuditngListReconciliation}`, { params: createQuery(body) })
  }

}
