import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse, PagedResultBase } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { LitigationRequestMircoDto } from '../../models/arbitration-request.model';
import {  LitigationRequestArbitrationRecusalRequestResponseDto, LitigationRequestMircoExplanationRequestDto } from '../../models/arbitrator-recusal/arbitrator-recusal.model';
import { LitigationRequestForArbitratorRecusalRequestDto } from '../../models/litigation-request-arbitration-report-explanation-request-get-dto';

@Injectable()
export class ArbitratorRecusalService {

  constructor(private _httpClient: HttpClient) { }


  getLitigationRequestForArbitratorRecusalRequestForArbitrator(pageIndex: number, pageSize: number): Observable<BaseResponse<PagedResultBase<LitigationRequestMircoExplanationRequestDto>>> {
    let queryParams = new HttpParams();
        queryParams = queryParams.append("pageIndex", pageIndex);
        queryParams = queryParams.append("pageSize", pageSize);
    return this._httpClient.get<BaseResponse<PagedResultBase<LitigationRequestMircoExplanationRequestDto>>>(Configuration.APIs.Arbitration.GetLitigationRequestForArbitratorRecusalRequestForArbitrator,{params:queryParams})
}

  getLitigationRequestForArbitratorRecusalRequestById(litigationRequestId : string): Observable<BaseResponse<LitigationRequestForArbitratorRecusalRequestDto>> {
     
    let queryParams = new HttpParams();
    queryParams = queryParams.append('litigationRequestId',litigationRequestId)

    return this._httpClient.get<BaseResponse<LitigationRequestForArbitratorRecusalRequestDto>>(Configuration.APIs.Arbitration.GetLitigationRequestForArbitratorRecusalRequestForArbitratorByRequestId,{params:queryParams})
}


AddArbitrationReportArbitratorRecusalForArbitrator(model : LitigationRequestArbitrationRecusalRequestResponseDto): Observable<BaseResponse<LitigationRequestForArbitratorRecusalRequestDto>>{

    return this._httpClient.post<BaseResponse<LitigationRequestForArbitratorRecusalRequestDto>>(Configuration.APIs.Arbitration.AddArbitrationReportArbitratorRecusalForArbitrator,model)

}



}
