import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { AuditNotesDto } from '../../models/audit-notes-dto.model';

@Injectable()
export class LawsuitEditReasonsService {

  constructor(private _httpClient: HttpClient) { }

  // GetAuditNotesById(litigationId: string):Observable<BaseResponse<AuditNotesDto[]>>{
  //   let queryParams = new HttpParams();
  //   queryParams = queryParams.append("litigationId", litigationId);
  //   return this._httpClient.get<BaseResponse<AuditNotesDto[]>>(Configuration.APIs.LitigationRequest.GetAuditNotesById,{params: queryParams})
  // }
  GetAuditNotesById(litigationId: string):Observable<BaseResponse<AuditNotesDto[]>>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationId", litigationId);
    return this._httpClient.get<BaseResponse<AuditNotesDto[]>>(Configuration.APIs.WorkFlowProcessingLog.GetAuditNotesById,{params: queryParams})
  }
}
