import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { Configuration } from '@app/core/configurations/shared.config';
import { LitigationAcceptOrRejectDocumentDto } from '../../models/arbitrator-document/arbitrator-document.model';
import { LitigationReconciliationTaskAcceptOrRejectDocumentDto } from '@app/modules/features/citizen-requests/models/LitigationReconciliationTaskAcceptOrRejectDocumentDto';

@Injectable()
export class ArbitrationDocumentService {

  constructor(private _httpClient: HttpClient) { }

  GetLitigationAcceptanceOrRejectDocumentData(litigationId: string, requestId: string): Observable<BaseResponse<LitigationAcceptOrRejectDocumentDto>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationId", litigationId);
    queryParams = queryParams.append("requestId", requestId);
    
    return this._httpClient.get<BaseResponse<LitigationAcceptOrRejectDocumentDto>>(Configuration.APIs.Arbitration.GetLitigationAcceptanceOrRejectDocumentData, { params: queryParams })
  }

  GetLitigationReconciliationTaskAcceptanceOrRejectDocumentData(litigationId: string, requestId: string): Observable<BaseResponse<LitigationReconciliationTaskAcceptOrRejectDocumentDto>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("litigationId", litigationId);
    queryParams = queryParams.append("requestId", requestId);
    
    return this._httpClient.get<BaseResponse<LitigationReconciliationTaskAcceptOrRejectDocumentDto>>(Configuration.APIs.Arbitration.GetLitigationReconciliationTaskAcceptanceOrRejectDocumentData, { params: queryParams })
  }



}
