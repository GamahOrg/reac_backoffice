import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable, map, of } from 'rxjs';
import { AuditngList } from '../../models/lawsuit-list.model';
import { createQuery } from '@app/shared/helpers/create-query';
import { AuditingListFilter } from '../../models/auditing-list-filter.model';

@Injectable()
export class LawsuitListService {

  constructor(private _httpClient: HttpClient) { }

  AuditngList(body: AuditingListFilter): Observable<BaseResponse<AuditngList>>{    
    return this._httpClient.get<BaseResponse<AuditngList>>(`${Configuration.APIs.LitigationRequest.AuditngList}`, { params: createQuery(body) })  
  }
}
