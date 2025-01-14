import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { LitigationRequestForNotes } from '../../models/litigation-request-notes.model';
import { LitigationRequestMircoDtoReformer } from '@app/modules/features/citizen-requests/models/litigation-request-mirco-dto-reformer';
import { Pagination } from '@app/shared/models/pagination.model';

@Injectable()
export class LitigationRequestNotesService {

  constructor(private _httpClient: HttpClient) { }

  GetLitigationNotesById(litigationId: string, litigationRequestCategoryIds: number[]): Observable<BaseResponse<LitigationRequestForNotes>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationId", litigationId);
    return this._httpClient.post<BaseResponse<LitigationRequestForNotes>>(`${Configuration.APIs.LitigationRequestNote.getNoteById}`, litigationRequestCategoryIds, { params: queryParams })
  }

  GetLitigationRequestNotes(pageIndex : number , pageSize : number , litigationRequestCategoryId : number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);
    queryParams = queryParams.append("litigationRequestCategoryId", litigationRequestCategoryId);
    return this._httpClient.get<BaseResponse<Pagination<LitigationRequestMircoDtoReformer[]>>>(`${Configuration.APIs.LitigationRequestNote.GetLitigationRequestNotesForBackoffice}`, { params: queryParams })

  }

}
